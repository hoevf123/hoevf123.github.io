// 데이터 변환 스크립트
const fs = require('fs');
const path = require('path');

// DictData 클래스 구조를 따르는 데이터 변환 함수
function convertToDictData(content) {
    const dictDataObjects = {};
    
    // 1. 모든 배열 정의 추출
    const arrayRegex = /let\s+([a-zA-Z0-9_]+)\s*=\s*\[(.|\n|\r)*?\];/g;
    let match;
    const arrays = {};
    while ((match = arrayRegex.exec(content)) !== null) {
        const name = match[1];
        const arrStr = match[0].replace(/let\s+[a-zA-Z0-9_]+\s*=\s*/, '').replace(/;\s*$/, '');
        try {
            arrays[name] = eval(arrStr);
        } catch (e) {
            // 배열 내부에 주석이 있거나, JS 문법이 아닌 부분이 있으면 무시
            //console.error(`Error parsing array ${name}:`, e);
        }
    }

    // 2. 쌍 매칭 (format/records, tag_formats/records 등)
    // 우선적으로 _format(s), _tag_formats, _records 등 패턴을 모두 매칭
    const formatKeys = Object.keys(arrays).filter(k => /(_format$|_formats$|_tag_formats$)/.test(k));
    const recordKeys = Object.keys(arrays).filter(k => /_records$/.test(k));

    // 쌍 매칭: <prefix>_format(s) <-> <prefix>_records
    for (const formatKey of formatKeys) {
        let prefix = formatKey.replace(/(_format$|_formats$|_tag_formats$)/, '');
        // 가장 가까운 records 찾기
        let recordKey = recordKeys.find(rk => rk.replace(/_records$/, '') === prefix);
        if (recordKey && arrays[formatKey] && arrays[recordKey]) {
            dictDataObjects[prefix] = {
                typename: prefix,
                tuple_tag_format: arrays[formatKey],
                datas: arrays[recordKey],
                represent_tag_target: 'ms2-dict-represent-area'
            };
        }
    }

    return dictDataObjects;
}

// JSON 파일 저장 함수
function saveJsonFile(data, filename) {
    const jsonData = JSON.stringify(data, null, 4);
    const filePath = path.join(__dirname, '..', 'data', filename);
    fs.writeFileSync(filePath, jsonData, 'utf8');
    console.log(`Saved ${filename}`);
}

// 입장 조건 포맷팅 함수 (Node.js 버전)
function formatEnterCondition(condition) {
    if (!condition) return '';
    const conditions = condition.split(/[,.]/).filter(c => c.trim());
    if (conditions.length <= 1) return condition;
    return conditions.map(c => c.trim()).join('\n• ');
}

// ms2_datawarehouse_dungeon_datas.mjs에서 temp_dungeon_datas 추출
function extractTempDungeonDatas(content) {
    // export const temp_dungeon_datas = [ ... ]; 형태에서 [ ... ] 부분만 추출
    const regex = /export const temp_dungeon_datas\s*=\s*(\[([\s\S]*?)\]);/m;
    const match = content.match(regex);
    if (!match) throw new Error('temp_dungeon_datas not found');
    // eslint-disable-next-line no-eval
    return eval(match[1]);
}

// ms2_dict_dungeon_datas.mjs에서 ms2_dungeon_tagtypes 추출
function extractDungeonTagTypes(content) {
    const regex = /let\s+ms2_dungeon_tagtypes\s*=\s*(\[([\s\S]*?)\]);/m;
    const match = content.match(regex);
    if (!match) throw new Error('ms2_dungeon_tagtypes not found');
    // eslint-disable-next-line no-eval
    return eval(match[1]);
}

// 던전 데이터 생성 (ms2_dict_dungeon_datas.mjs의 로직과 동일)
function createDungeonDatas(temp_dungeon_datas) {
    return temp_dungeon_datas.map(c => [
        c?.["dungeonType"],
        c?.["dungeonName"],
        c?.["requireLevel"],
        c?.["minimumRequirePlayers"],
        c?.["maximumRequirePlayers"],
        formatEnterCondition(c?.["dungeonEnterCondition"]),
        c?.["dungeonDescription"],
        c?.["dungeonReleaseDate"],
        c?.["dungeonClosedDate"]
    ]);
}

// 메인 실행 함수
async function main() {
    try {
        const dataDir = path.join(__dirname, '..', 'data');
        if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

        // ms2_datawarehouse_dungeon_datas.mjs에서 temp_dungeon_datas 추출
        const warehousePath = path.join(__dirname, '..', 'ms2_datawarehouse_dungeon_datas.mjs');
        const warehouseContent = fs.readFileSync(warehousePath, 'utf8');
        const temp_dungeon_datas = extractTempDungeonDatas(warehouseContent);

        // ms2_dict_dungeon_datas.mjs에서 ms2_dungeon_tagtypes 추출
        const dungeonDictPath = path.join(__dirname, '..', 'ms2_dict_dungeon_datas.mjs');
        const dungeonDictContent = fs.readFileSync(dungeonDictPath, 'utf8');
        const ms2_dungeon_tagtypes = extractDungeonTagTypes(dungeonDictContent);

        // 던전 데이터 생성
        const ms2_dungeon_datas = createDungeonDatas(temp_dungeon_datas);

        // JSON 구조 생성
        const dungeonData = {
            typename: '던전',
            tuple_tag_format: ms2_dungeon_tagtypes,
            datas: ms2_dungeon_datas,
            represent_tag_target: 'ms2-dict-represent-area'
        };
        // 저장
        const jsonData = JSON.stringify(dungeonData, null, 4);
        const filePath = path.join(dataDir, 'ms2_dungeon.json');
        fs.writeFileSync(filePath, jsonData, 'utf8');
        console.log('Saved ms2_dungeon.json');

        // 기존 파일 사전 데이터 변환
        const dataFilePath = path.join(__dirname, '..', 'ms2_file_dict_datas_old.js');
        if (fs.existsSync(dataFilePath)) {
            const dataFileContent = fs.readFileSync(dataFilePath, 'utf8');
            const dictDataObjects = convertToDictData(dataFileContent);
            
            // 카테고리별로 데이터 분리
            const categorizedData = categorizeData(dictDataObjects);

            // 각 카테고리별 JSON 파일로 저장
            for (const [category, data] of Object.entries(categorizedData)) {
                saveJsonFile(data, `ms2_${category}.json`);
            }
        }

        console.log('모든 데이터를 JSON으로 변환 완료!');
    } catch (error) {
        console.error('Error during conversion:', error);
    }
}

// 카테고리별 데이터 분리 함수
function categorizeData(dictDataObjects) {
    const categories = {
        wallpapers: {
            typename: '배경화면',
            tuple_tag_format: dictDataObjects['ms2_wallpaper_tag_formats'].tuple_tag_format,
            datas: dictDataObjects['ms2_wallpaper_tag_formats'].datas,
            represent_tag_target: 'ms2-dict-represent-area'
        },
        music: {
            typename: '음악',
            tuple_tag_format: dictDataObjects['ms2_bgm_records_format'].tuple_tag_format,
            datas: dictDataObjects['ms2_bgm_records_format'].datas,
            represent_tag_target: 'ms2-dict-represent-area'
        },
        crafting: {
            typename: '제작',
            tuple_tag_format: dictDataObjects['ms2_custom_palletes_origin_format'].tuple_tag_format,
            datas: dictDataObjects['ms2_custom_palletes_origin_format'].datas,
            represent_tag_target: 'ms2-dict-represent-area'
        },
        character: {
            typename: '캐릭터',
            tuple_tag_format: dictDataObjects['ms2_custom_palletes_paint_optimized_format'].tuple_tag_format,
            datas: dictDataObjects['ms2_custom_palletes_paint_optimized_format'].datas,
            represent_tag_target: 'ms2-dict-represent-area'
        },
        event: {
            typename: '이벤트',
            tuple_tag_format: dictDataObjects['ms2_included_palletes_origin_format'].tuple_tag_format,
            datas: dictDataObjects['ms2_included_palletes_origin_format'].datas,
            represent_tag_target: 'ms2-dict-represent-area'
        }
    };

    return categories;
}

// 스크립트 실행
main(); 