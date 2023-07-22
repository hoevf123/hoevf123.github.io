//const { addSyntheticLeadingComment } = require("typescript");

const MAPLESTORY2_IMAGEPORTRAIT_DIR = "Maplestory2/Image/portrait/";
export const img_tag_formats = ["jpg", "jpeg", "png", "bmp", "gif", "webp"];
export const str_jobclasses =[
            {"imgname" :"beginner", "name" : "초보자", "name-en" : "beginner"},
            {"imgname" :"knight", "name" : "나이트", "name-en" : "knight"},
            {"imgname" :"berserker", "name" : "버서커", "name-en" : "berserk"},
            {"imgname" :"archer", "name" : "레인저", "name-en" : "archer"},
            {"imgname" :"heavygunner", "name" : "헤비거너", "name-en" : "heavygunner"},
            {"imgname" :"wizard", "name" : "위자드", "name-en" : "wizard"},
            {"imgname" :"priest", "name" : "프리스트", "name-en" : "priest"},
            {"imgname" :"thief", "name" : "시프", "name-en" : "thief"},
            {"imgname" :"assassin", "name" : "어쌔신", "name-en" : "assasin"},
            {"imgname" :"runeblader", "name" : "룬 블레이더", "name-en" : "runeblade"},
            {"imgname" :"striker", "name" : "스트라이커", "name-en" : "striker"},
            {"imgname" :"soulbinder", "name" : "소울바인더", "name-en" : "soulbind"}
];
export const temp_dungeon_datas = [
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "벛꽃 숲의 비밀",
        "requireLevel": 17,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "오염된 정원",
        "requireLevel": 17,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "골든타워 7층",
        "requireLevel": 21,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "골든타워 4층",
        "requireLevel": 21,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "골든 엘리베이터",
        "requireLevel": 21,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "암탉 구출 대작전",
        "requireLevel": 21,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "포이즌 케이브",
        "requireLevel": 23,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "뱅코르타",
        "requireLevel": 28,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "꽃비 숲길",
        "requireLevel": 29,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "그림자 군단의 제단",
        "requireLevel": 30,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "최후의 바야르",
        "requireLevel": 33,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "전쟁 로봇의 반란",
        "requireLevel": 33,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "왕궁 지하",
        "requireLevel": 34,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "혼돈의 숲",
        "requireLevel": 35,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "생명의 틈",
        "requireLevel": 36,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "이그니코르",
        "requireLevel": 38,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "감시탑 성벽",
        "requireLevel": 38,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "호루스의 둥지",
        "requireLevel": 39,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "루디브리엄 시계탑",
        "requireLevel": 1,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "달빛선장의 요새",
        "requireLevel": 41,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "카트라무스 하층부",
        "requireLevel": 43,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "카트라무스 상층부",
        "requireLevel": 43,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "루디블 타임홀",
        "requireLevel": 48,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "어둠의 뿌리",
        "requireLevel": 48,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "뮤로스 촬영장",
        "requireLevel": 48,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "잊혀진 바야르",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "찬바람 동굴",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "환상 피라미드",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "얼어붙은 신전",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "트로닉스 벙커",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "폭주열차 블랙노프 1호",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "카사 델 루나",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "어둠의 이면",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "푸른 그림자 동굴",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "폭주열차 블랙노프 2호",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "인도자의 성지",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "불의 용",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 6500"
        ],
        "dungeonDescription": "용가리를 잡으시오"
    },
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "불멸의 신전",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 6700"
        ],
        "dungeonDescription": "발록",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "미궁의 집회당",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 6700"
        ],
        "dungeonDescription": "카보",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "루벨리스크",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 6700"
        ],
        "dungeonDescription": "바르칸트",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "룬의 성전",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 6700"
        ],
        "dungeonDescription": "누타만(누진만)",
        "dungeonClosedDate": "2020-07-09"
    },
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "비욘드 링크 트리스",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 7230"
        ],
        "dungeonDescription": "칸두라",
        "dungeonClosedDate": "2020-07-09"
    },
    // Reverse Raid - Zakum (NOT Rebirth Raid)
    {
        "dungeonType": "리버스 레이드",
        "dungeonName": "악마의 나무",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "dungeonEnterCondition": [
            "아이템점수 5000"
        ],
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: "??",  monsterId: 23000071, monsterName: "자쿰", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000071_b_zakumbrown_p.png" },
    },
    // 50 Chaos Raid
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "그림자 군단의 제단",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" :{monsterLevel: 50,  monsterId: 23200007, monsterName: "데보라크", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000007_b_devilhugeblue_p.png" },
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "불멸의 신전",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 50,  monsterId: 23290005, monsterName: "발록", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/02030005_balrog_p.png" },
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "달빛선장의 요새",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 50,  monsterId: 23200015, monsterName: "캡틴 모크", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/61000060_captainhookfish01_p.png" },
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "루디브리엄 시계탑",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : { monsterLevel: 50, monsterId: 23200077, monsterName: "파풀라투스", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000077_b_papulatus_p.png" },
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "루벨리스크",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 50, monsterId: 23200068, monsterName: "바르칸트", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000068_b_barkhantblue_p.png" },
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "룬의 성전",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "dungeonEnterCondition": [
            "아이템점수 7230"
        ],
        "dungeonDescription": "누타만",
        "dungeonClosedDate": "2020-07-09",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 50, monsterId: 23200080, monsterName: "누타만", dungeonClosed: true, thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000080_b_titanfourarmsgoldmaskthirdfloor_p.png" },
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "비욘드 링크 트리스",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "dungeonEnterCondition": [
            "아이템점수 7230"
        ],
        "dungeonDescription": "칸두라",
        "dungeonClosedDate": "2020-07-09",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 50, monsterId: 23200082, monsterName: "칸두라", dungeonClosed: true, thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000081_b_kanduranormal_p.png" },
    },
    // 52-56 Adventere Dungeons (Normal)
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "신녀의 노랫소리",
        "requireLevel": 52,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 7150점"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2017-01-12",
        "dungeonClosedDate": "2018-07-05"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "대양의 수호신",
        "requireLevel": 52,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 7400점"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2017-01-12",
        "dungeonClosedDate": "2018-07-05"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "눈보라 산맥",
        "requireLevel": 54,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 7500점"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2017-01-12",
        "dungeonClosedDate": "2018-07-05"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "마드라칸 성벽",
        "requireLevel": 54,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 7550점",
            "트로피 : 분노의 요새 : 성벽 공략 획득"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2017-02-09",
        "dungeonClosedDate": "2018-07-05"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "마드라칸 잠입",
        "requireLevel": 56,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 7700점"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2017-02-09",
        "dungeonClosedDate": "2018-07-05"
    },
    {
        "dungeonType": "모험[일반]",
        "dungeonName": "사무친 원한의 대저택",
        "requireLevel": 56,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 7650점"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2017-02-09",
        "dungeonClosedDate": "2018-07-05"
    },
    //54-56 Hard Dungeons.
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "서릿발 신전",
        "requireLevel": 54,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "dungeonEnterCondition": [
            "아이템점수 7600점"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2017-01-12",
        "dungeonClosedDate": "2018-07-05"
    },
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "마드라칸 첨탑",
        "requireLevel": 56,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "dungeonEnterCondition": [
            "아이템점수 7850점",
            "트로피 : 분노의 요새 : 침투로 확보"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonClosedDate": "2018-07-05"
    },
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "서릿발 신전",
        "requireLevel": 54,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "dungeonEnterCondition": [
            "아이템점수 6700점"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2017-01-12",
        "dungeonClosedDate": "2018-07-05"
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "마드라칸 첨탑",
        "requireLevel": 56,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "dungeonEnterCondition": [
            "아이템점수 8000점",
            "트로피 : 분노의 요새 : 침투로 확보",
            "입장 요일 : 일요일, 월요일, 수요일, 금요일"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2017-02-09",
        "dungeonClosedDate": "2018-07-05",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 56, monsterId: 23200064, monsterName: "루카락스", dungeonClosed: true, thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000064_b_bigwingchimera_p.png" },
    },
    {
        "dungeonType": "리버스 레이드",
        "dungeonName": "이계의 존재",
        "requireLevel": 56,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "dungeonEnterCondition": [
            "아이템점수 8200점",
            "입장 요일 : 토요일, 일요일"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2017-07-27",
        "dungeonClosedDate": "2018-07-05",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: "??", monsterId: 23000088, monsterName: "핑크빈", dungeonClosed: true, thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000088_b_pinkbean_p.png" },
    },
    {
        "dungeonType": "이벤트",
        "dungeonName": "캐시마트 아르바이트",
        "requireLevel": 1,
        "minimumRequirePlayers": 4,
        "maximumRequirePlayers": 4,
        "dungeonDescription": "던전 블라블라",
        "dungeonReleaseDate": "2017-02-23"
    },
    //Fortress Rumble
    {
        "dungeonType": "포트리스 럼블",
        "dungeonName": "스카이 포트리스 함교 상층부",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 1,
        "dungeonEnterCondition": [
            "아이템점수 6750점"
        ],
        "dungeonDescription": "블리체",
        "dungeonReleaseDate": "2018-02-01",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 50, monsterId: null, monsterName: "블리체", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "npc/11003533_f_bliche_p.png" },
    },
    {
        "dungeonType": "포트리스 럼블",
        "dungeonName": "트라이아 근위대 체력 단련장",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 1,
        "dungeonEnterCondition": [
            "아이템점수 6750점"
        ],
        "dungeonDescription": "콘대르",
        "dungeonReleaseDate": "2018-02-01",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 50, monsterId: null, monsterName: "콘대르", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "npc/11003534_m_conder_p.png" },
    },
    {
        "dungeonType": "포트리스 럼블",
        "dungeonName": "네이린의 전투 시뮬레이터",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 1,
        "dungeonEnterCondition": [
            "아이템점수 6750점"
        ],
        "dungeonDescription": "네이린",
        "dungeonReleaseDate": "2018-02-01",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 50, monsterId: null, monsterName: "네이린", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "npc/11003536_f_neirin_p.png" },
    },
    {
        "dungeonType": "포트리스 럼블",
        "dungeonName": "기사단 고등 지휘부 접견 구역",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 1,
        "dungeonEnterCondition": [
            "아이템점수 6750점"
        ],
        "dungeonDescription": "메이슨",
        "dungeonReleaseDate": "2018-02-01",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 50, monsterId: null, monsterName: "메이슨", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "npc/11003537_m_mason_p.png" },
    },
    {
        "dungeonType": "포트리스 럼블",
        "dungeonName": "쉐도우윈드 비밀 훈련 시설",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 1,
        "dungeonEnterCondition": [
            "아이템점수 6750점"
        ],
        "dungeonDescription": "샤텐",
        "dungeonReleaseDate": "2018-02-01",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 50, monsterId: null, monsterName: "샤텐", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "npc/11003535_f_schatten_p.png" },
    },
    //World Invaision
    {
        "dungeonType": "월드 인베이전",
        "dungeonName": "인페르녹 최후의 방어선",
        "requireLevel": 56,
        "minimumRequirePlayers": 2,
        "maximumRequirePlayers": 10,
        "dungeonEnterCondition": [
            "아이템점수 8000점",
            "트로피 : 스카이 포트리스의 빛 달성"
        ],
        "dungeonDescription": "15분동안 버텨야 하는 던전",
        "dungeonReleaseDate": "2018-01-25",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: "??", monsterId: null, monsterName: "인페르녹", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000090_b_balrogmagicburster_p.png" },
    },
    // 60 Adventure Dungeons(Hard) (was 52-56 Adventure[Normal] Dungeons)
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "신녀의 노랫소리",
        "requireLevel": 60,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 7600점"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2018-07-05"
    },
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "대양의 수호신",
        "requireLevel": 60,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 7600점"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2018-07-05"
    },
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "눈보라 산맥",
        "requireLevel": 60,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 7600점"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2018-07-05"
    },
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "마드라칸 성벽",
        "requireLevel": 60,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 7600점"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2018-07-05"
    },
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "마드라칸 잠입",
        "requireLevel": 60,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 7600점",
            "트로피 : 분노의 요새 : 성벽 점령 달성"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2018-07-05"
    },
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "사무친 원한의 대저택",
        "requireLevel": 60,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 8200점"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2018-07-05"
    },
    // 60 Chaos Raid (was 54-56 dungeons)
    {
        "dungeonType": "카오스 레이드", //was Adventure[Hard] 10 persons Dungeon.
        "dungeonName": "서릿발 신전",
        "requireLevel": 60,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "dungeonEnterCondition": [
            "아이템점수 9900점"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2018-07-05",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 60,monsterId: 23200067, monsterName: "루카락스", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000064_b_bigwingchimera_p.png" },
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "마드라칸 첨탑",
        "requireLevel": 60,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "dungeonEnterCondition": [
            "아이템점수 9900점",
            "트로피 : 분노의 요새 : 잠입로 확보 달성"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2018-07-05",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 60,monsterId: 23000114, monsterName: "비에른", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000083_b_snowking_p.png" },
    },
    {
        "dungeonType": "카오스 레이드", //was Reverse Raid
        "dungeonName": "이계의 존재",
        "requireLevel": 60,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "dungeonEnterCondition": [
            "아이템점수 9900점"
        ],
        "dungeonDescription": "던전 설명 넣는 곳",
        "dungeonReleaseDate": "2018-07-05",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 60, monsterId: 23000115, monsterName: "핑크빈", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000088_b_pinkbean_p.png" },

    },
    //Eye Of Lapenta
    {
        "dungeonType": "아이 오브 라펜타",
        "dungeonName": "에메랄드 프리즌",
        "requireLevel": 60,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 11500점",
            "그린 라펜샤드에 공명 필요",
            "시간의 검 효과 필요"
        ],
        "dungeonDescription": "2018-08-16",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 60, dungeonReqLevel: 60, monsterId: 23501001, monsterName: "유페리아", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23501001_b_yuperiarbladerdark_p.png" },
    },
    {
        "dungeonType": "아이 오브 라펜타",
        "dungeonName": "그레이브 블루",
        "requireLevel": 60,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 11500점",
            "블루 라펜샤드에 공명 필요",
            "유페리아의 가호 필요"
        ],
        "dungeonDescription": "2018-08-16",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 60, monsterId: 23501011, monsterName: "렌듀비앙", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23501011_b_renduebianrbladerdark_p.png" },
    },
    {
        "dungeonType": "아이 오브 라펜타",
        "dungeonName": "터미너스 엔즈",
        "requireLevel": 60,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 11500점",
            "레드 라펜샤드에 공명 필요",
            "공간 균열 효과 필요"
        ],
        "dungeonDescription": "2018-08-16",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" :  {monsterLevel: 60, monsterId: 23000113, monsterName: "이슈라", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000113_b_ishurarbladerdark_p.png" },
    },
    {
        "dungeonType": "아이 오브 라펜타",
        "dungeonName": "블랙샤드 체임버",
        "requireLevel": 60,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "dungeonEnterCondition": [
            "아이템점수 14000점",
            "라펜샤드에 공명 필요",
            "강화된 시간의 검 효과 필요",
            "강화된 공간 균열 효과 필요",
            "강화된 유페리아의 가호 필요",
            "2018-08-30 이후 입장 가능"
        ],
        "dungeonDescription": "2018-08-16",
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : { monsterLevel: 60, monsterId: 23000118, monsterName: "이슈라", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000113_b_ishurarbladerdark_p.png" },
        
    },
    // 70 Adventure Dungeon(Hard) (Kritias)
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "알케이나 델파이온",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 12800점"
        ]
    },
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "에네르 캐슬 쟁탈전",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 14000점"
        ]
    },
    // 70 Chaos Raid (Kritias)
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "고대 에네르 광산[일반]",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 6,
        "dungeonEnterCondition": [
            "아이템점수 19500점"
        ]
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "고대 에네르 광산[어려움]",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "dungeonEnterCondition": [
            "아이템점수 24000점"
        ],
        
        "isRankInfoUpdatable":true,
        "isRankSearchable":true,
        "representiveBossMonster" : {monsterLevel: 70, monsterId: 23000072, monsterName: "자쿰", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000071_b_zakumbrown_p.png" },
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "인페르녹 최후의 결전[일반]",
        "requireLevel": 70,
        "minimumRequirePlayers": 1
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "인페르녹 최후의 결전[어려움]",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "isRankSearchable":true,
        "isRankInfoUpdatable":true,
        "representiveBossMonster" : {monsterLevel: 70, monsterId: 23000150, monsterName: "인페르녹", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000090_b_balrogmagicburster_p.png" },
    },
    {
        "dungeonType": "퀸크빈 럼블",
        "dungeonName": "퀸크빈 럼블",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 1,
        "dungeonEnterCondition": [
            "아이템점수 19000점"
        ]
    },
    //Santury of Darkness (Kritias Hard Dungeon)
    {
        "dungeonType": "칠흑의 성전",
        "dungeonName": "숨겨진 격납고",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "isRankSearchable":true,
        "isRankInfoUpdatable":true,
        "representiveBossMonster" : { monsterLevel: 70, monsterId: 23503003, monsterName: "아르케온 카이", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/29500102_n_archeonblack_p.png" },
    },
    {
        "dungeonType": "칠흑의 성전",
        "dungeonName": "공중요새 티마이온",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "isRankSearchable":true,
        "isRankInfoUpdatable":true,
        "representiveBossMonster" : { monsterLevel: 70,monsterId: 23504101, monsterName: "티마이온", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000103_b_timaion_p.png" },
    },
    {
        "dungeonType": "칠흑의 성전",
        "dungeonName": "음모의 전당",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "dungeonDescription": "",
        "isRankSearchable":true,
        "isRankInfoUpdatable":true,
        "representiveBossMonster" : { monsterLevel: 70,monsterId: 23000122, monsterName: "투르카", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000120_b_turkahoodforce_p.png" },
    },
    {
        "dungeonType": "이벤트",
        "dungeonName": "카트라무스 하층",
        "requireLevel": 60,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "이벤트",
        "dungeonName": "카트라무스 상층",
        "requireLevel": 60,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4
    },
    {
        "dungeonType": "이벤트",
        "dungeonName": "블랙 오닉스 타워",
        "requireLevel": 60,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 1
    },
    //70 Adventure Dungeon(Hard) (Crack of Timespace, illusion Dungeon)
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "환영의 트로닉스 벙커",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 35500점"
        ]
    },
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "환영의 잊혀진 바야르",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 12300점"
        ]
    },
    //70 Chaos Raid (Crack of Timespace, illusion Dungeon)
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "환영의 푸른 그림자 동굴[일반]",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 12300점"
        ]
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "환영의 푸른 그림자 동굴[어려움]",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 6,
        "dungeonEnterCondition": [
            "아이템점수 92300점"
        ],
        "dungeonDescription": "",
        "isRankSearchable":true,
        "isRankInfoUpdatable":true,
        "representiveBossMonster" : { monsterLevel: 70, monsterId: 23500004, monsterName: "슈슈와 부부스", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000035_b_yetitwoheadgreen_p.png" },
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "환영의 호루스의 둥지[일반]",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 183600"
        ]
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "환영의 호루스의 둥지[어려움]",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 6,
        "dungeonEnterCondition": [
            "아이템점수 198600점"
        ],
        "dungeonDescription": "",
        "isRankSearchable":true,
        "isRankInfoUpdatable":true,
        "representiveBossMonster" : {monsterLevel: 70, monsterId: 23500006, monsterName: "호루스", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000021_b_griffonpharaoh01_p.png" },
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "우당탕 블랙빈 놀이터[일반]",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템점수 231000점"
        ]
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "우당탕 블랙빈 놀이터[어려움]",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 10,
        "dungeonEnterCondition": [
            "아이템점수 255000점"
        ],
        "dungeonDescription": "",
        "isRankSearchable":true,
        "isRankInfoUpdatable":true,
        "representiveBossMonster" :  {monsterLevel: 70, monsterId: 23000101, monsterName: "블랙빈", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000089_b_blackbean_p.png" },
    },
    {
        "dungeonType": "모험[어려움]",
        "dungeonName": "환영의 불멸의 신전",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템 점수 183600점"
        ],
        "dungeonDescription": "잠든 줄 알았던 발록이 다시 깨어났다. 더 깊은 곳에서 더욱 더 강해진 힘으로 우리를 위협하고 있다. 다시 발록을 잠재울 수 있는 자는 누구인가?",
    },
    {
        "dungeonType": "이벤트",
        "dungeonName": "매드 닥터 피피의 연구소",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 2,
        "dungeonEnterCondition": [
            "아이템 점수 60700점"
        ],
        "dungeonDescription": "시간의 흐름을 어지럽히며 메이플 월드를 정복하려는 닥터 피피, 닥터 피피의 연구소에서 모험가들의 힘과 메이플 월드의 몬스터들을 철저히 분석해 만든 몬스터들이 등장했다고 한다.\n 매드 닥터의 연구소로 가서 닥터 피피의 코를 납작하게 눌러주자.",
        "dungeonReleaseDate": "2020-07-09"
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "환영의 그림자 제단[일반]",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템 점수 231000점"
        ],
        "dungeonDescription": "잠든 줄 알았던 데보라크가 다시 깨어났다. 더 깊은 곳에서 더욱 더 강해진 힘으로 우리를 위협하고 있다. 다시 데보라크를 잠재울 수 있는 자는 누구인가?",
        "dungeonReleaseDate": "2020-08-13"
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "환영의 그림자 제단[어려움]",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 6,
        "dungeonEnterCondition": [
            "아이템 점수 255000점"
        ],
        "dungeonDescription": "잠든 줄 알았던 데보라크가 다시 깨어났다. 더 깊은 곳에서 더욱 더 강해진 힘으로 우리를 위협하고 있다. 다시 데보라크를 잠재울 수 있는 자는 누구인가?",
        "dungeonReleaseDate": "2020-08-13",
        "isRankSearchable":true,
        "isRankInfoUpdatable":true,
        "representiveBossMonster" :  { monsterLevel: 70, monsterId: 23200008, monsterName: "데보라크", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/61000050_devilhugeblue_p.png" },
    },
    {
        "dungeonType": "이벤트",
        "dungeonName": "어둠의 샘",
        "requireLevel": 50,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템 점수 2021점"
        ],
        "dungeonReleaseDate": "2021-01-14",
        "dungeonClosedDate": "2021-02-18"
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "이계의 놀이터[일반]",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 4,
        "dungeonEnterCondition": [
            "아이템 점수 203000점"
        ],
        "dungeonDescription": "이계에서 소환된 장난꾸러기 블랙빈과 핑크빈이 모험가들을 그들의 놀이터로 소환했다. 블랙빈과 핑크빈을 물리치고 이계의 놀이터를 탈출하자.",
        "dungeonReleaseDate": "2021-02-18"
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "이계의 놀이터[어려움]",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 6,
        "dungeonEnterCondition": [
            "요구 레벨 80",
            "아이템 점수 265000점"
        ],
        "dungeonDescription": "이계에서 소환된 장난꾸러기 블랙빈과 핑크빈이 모험가들을 그들의 놀이터로 소환했다. 블랙빈과 핑크빈을 물리치고 이계의 놀이터를 탈출하자.",
        "dungeonReleaseDate": "2021-02-18",
        "isRankSearchable":true,
        "isRankInfoUpdatable":true,
        "representiveBossMonster" : { monsterLevel: 70, monsterId: 23000160, monsterName: "핑크빈", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000088_b_pinkbean_p.png" },
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "푸른 화염의 혼돈[일반]",
        "requireLevel": 80,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 6,
        "dungeonEnterCondition": [
            "요구 레벨 80",
            "아이템 점수 335000점"
        ],
        "dungeonDescription": "영원의 동굴 깊숙한 곳, 한때 영혼의 성채라 불리었던 지역 깊은 곳에서 수상한 공간이 발견되었다. 푸른 화염으로 뒤덮혀 강력한 힘이 느껴지는 이곳에는 거대한 골렘만이 남아있다. 대체 이곳에서 무슨 일이 있었던것일까? 우선 폭주화가 시작된 골렘을 잠재워보자.",
        "dungeonReleaseDate": "2021-09-09",
        "isRankSearchable":true,
        "isRankInfoUpdatable":false,
        //2021-09-09 new dungeon. (no longer used after 2021.10.14 update)
        "representiveBossMonster" : { monsterLevel: 70, monsterId: 23000400, monsterName: "블루 루크", dungeonClosed: true, thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000400_b_blueluke_p.png" },
    },
    //2021-10-14 hard mode dungeon update (and new record start)
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "푸른 화염의 혼돈[어려움]",
        "requireLevel": 80,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 6,
        "dungeonEnterCondition": [
            "요구 레벨 80",
            "아이템 점수 383000점"
        ],
        "dungeonDescription": "영원의 동굴 깊숙한 곳, 한때 영혼의 성채라 불리었던 지역 깊은 곳에서 수상한 공간이 발견되었다. 푸른 화염으로 뒤덮혀 강력한 힘이 느껴지는 이곳에는 거대한 골렘만이 남아있다. 대체 이곳에서 무슨 일이 있었던것일까? 우선 폭주화가 시작된 골렘을 잠재워보자.",
        "dungeonReleaseDate": "2021-10-14",
        "isRankSearchable":true,
        "isRankInfoUpdatable":true,
        "representiveBossMonster" : { monsterLevel: 70, monsterId: 23000401, monsterName: "광기 어린 블루 루크", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/23000400_b_blueluke_p.png" },
    },
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "환영의 비욘드 링크 트리스[일반]",
        "requireLevel": 70,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 6,
        "dungeonEnterCondition": [
            "아이템 점수 231000점"
        ],
        "dungeonDescription": "휴머노이드 공학이라는 기만책을 펼치며, 위험한 연구룰 총괄한 칸두라! 그림자 군단에 필적할 새로운 군단의 탄생은 이제 막바지에 이르렀는데… 칸두라를 쓰러뜨리고 그의 연구를 저지할 자는 과연 누구인가!",
        "dungeonReleaseDate": "2022-01-13",
    },
    //2022-05-12 붉은 장미 극장[일반](델라 로사)
    {
        "dungeonType": "카오스 레이드",
        "dungeonName": "붉은 장미의 극장[일반]",
        "requireLevel": 80,
        "minimumRequirePlayers": 1,
        "maximumRequirePlayers": 6,
        "dungeonEnterCondition": [
            "요구 레벨 80",
            "아이템 점수 501500점"
        ],
        "dungeonDescription": "붉은빛의 어둠 속, 균열의 시공간. 오래 전 불타 사라졌던 붉은 장미 극장이 발견되었다. 그곳에서 죽은 줄 알았던 메이플 월드 최고의 프리마돈나 델라 로사가 사라진 연주단원들을 이용해서 빛과 어둠의 아리아 공연을 펼치고 있었다. 그녀의 공연을 멈추지 않으면 시간의 균열은 더욱 가속화되고 세상이 위험에 빠질 수 있다.",
        "dungeonReleaseDate": "2022-05-12",
        "isRankSearchable":true,
        "isRankInfoUpdatable":true,
        "representiveBossMonster" :{ monsterLevel: 70, monsterId: 44100001, monsterName: "델라 로사", thumbnailImage: MAPLESTORY2_IMAGEPORTRAIT_DIR + "mob/41110001_b_primadonna_p.png"},
    },

]


//const data_bosslists = [];

function assemble(key_name, merges_from, merges_to){
    let _keys = Array.from(merges_from).reduce((a,c)=>{a[c[String(key_name)]]={...c}; return a;}, {});
    console.log(_keys);
    Array.from(merges_to).reduce((a,c)=>{
        let _target_source = _keys?.[c?.[key_name]];
        if(_target_source instanceof Object){
            a[c[key_name]]=Object.assign(_target_source,c); 
        }
        return a;
    },_keys);

    return _keys;
}

//console.log(assemble("dungeonName", temp_dungeon_datas, data_bosslists));