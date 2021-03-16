let ms2_skin_tagframe_dicttype = [
    {
        tagType : "p",
        className : "ms2-skin-groupname",
    }
]
let ms2_skinset_tag_formats = [
    ["h1","ms2-skin-groupname ms2-dictdata-title"],
    ["p","ms2-skin-item"],
    ["p","ms2-released-date"]
];
let ms2_skinset_records = [
    /*
        skinset Array's content info
        ["Name of package(Title)",[
            {
                // wrting method to multiple value : you can input single value or multiple values using to input array.
                //
                // example
                // tradeType : "account-bind" //single value input
                // tradeType : ["account-bind" ,"non-sellable", "non-disassemble"] //multiple value input

                packageName : "package name when this set released"
                itemGrade : "Content (or packaged box) grade." //itemGrade : normal, rare, elite, excellent, legendary, epic. //item grades ruled of KMS2 item grade. NOT GMS2 rules.
                gettingMethod : "the way (how) to get contents"
                isFullgiven : "true : you can get full contents only one pick, false : you can get just one of full contents"
                tradeType : ["tradable", "#-tradbale", "#-repackable"(Not avaliale for skins, all of ridings), "account-bind", "character-bind", "not-allow-account-move", ...]
                genderType : "target of open and wear(or use) contents. male, female, any(or Nothing)"
                items : ["itemName1", "itemName2", ...]
                releasedDate : "Date of first package selling availablity"
                extinctedDate : "Date of first package selling NOT availablity"
            }
        ], "package's first reveailed Date"]               
        
    */
   
    ["폴 래빗 세트", [
        { packageName : "폴 래빗 세트", itemGrade : "excellent", gettingMethod : "(9월) 더키의 꾸미기 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "male", items :["폴 래빗 귀고리 (남)", "폴 래빗 모자 (남)", "폴 래빗 장갑 (남)", "폴 래빗 구두 (남)", "폴 래빗 매직 스카프 (남)", "폴 래빗 수트 (남)"], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "폴 래빗 세트", itemGrade : "excellent", gettingMethod : "(9월) 더키의 꾸미기 캡슐", isFullgiven : false,  tradeType : "account-bind",genderType : "female", items :["폴 래빗 귀고리 (여)", "폴 래빗 모자 (여)", "폴 래빗 장갑 (여)","폴 래빗 구두 (여)", "폴 래빗 매직 스카프 (여)", "폴 래빗 드레스 (여)"], releasedDate : "2020-09-01" , previewImage : "" },
    ], "2020-09-01"],
    ["가을 소풍 도토리 세트", [
        { packageName : "가을 소풍 도토리 세트", itemGrade : "excellent", gettingMethod : "(9월) 더키의 꾸미기 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "male", items :["가을 소풍 도토리 귀고리 (남)", "가을 소풍 도토리 모자 (남)", "가을 소풍 다람이 반지 (남)", "가을 소풍 도토리 부츠 (남)", "가을 소풍 오버롤 팬츠 (남)"], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "가을 소풍 도토리 세트", itemGrade : "excellent", gettingMethod : "(9월) 더키의 꾸미기 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "female", items :["가을 소풍 도토리 귀고리 (여)", "가을 소풍 도토리 모자 (여)", "가을 소풍 다람이 반지 (여)", "가을 소풍 큐티 스커트 (여)", "가을 소풍 오버롤 팬츠 (여)"], releasedDate : "2020-09-01" , previewImage : "" },                      
    ], "2020-09-01"],
    ["견습 파티셰 세트", [
        { packageName : "견습 파티셰 세트", itemGrade : "elite", gettingMethod : "(9월) 더키의 꾸미기 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "male", items :["견습 파티셰 컵케이크 모자 (남)", "견습 파티셰 상의 (남)", "견습 파티셰 하의 (남)", "견습 파티셰 오븐 장갑 (남)", "견습 파티셰 신발 (남)"], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "견습 파티셰 세트", itemGrade : "elite", gettingMethod : "(9월) 더키의 꾸미기 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "female", items :["견습 파티셰 컵케이크 모자 (여)", "견습 파티셰 상의 (남)", "견습 파티셰 하의 (여)", "견습 파티셰 오븐 장갑 (여)", "견습 파티셰 신발 (여)"], releasedDate : "2020-09-01" , previewImage : "" },
    ], "2020-09-01"],
    ["검은 고양이 세트", [
        { packageName : "검은 고양이 세트", itemGrade : "excellent", gettingMethod : "(9월) 더키의 꾸미기 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "male", items :["검은 고양이 모자 (남)", "검은 고양이 신발(남)", "검은 고양이 슈트 (남)", "검은 고양이 손 (남)"], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "검은 고양이 세트", itemGrade : "excellent", gettingMethod : "(9월) 더키의 꾸미기 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "female", items :["검은 고양이 모자 (여)", "검은 고양이 신발(여)", "검은 고양이 슈트 (여)", "검은 고양이 손 (여)"], releasedDate : "2020-09-01" , previewImage : "" },
    ], "2020-09-01"],
    ["커닝 집배원 세트",[
        { packageName : "커닝 집배원 세트", itemGrade : "excellent", gettingMethod : "(8월) 더키의 꾸미기 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "male", items :["커닝 집배원 안경", "커닝 집배원 모자", "커닝 집배원 부츠", "커닝 집배원의 든든한 조수", "커닝 집배원 유니폼"], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "커닝 집배원 세트", itemGrade : "excellent", gettingMethod : "(8월) 더키의 꾸미기 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "female", items :["커닝 집배원 안경", "커닝 집배원 모자", "커닝 집배원 부츠", "커닝 집배원의 든든한 조수", "커닝 집배원 유니폼"], releasedDate : "2020-09-01" , previewImage : "" },
    ], "2020-08-01"],
    ["커닝 경찰 세트",[
        { packageName : "커닝 집배원 세트", itemGrade : "excellent", gettingMethod : "(8월) 더키의 꾸미기 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "male", items :["커닝 경찰 귀고리", "커닝 경찰 모자", "커닝 경찰 글러브", "커닝 경찰 워커","커닝 경찰 수트"], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "커닝 집배원 세트", itemGrade : "excellent", gettingMethod : "(8월) 더키의 꾸미기 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "female", items :["커닝 경찰 귀고리", "커닝 경찰 모자", "커닝 경찰 글러브", "커닝 경찰 워커","커닝 경찰 수트"], releasedDate : "2020-09-01" , previewImage : "" },
    ], "2020-08-01"],
    ["로맨틱 웨딩 세트",[
        { packageName : "로맨틱 웨딩 룩 패키지", itemGrade : "legendary", gettingMethod : "메콩 5주년 스페셜 캡슐", isFullgiven : true, tradeType : "account-bind", genderType : "male", items :["로맨틱 웨딩 펄 이어링 (남)", "로맨틱 웨딩 페도라 (남)" ,"로맨틱 웨딩 펄 글러브 (남)", "로맨틱 웨딩 펄 슈즈 (남)", "로맨틱 웨딩 파티 벌룬 (남)", "로맨틱 웨딩 턱시도 (남)"], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "로맨틱 웨딩 룩 패키지", itemGrade : "legendary", gettingMethod : "메콩 5주년 스페셜 캡슐", isFullgiven : true, tradeType : "account-bind", genderType : "female", items :["로맨틱 웨딩 펄 글러브", "로맨틱 웨딩 티아라 (여)","로맨틱 웨딩 펄 글러브 (여)","로맨틱 웨딩 펄 슈즈(여)", "로맨틱 웨딩 파티 벌룬 (여)","로맨틱 웨딩 드레스 (여)"], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "로맨틱 웨딩 세트", itemGrade : "legendary", gettingMethod : "메콩 5주년 스페셜 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "male", items :["로맨틱 웨딩 펄 이어링 (남)", "로맨틱 웨딩 페도라 (남)" ,"로맨틱 웨딩 펄 글러브 (남)", "로맨틱 웨딩 펄 슈즈 (남)", "로맨틱 웨딩 파티 벌룬 (남)", "로맨틱 웨딩 턱시도 (남)"], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "로맨틱 웨딩 세트", itemGrade : "legendary", gettingMethod : "메콩 5주년 스페셜 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "female", items :["로맨틱 웨딩 펄 글러브", "로맨틱 웨딩 티아라 (여)","로맨틱 웨딩 펄 글러브 (여)","로맨틱 웨딩 펄 슈즈(여)", "로맨틱 웨딩 파티 벌룬 (여)","로맨틱 웨딩 드레스 (여)"], releasedDate : "2020-09-01" , previewImage : "" },
    ], "2020-07-09"],
    ["일루셔니스트 세트",[
        { packageName : "일루셔니스트 세트", itemGrade : "legendary", gettingMethod : "메콩 5주년 스페셜 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "male", items :["일루셔니스트 테슬 이어링 (남)", "일루셔니스트 깃털 모자 (남)", "일루셔니스트 다이아 장갑 (남)", "일루셔니스트 피죤 가렌더 (남)", "일루셔니스트 클래식 전신 (남)"], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "일루셔니스트 세트", itemGrade : "legendary", gettingMethod : "메콩 5주년 스페셜 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "female", items :["일루셔니스트 테슬 이어링 (여)", "일루셔니스트 깃털 모자 (여)", "일루셔니스트 다이아 장갑 (여)", "일루셔니스트 피죤 가렌더 (여)", "일루셔니스트 파티 드레스 (여)"], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "일루셔니스트 세트", itemGrade : "excellent", gettingMethod : "럭셔리 코디 키", isFullgiven : false, tradeType : ["1-tradable", "account-bind", "wear-to-character-bind"], genderType : "male", items :["일루셔니스트 테슬 이어링 (남)", "일루셔니스트 깃털 모자 (남)", "일루셔니스트 다이아 장갑 (남)", "일루셔니스트 피죤 가렌더 (남)", "일루셔니스트 클래식 전신 (남)"], releasedDate : "2020-09-01" , extinctedDate : "", previewImage : "" },
        { packageName : "일루셔니스트 세트", itemGrade : "excellent", gettingMethod : "럭셔리 코디 키", isFullgiven : false, tradeType : ["1-tradable", "account-bind", "wear-to-character-bind"], genderType : "female", items :["일루셔니스트 테슬 이어링 (여)", "일루셔니스트 깃털 모자 (여)", "일루셔니스트 다이아 장갑 (여)", "일루셔니스트 피죤 가렌더 (여)", "일루셔니스트 파티 드레스 (여)"], releasedDate : "2020-09-01", extinctedDate : "" , previewImage : "" },
    ]],
    ["플로리아 페어리 세트",[
        { packageName : "플로리아 페어리 세트", itemGrade : "excellent", gettingMethod : "메콩 5주년 스페셜 캡슐", isFullgiven : false, genderType : "male", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "플로리아 페어리 세트", itemGrade : "excellent", gettingMethod : "메콩 5주년 스페셜 캡슐", isFullgiven : false, genderType : "female", items :[], releasedDate : "2020-09-01" , previewImage : "" },
    ]],
    ["궁중 예복 세트",[
        { packageName : "궁중 예복 세트", itemGrade : "excellent", gettingMethod : "메콩 5주년 스페셜 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "male", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "궁중 예복 세트", itemGrade : "excellent", gettingMethod : "메콩 5주년 스페셜 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "female", items :[], releasedDate : "2020-09-01" , previewImage : "" },
    ]],
    ["색동 한복 세트",[
        { packageName : "색동 한복 세트", itemGrade : "excellent", gettingMethod : "메콩 5주년 스페셜 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "male", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "색동 한복 세트", itemGrade : "excellent", gettingMethod : "메콩 5주년 스페셜 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "female", items :[], releasedDate : "2020-09-01" , previewImage : "" },
    ]],
    ["보름달 한복 세트",[
        { packageName : "보름달 한복 세트", itemGrade : "excellent", gettingMethod : "메콩 5주년 스페셜 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "male", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "보름달 한복 세트", itemGrade : "excellent", gettingMethod : "메콩 5주년 스페셜 캡슐", isFullgiven : false, tradeType : "account-bind", genderType : "female", items :[], releasedDate : "2020-09-01" , previewImage : "" },
    ]],
    ["모던 한복 세트",[
        { packageName : "모던 한복 세트", itemGrade : "excellent", gettingMethod : "메콩 5주년 스페셜 캡슐", isFullgiven : false,  tradeType : "account-bind", genderType : "male", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "모던 한복 세트", itemGrade : "excellent", gettingMethod : "메콩 5주년 스페셜 캡슐", isFullgiven : false,  tradeType : "account-bind", genderType : "female", items :[], releasedDate : "2020-09-01" , previewImage : "" },
    ]],
    ["펑키 네온 캣 세트",[
        { packageName : "펑키 네온 캣 옵션 룩 패키지", itemGrade : "excellent", gettingMethod : "메럿 마켓", isFullgiven : true,  tradeType : "account-bind", genderType : "male", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "펑키 네온 캣 옵션 룩 패키지", itemGrade : "excellent", gettingMethod : "메럿 마켓", isFullgiven : true,  tradeType : "account-bind", genderType : "female", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "펑키 네온 캣 옵션 룩 세트", itemGrade : "excellent", gettingMethod : "메럿 마켓", isFullgiven : true,  tradeType : "account-bind", genderType : "male", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "펑키 네온 캣 옵션 룩 세트", itemGrade : "excellent", gettingMethod : "메럿 마켓", isFullgiven : true,  tradeType : "account-bind", genderType : "female", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "다크 네온 웨폰 박스", itemGrade : "excellent", gettingMethod : "펑키 네온 캣 세트 6부위 모두 착용", isFullgiven : true,  tradeType : ["account-bind", "wear-to-character-bind"], genderType : "any", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "펑키 네온 캣 세트", itemGrade : "excellent", gettingMethod : "럭셔리 코디 키", isFullgiven : false,  tradeType : ["1-tradable", "account-bind", "wear-to-character-bind"], genderType : "male", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "펑키 네온 캣 세트", itemGrade : "excellent", gettingMethod : "럭셔리 코디 키", isFullgiven : false,  tradeType : ["1-tradable", "account-bind", "wear-to-character-bind"], genderType : "female", items :[], releasedDate : "2020-09-01" , previewImage : "" },
    ]],
    ["키튼 메이드 세트",[
        { packageName : "냥냥냥 패키지", itemGrade : "excellent", gettingMethod : "키튼 메이드 세트 6부위 모두 착용", isFullgiven : false,  tradeType : ["1-tradable", "account-bind", "wear-to-character-bind"], genderType : "male", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "키튼 메이드 세트", itemGrade : "excellent", gettingMethod : "럭셔리 코디 키", isFullgiven : false,  tradeType : ["1-tradable", "account-bind", "wear-to-character-bind"], genderType : "male", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "키튼 메이드 세트", itemGrade : "excellent", gettingMethod : "럭셔리 코디 키", isFullgiven : false,  tradeType :  ["1-tradable", "account-bind", "wear-to-character-bind"], genderType : "female", items :[], releasedDate : "2020-09-01" , previewImage : "" },
    ]],
    ["샤인스타 세트",[
        { packageName : "샤인 스타 세트", itemGrade : "excellent", gettingMethod : "1월 더키의 꾸미기 캡슐", isFullgiven : false,  tradeType :["account-bind", "wear-to-character-bind"], genderType : "male", items :[], releasedDate : "2021-01-01" , previewImage : "" },
        { packageName : "샤인 스타 세트", itemGrade : "excellent", gettingMethod : "1월 더키의 꾸미기 캡슐", isFullgiven : false,  tradeType : ["account-bind", "wear-to-character-bind"], genderType : "female", items :[], releasedDate : "2021-01-01" , previewImage : "" },
        { packageName : "샤인스타 룩 세트", itemGrade : "excellent", gettingMethod : "더키 캡슐 (10주차)", isFullgiven : false,  tradeType :["account-bind", "wear-to-character-bind"], genderType : "male", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "샤인스타 룩 세트", itemGrade : "excellent", gettingMethod : "더키 캡슐 (10주차)", isFullgiven : false,  tradeType : ["account-bind", "wear-to-character-bind"], genderType : "female", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "샤인스타 옵션 룩 세트", itemGrade : "excellent", gettingMethod : "메럿 마켓", isFullgiven : true,  tradeType :["account-bind", "wear-to-character-bind"], genderType : "male", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "샤인스타 옵션 룩 세트", itemGrade : "excellent", gettingMethod : "메럿 마켓", isFullgiven : true,  tradeType : ["account-bind", "wear-to-character-bind"], genderType : "female", items :[], releasedDate : "2020-09-01" , previewImage : "" },
    ]],
    ["러블리 츄츄 세트",[
        { packageName : "돌아온 러블리 츄츄 룩 세트", itemGrade : "normal", gettingMethod : "메럿 마켓", isFullgiven : true,  tradeType :["account-bind", "wear-to-character-bind"], genderType : "male", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "돌아온 러블리 츄츄 룩 세트", itemGrade : "normal", gettingMethod : "메럿 마켓", isFullgiven : true,  tradeType : ["account-bind", "wear-to-character-bind"], genderType : "female", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "러블리 츄츄 룩 세트", itemGrade : "normal", gettingMethod : "메럿 마켓", isFullgiven : true,  tradeType :["account-bind", "wear-to-character-bind"], genderType : "male", items :[], releasedDate : "2020-09-01" , previewImage : "" },
        { packageName : "러블리 츄츄 룩 세트", itemGrade : "normal", gettingMethod : "메럿 마켓", isFullgiven : true,  tradeType : ["account-bind", "wear-to-character-bind"], genderType : "female", items :[], releasedDate : "2020-09-01" , previewImage : "" },
    ]],
];
let ms2_skinsets = new DictData("스킨 세트", ms2_skinset_tag_formats, ms2_skinset_records,"ms2-dict-represent-area");
let ms2_dict_collections = new DictCollection(ms2_skinsets);
window.onload = function (e) {
    ms2_dict_collections.representData();
    //ms2_bgms.representData();
    // ms2_bgms.clearTags();
}