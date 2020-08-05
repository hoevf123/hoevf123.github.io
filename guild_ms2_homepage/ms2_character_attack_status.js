"use strict";
const myPlayer = {
    class: "Priest",
    weaponQuality: "Legendary",
    weaponAttack: 10767,
    bonusAttack: 0,
    petAttack: 0,
    phyAttack: 13,
    magAttack: 343,
    piercing: 0,
    phyPiercing: 0,
    magPiercing: 0,
    accuracy: 84,
    critRate: 136,
    critDamage: 167,
    typedDamage: {
        melee: 0.0,
        ranged: 0.0,
        fire: 0,
        ice: 0,
        electric: 0,
        poison: 0,
        dark: 0,
        holy: 0,
        boss: 4.0,
        total: 0.0,
    },
    attackSpeed: 105.0,
    skillCooltimeReduction: 0,
};
/**
 * Weapon attack's attack score modifier by job
 *
 * 직업에 따른
 *
 * 무기 공격력이 공격 점수에 영향을 끼치는 계수
 */
const WeaponASModifier = {
    Knight: 1.105,
    Berserker: 1.354,
    Wizard: 1.398,
    Priest: 0.975,
    Archer: 1.143,
    HeavyGunner: 1.364,
    Thief: 1.151,
    Assassin: 1.114,
    Runeblade: 1.259,
    Striker: 1.264,
    SoulBinder: 1.177,
};
/**
 * Bonus Attack's attack score modifier by weapon quality
 *
 * 무기 등급에 따른
 *
 * 전투력이 공격 점수에 영향을 끼치는 계수
 */
const WeaponQualityBAModifier = {
    Normal: 0.26,
    Rare: 0.27,
    Exceptional: 0.283,
    Epic: 0.5,
    Legendary: 1,
    Ascendant: 1,
};
function calc(player) {
    const kms2 = true;
    // If no weapon equiped, attack score is always 10
    if (!kms2 && player.weaponAttack <= 0) {
        return 10;
    }
    // Attack score by weapon attack
    const weaponAS = player.weaponAttack * 1.3 / WeaponASModifier[player.class];
    // Attack score by bonus attack (+ pet attack * 0.394)
    let bonusAttackAS;
    if (kms2) {
        bonusAttackAS = player.bonusAttack + player.petAttack * 1.95 * WeaponQualityBAModifier[player.weaponQuality];
    }
    else {
        bonusAttackAS = (player.bonusAttack + player.petAttack * 0.394) * 4.96 * WeaponQualityBAModifier[player.weaponQuality];
    }
    // First basic value by "weapon attack type"
    let value = 1.2857 * (weaponAS + bonusAttackAS);
    // Phy & Mag attack multipler by job
    value *= getAttack(player.class, player.phyAttack, player.magAttack);
    // Piercing multipler (max. 30)
    value *= 1 / (1 - Math.min(player.piercing, 30) / 100);
    // Attack speed multipler (max. 150)
    value *= 1 + 0.6 * Math.min(player.attackSpeed - 100, 50) / 100;
    // Phy & Mag piercing multipler
    // Rune Blader magic piercing value (what is this???)
    const runeMagValue = (player.class === "Runeblade") ? (player.magPiercing + -82.2969307) : (-82.2969307);
    value *= 1 + (Math.min(getPhyMagPiercing(player.class, player.phyPiercing, player.magPiercing), 20) / 100 * 0.7 +
        Math.min(runeMagValue, 20) / 100 * 0.3 * 0.9 // rune blader's magic piercing..
    );
    // Accuracy multipler (multipler is 0.0~1.0, accuracy max. 129.167)
    // check https://www.desmos.com/calculator/nguffivkfa
    value *= Math.min(Math.max((player.accuracy - 10) / (135 + player.accuracy * 0.8) * 2, 0), 1);
    // Critical damage & rate multipler 
    // Critical rate is calculated by critical evasion 90 mob
    value *= 1 + (Math.min(player.critDamage, 250) / 100) * (player.critRate * 5.3 / (90 * 2) * 0.015);
    // Elemental & Total & Boss damage multipler
    // BossDMG is 0.85 modifer
    const typedDamage = player.typedDamage;
    value *= 1 + (typedDamage.total +
        typedDamage.boss * 0.85 +
        Math.max(typedDamage.melee, typedDamage.ranged) +
        Math.max(typedDamage.fire, typedDamage.ice, typedDamage.electric, typedDamage.poison, typedDamage.dark, typedDamage.holy)) / 100;
    // Skill Cooltime Reduction modifier..
    value *= (1 + player.skillCooltimeReduction / 100 * 0.3);
    // divide by 30
    value /= 30;
    // final job modifier
    // value *= getFinalASModifier(player.class)
    return Math.floor((10 + value) * getFinalASModifier(player.class));
}
/**
 * Get attack by job
 * @param job Job Class
 * @param phyAttack Physical Attack
 * @param magAttack Magical Attack
 */
function getAttack(job, phyAttack, magAttack) {
    return getTypedValue(job, phyAttack, magAttack, 0.7, 0.43);
}
/**
 * get Phy & Mag piercing by job
 * @param job Job Class
 * @param phyPiercing Physical Piercing
 * @param magPiercing Magical Piercing
 */
function getPhyMagPiercing(job, phyPiercing, magPiercing) {
    return getTypedValue(job, phyPiercing, magPiercing, 0.777, 0);
}
/**
 * Get Physical & Magical Typed Value from job (internal)
 * @param job
 * @param physical
 * @param magic
 * @param runePhyK
 * @param runeMagK
 */
function getTypedValue(job, physical, magic, runePhyK, runeMagK) {
    switch (job) {
        case "Archer":
        case "Assassin":
        case "Berserker":
        case "HeavyGunner":
        case "Knight":
        case "Striker":
        case "Thief":
            return physical;
            break;
        case "Priest":
        case "SoulBinder":
        case "Wizard":
            return magic;
            break;
        case "Runeblade":
            return physical * runePhyK + magic * runeMagK;
            break;
    }
}
/**
 * Get Job Attack Score modifier
 * @param job Job
 */
function getFinalASModifier(job) {
    switch (job) {
        case "Priest":
            return 1.06;
            break;
        case "Thief":
            return 1.04;
            break;
        case "Runeblade":
            return 1.01;
            break;
        case "SoulBinder":
            return 1.03;
            break;
        default:
            return 1;
    }
}
const origVal = calc(myPlayer);
const modVal = calc(Object.assign(Object.assign({}, myPlayer), { 
    // magPiercing: 4.3,
    // phyAttack: myPlayer.phyAttack + 6,
    bonusAttack: myPlayer.bonusAttack + 150, petAttack: 1994, 
    /*
    typedDamage: {
        ...myPlayer.typedDamage,
        // melee: 2.6,
        boss: myPlayer.typedDamage.boss + 3,
    },
    */
    // critRate: myPlayer.critRate + 30,
    // critDamage: myPlayer.critDamage + 9,
    accuracy: myPlayer.accuracy + 8, attackSpeed: myPlayer.attackSpeed + 4, critDamage: myPlayer.critDamage + 10.8 }));
console.log(origVal);
console.log(modVal);
console.log(modVal / origVal);
/*
    // Attack score by weapon attack
    const weaponAS = player.weaponAttack * 1.3 / WeaponASModifier[player.class]
    // Attack score by bonus attack (+ pet attack * 0.394)
    const bonusAttackAS = (player.bonusAttack + player.petAttack * 0.394) * 4.96 * WeaponQualityBAModifier[player.weaponQuality]
*/
const jobs = ["Archer", "Assassin", "Berserker", "HeavyGunner", "Knight", "Priest", "Runeblade", "SoulBinder", "Striker", "Thief", "Wizard"];
for (const job of jobs) {
    const modifier = 4.96 * WeaponQualityBAModifier.Ascendant / (1.3 / WeaponASModifier[job]);
    console.log(`[${job}] : ${Math.round(modifier * 100000) / 100000}`);
}