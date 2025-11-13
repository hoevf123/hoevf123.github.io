import { MS2AdditionalOptions } from '../ms2_additionaloptions.mjs';

// Re-implement the exact DP function (same as in the HTML) for independent validation
function getOptionPropertyRate(targetOptionnames, optionAmounts, targetOptionGroups, targetEssntialOptionNames = []) {
    if (!(Array.isArray(targetEssntialOptionNames))) targetEssntialOptionNames = targetEssntialOptionNames ? [targetEssntialOptionNames] : [];
    if (!(Array.isArray(targetOptionnames))) targetOptionnames = targetOptionnames ? [targetOptionnames] : [];

    const desiredSet = new Set([...targetOptionnames.filter(Boolean)]);
    const essentialSet = new Set([...targetEssntialOptionNames.filter(Boolean)]);
    // neededSet initially contains essentials only; desired may be added later when appropriate
    const neededSet = new Set([...essentialSet]);

    // if neither desired nor essential specified, trivially 1
    if (essentialSet.size === 0 && desiredSet.size === 0) return 1;
    if (!(optionAmounts > 0)) return 0;
    if (essentialSet.size > optionAmounts) return 0;

    const optionsArray = Array.from(targetOptionGroups).map(o => ({ name: o.name, probability: Number(o.probability) || 0, optionGroup: o.optionGroup }));
    const memo = new Map();

    function stateKey(opts, picksLeft, needed) {
        const names = opts.map(o => o.name).sort().join('|');
        const need = Array.from(needed).sort().join('|');
        return `${picksLeft}::${names}::${need}`;
    }

    function recurseNeeded(opts, picksLeft, needed) {
        if (needed.size === 0) return 1;
        if (picksLeft === 0) return 0;
        if (needed.size > picksLeft) return 0;

        const key = stateKey(opts, picksLeft, needed);
        if (memo.has(key)) return memo.get(key);

        const totalWeight = opts.reduce((s, o) => s + o.probability, 0);
        if (totalWeight <= 0) { memo.set(key, 0); return 0; }

        let acc = 0;
        for (const o of opts) {
            const p = o.probability / totalWeight;
            let nextOpts = o.optionGroup ? opts.filter(x => x.optionGroup !== o.optionGroup) : opts.filter(x => x.name !== o.name);
            const nextNeeded = new Set(needed);
            nextNeeded.delete(o.name);
            acc += p * recurseNeeded(nextOpts, picksLeft - 1, nextNeeded);
        }

        memo.set(key, acc);
        return acc;
    }

    function recurseAllFromAllowed(opts, picksLeft, allowedSet, mem) {
        const key = `ALL::${picksLeft}::${opts.map(o=>o.name).sort().join('|')}::${Array.from(allowedSet).sort().join('|')}`;
        if (mem.has(key)) return mem.get(key);
        if (picksLeft === 0) return 1;
        const totalWeight = opts.reduce((s,o)=>s+o.probability,0);
        if (totalWeight <= 0) { mem.set(key,0); return 0; }
        let acc = 0;
        for (const o of opts) {
            if (!allowedSet.has(o.name)) continue;
            const p = o.probability / totalWeight;
            let nextOpts = o.optionGroup ? opts.filter(x => x.optionGroup !== o.optionGroup) : opts.filter(x => x.name !== o.name);
            acc += p * recurseAllFromAllowed(nextOpts, picksLeft - 1, allowedSet, mem);
        }
        mem.set(key, acc);
        return acc;
    }

    // If there are essential options, prioritize computing the probability that all needed (essential + desired)
    if (essentialSet.size > 0) {
        if (desiredSet.size <= optionAmounts) {
            for (const d of desiredSet) neededSet.add(d);
            return recurseNeeded(optionsArray, optionAmounts, neededSet);
        }
        // desired.size > picks: compute probability that all picks are from allowed (essentials+desired) and all essentials obtained
        const allowedSet = new Set([...essentialSet, ...desiredSet]);
        const memAllowed = new Map();
        function recurseAllowedWithNeeded(opts, picksLeft, allowedSetLocal, neededLocal) {
            const key = `ALW::${picksLeft}::${opts.map(o=>o.name).sort().join('|')}::${Array.from(allowedSetLocal).sort().join('|')}::${Array.from(neededLocal).sort().join('|')}`;
            if (memAllowed.has(key)) return memAllowed.get(key);
            if (picksLeft === 0) return neededLocal.size === 0 ? 1 : 0;
            const totalWeight = opts.reduce((s,o)=>s+o.probability,0);
            if (totalWeight <= 0) { memAllowed.set(key,0); return 0; }
            let acc = 0;
            for (const o of opts) {
                if (!allowedSetLocal.has(o.name)) continue;
                const p = o.probability / totalWeight;
                let nextOpts = o.optionGroup ? opts.filter(x => x.optionGroup !== o.optionGroup) : opts.filter(x => x.name !== o.name);
                const nextNeeded = new Set(neededLocal);
                nextNeeded.delete(o.name);
                acc += p * recurseAllowedWithNeeded(nextOpts, picksLeft - 1, allowedSetLocal, nextNeeded);
            }
            memAllowed.set(key, acc);
            return acc;
        }
        return recurseAllowedWithNeeded(optionsArray, optionAmounts, allowedSet, neededSet);
    }

    // If no essentials: if desired size > picks -> probability all picks are from desired set
    if (desiredSet.size > optionAmounts) {
        const memA = new Map();
        return recurseAllFromAllowed(optionsArray, optionAmounts, desiredSet, memA);
    }

    // Otherwise compute probability that all desired (needed) appear within picks
    // include desired into needed when desired fits into picks
    if (desiredSet.size <= optionAmounts) {
        for (const d of desiredSet) neededSet.add(d);
    }
    return recurseNeeded(optionsArray, optionAmounts, neededSet);
}

// Monte Carlo simulation to approximate probability
function simulate(targetOptionnames, optionAmounts, targetOptionGroups, targetEssntialOptionNames = [], trials = 200000) {
    const desired = new Set([...targetOptionnames.filter(Boolean)]);
    const essential = new Set([...targetEssntialOptionNames.filter(Boolean)]);
    // needed contains essentials; include desired only when desired.size <= picks
    const needed = new Set([...essential]);
    let success = 0;
    const optsOrig = targetOptionGroups.map(o => ({ ...o }));

    for (let t = 0; t < trials; t++) {
        let opts = optsOrig.map(o => ({ ...o }));
        let neededLeft = new Set(needed);
        let onlyFromDesired = true;
        const allowed = new Set([...essential, ...desired]);
        let onlyFromAllowed = true;
        // if there are essential options, success condition should be obtaining all essentials
        const hasEssential = essential.size > 0;
        // include desired into neededLeft only when desired count <= optionAmounts
        if (desired.size <= optionAmounts) {
            for (const d of desired) neededLeft.add(d);
        }
        for (let pick = 0; pick < optionAmounts; pick++) {
            const totalW = opts.reduce((s, o) => s + o.probability, 0);
            if (totalW <= 0) break;
            let r = Math.random() * totalW;
            let acc = 0;
            let chosenIdx = -1;
            for (let i = 0; i < opts.length; i++) {
                acc += opts[i].probability;
                if (r <= acc) {
                    chosenIdx = i;
                    break;
                }
            }
            if (chosenIdx === -1) chosenIdx = opts.length - 1;
            const chosen = opts[chosenIdx];
            // remove group
            if (chosen.optionGroup) {
                opts = opts.filter(x => x.optionGroup !== chosen.optionGroup);
            } else {
                opts = opts.filter(x => x.name !== chosen.name);
            }
            neededLeft.delete(chosen.name);
            if (!desired.has(chosen.name)) onlyFromDesired = false;
            if (!allowed.has(chosen.name)) onlyFromAllowed = false;
        }
        if (hasEssential) {
            if (desired.size > optionAmounts) {
                if (onlyFromAllowed && neededLeft.size === 0) success++;
            } else {
                if (neededLeft.size === 0) success++;
            }
        } else {
            // If desired set is larger than picks, success condition: all picks were from desired set
            if (desired.size > optionAmounts) {
                if (onlyFromDesired) success++;
            } else {
                if (neededLeft.size === 0) success++;
            }
        }
    }
    return success / trials;
}

async function run() {
    const cape = MS2AdditionalOptions["cape"];

    const cases = [
        // Initial UI default from the page: 4 picked options, 1 essential, but only 3 picks available
        { pick: 3, want: ['크리티컬 대미지','크리티컬 명중','보스 몬스터 공격 시 대미지 증가','공격속도'], essential: ['보스 몬스터 공격 시 대미지 증가'] },
        { pick: 3, want: ['보스 몬스터 공격 시 대미지 증가'], essential: [] },
        { pick: 3, want: ['크리티컬 대미지','크리티컬 명중'], essential: [] },
        { pick: 3, want: ['크리티컬 대미지','보스 몬스터 공격 시 대미지 증가'], essential: [] },
        { pick: 3, want: ['공격속도'], essential: [] },
    ];

    // helper: exact probability that the picked set (order-independent) equals targetSet
    function probabilityOfExactSet(targetSetArray, optionAmounts, targetOptionGroups){
        const targetSet = new Set(targetSetArray);
        if(!(optionAmounts > 0)) return 0;
        if(targetSet.size !== optionAmounts) return 0;
        const opts = Array.from(targetOptionGroups).map(o=>({ name: o.name, probability: Number(o.probability)||0, optionGroup: o.optionGroup }));
        const memo = new Map();
        function stateKey(optsArr, picksLeft, remainingSet){
            return `${picksLeft}::${optsArr.map(x=>x.name).sort().join('|')}::${Array.from(remainingSet).sort().join('|')}`;
        }
        function recurse(optsArr, picksLeft, remainingSet){
            if(picksLeft === 0) return remainingSet.size === 0 ? 1 : 0;
            if(remainingSet.size > picksLeft) return 0;
            const key = stateKey(optsArr, picksLeft, remainingSet);
            if(memo.has(key)) return memo.get(key);
            const totalWeight = optsArr.reduce((s,o)=>s+o.probability,0);
            if(totalWeight <= 0){ memo.set(key,0); return 0; }
            let acc = 0;
            for(const o of optsArr){
                if(!remainingSet.has(o.name)) continue;
                const p = o.probability / totalWeight;
                const nextOpts = o.optionGroup ? optsArr.filter(x=>x.optionGroup !== o.optionGroup) : optsArr.filter(x=>x.name !== o.name);
                const nextRem = new Set(remainingSet);
                nextRem.delete(o.name);
                acc += p * recurse(nextOpts, picksLeft-1, nextRem);
            }
            memo.set(key, acc);
            return acc;
        }
        return recurse(opts, optionAmounts, new Set(targetSet));
    }

    function combinations(arr, k){
        const results = [];
        function backtrack(start, combo){
            if(combo.length === k){ results.push(combo.slice()); return; }
            for(let i=start;i<arr.length;i++){ combo.push(arr[i]); backtrack(i+1, combo); combo.pop(); }
        }
        if(k===0){ results.push([]); return results; }
        backtrack(0,[]);
        return results;
    }

    for (const c of cases) {
        const exact = getOptionPropertyRate(c.want, c.pick, cape, c.essential);
        // compute combo-sum according to same semantics used in the page
        const desired = Array.from(c.want || []);
        const essential = Array.from(c.essential || []);
        let combos = [];
        // Case A: desired bigger than picks
        if(desired.length > c.pick){
            if(essential.length === 0){
                combos = combinations(desired, c.pick);
            } else {
                const mustBase = Array.from(new Set([...essential]));
                const remainingToChoose = c.pick - mustBase.length;
                if(remainingToChoose > 0){
                    const desiredCandidates = desired.filter(n=> !mustBase.includes(n));
                    combos = combinations(desiredCandidates, remainingToChoose).map(x=> mustBase.concat(x));
                } else if(remainingToChoose === 0){
                    combos = [mustBase.slice()];
                }
            }
        } else {
            const mustInclude = Array.from(new Set([ ...essential, ...desired ]));
            const remainingToChoose = c.pick - mustInclude.length;
            const allNames = cape.map(o=>o.name);
            const candidates = allNames.filter(n=> !mustInclude.includes(n));
            if(remainingToChoose === 0) combos = [ mustInclude.slice() ];
            else combos = combinations(candidates, remainingToChoose).map(x=> mustInclude.concat(x));
        }

        // filter zero-prob combos
        let comboSum = 0;
        for(const combo of combos){
            const prob = probabilityOfExactSet(combo, c.pick, cape);
            if(prob > 1e-12) comboSum += prob;
        }

        const mc = simulate(c.want, c.pick, cape, c.essential, 120000);
        console.log(`Case want=${JSON.stringify(c.want)}, pick=${c.pick} => exact=${(exact*100).toFixed(6)}%  combo-sum=${(comboSum*100).toFixed(6)}%  montecarlo=${(mc*100).toFixed(6)}%`);
    }
}

run().catch(e=>{ console.error(e); process.exit(1); });
