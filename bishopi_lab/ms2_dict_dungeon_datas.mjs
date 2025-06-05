// 더미 데이터로만 남겨두겠습니다.
import {temp_dungeon_datas} from "./ms2_datawarehouse_dungeon_datas.mjs";

let ms2_dungeon_tagtypes=[
    ["p","ms2-dungeon-type ms2-dictdata-title"],
    ["p","ms2-dungeon-name ms2-dictdata-title"],
    ["p","ms2-require-level"],
    ["p","ms2-minimum-require-players"],
    ["p","ms2-maximum-require-players"],
    ["p","ms2-dungeon-enter-condition"],
    ["p","ms2-dungeon-description"],
    ["p","ms2-dungeon-release-date"],
    ["p","ms2-dungeon-closed-date"]
];

let ms2_flacibo_dungeon_tagtypes=[
    ["p","dungeon-type"],
    ["p","dungeon-name"],
    ["p","require-level"],
    ["p","minimum-require-players"],
    ["p","maximum-require-players"],
    ["p","dungeon-enter-condition"],
    ["p","dungeon-description"],
    ["p","dungeon-release-date"],
    ["p","dungeon-closed-date"]
];

// 던전 정보 제목 매핑
const dungeonInfoTitles = {
    "ms2-dungeon-type": "던전 타입",
    "ms2-dungeon-name": "던전 이름",
    "ms2-require-level": "요구 레벨",
    "ms2-minimum-require-players": "최소 인원",
    "ms2-maximum-require-players": "최대 인원",
    "ms2-dungeon-enter-condition": "입장 조건",
    "ms2-dungeon-description": "던전 설명",
    "ms2-dungeon-release-date": "출시일",
    "ms2-dungeon-closed-date": "종료일"
};

// 입장 조건 포맷팅 함수
function formatEnterCondition(condition) {
    // condition이 없는 경우 빈 문자열 반환
    if (!condition) return '';
    
    // 배열인 경우 각 조건을 줄바꿈으로 구분
    if (Array.isArray(condition)) {
        return condition.join('\n• ');
    }
    
    // 문자열인 경우 쉼표나 마침표로 구분된 조건들을 분리
    if (typeof condition === 'string') {
        const conditions = condition.split(/[,.]/).filter(c => c.trim());
        if (conditions.length <= 1) return condition;
        return conditions.map(c => c.trim()).join('\n• ');
    }
    
    return '';
}

// 날짜 포맷팅 함수
function formatDate(dateStr) {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}년 ${month}월 ${day}일`;
}

// 던전 데이터 생성
let ms2_dungeon_datas = temp_dungeon_datas.reduce((a,c,i)=>{
    let _arr = [
        c?.["dungeonType"],
        c?.["dungeonName"],
        c?.["requireLevel"],
        c?.["minimumRequirePlayers"],
        c?.["maximumRequirePlayers"],
        formatEnterCondition(c?.["dungeonEnterCondition"]),
        c?.["dungeonDescription"],
        formatDate(c?.["dungeonReleaseDate"]),
        formatDate(c?.["dungeonClosedDate"])
    ];
    a.push(_arr);
    return a;
},[]);

let ms2_dungeon_categorized_datas = ms2_dungeon_datas.reduce((a,c)=>{
    Array.isArray(a[c[0]]) ? a[c[0]].push(c) : a[c[0]]=[c];
    return a;
},{});

// DictData 클래스 확장
class ExtendedDictData extends DictData {
    representData(represent_tag_target) {
        if(represent_tag_target==undefined){
            represent_tag_target=this.represent_tag_target;
        }
        if (represent_tag_target!==undefined) {
            function CreateTag(tagFormat, content, index) {
                if (!Array.isArray(tagFormat)) {
                    const element = document.createElement(tagFormat);
                    if (content) {
                        element.textContent = content;
                    }
                    return element;
                }

                const [tagName, className, subTags] = tagFormat;
                const element = document.createElement(tagName);
                
                if (className) {
                    element.className = className;
                }

                if (content === undefined || content === null) {
                    return element;
                }

                // 제목이 필요한 항목에 제목 추가
                if (tagName === 'p' && className !== 'ms2-dungeon-type ms2-dictdata-title' && className !== 'ms2-dungeon-name ms2-dictdata-title') {
                    const title = dungeonInfoTitles[className];
                    if (title) {
                        const titleElement = document.createElement('strong');
                        titleElement.className = 'info-title';
                        titleElement.textContent = title + ': ';
                        element.appendChild(titleElement);
                    }
                }

                // 입장 조건인 경우 특별한 포맷팅 적용
                if (className === 'ms2-dungeon-enter-condition') {
                    if (content.includes('\n')) {
                        const lines = content.split('\n');
                        const conditionList = document.createElement('ul');
                        conditionList.className = 'enter-condition-list';
                        
                        lines.forEach(line => {
                            if (line.trim()) {
                                const listItem = document.createElement('li');
                                listItem.textContent = line.replace('•', '').trim();
                                conditionList.appendChild(listItem);
                            }
                        });
                        
                        element.appendChild(conditionList);
                        return element;
                    }
                }

                // 날짜 표시 스타일 적용
                if (className === 'ms2-dungeon-release-date' || className === 'ms2-dungeon-closed-date') {
                    const dateContainer = document.createElement('div');
                    dateContainer.className = 'date-container';
                    
                    const icon = document.createElement('span');
                    icon.className = className === 'ms2-dungeon-release-date' ? 'date-icon release' : 'date-icon closed';
                    icon.textContent = className === 'ms2-dungeon-release-date' ? '📅' : '🔒';
                    
                    const dateText = document.createElement('span');
                    dateText.className = 'date-text';
                    dateText.textContent = content;
                    
                    dateContainer.appendChild(icon);
                    dateContainer.appendChild(dateText);
                    element.appendChild(dateContainer);
                    return element;
                }

                // 기존 내용 추가
                if (tagName === 'a' && className === 'link-addr') {
                    element.href = content;
                    element.textContent = content;
                }
                else if (tagName === 'img') {
                    element.src = content;
                    element.alt = '';
                }
                else if (tagName === 'audio') {
                    element.controls = true;
                    element.src = content;
                }
                else if (tagName === 'div' && className === 'pallete-cost' && Array.isArray(content)) {
                    const [price, currency] = content;
                    
                    const priceElement = document.createElement(subTags[0][0]);
                    priceElement.className = subTags[0][1];
                    priceElement.textContent = price.toLocaleString();
                    element.appendChild(priceElement);
                    
                    const currencyElement = document.createElement(subTags[1][0]);
                    currencyElement.className = `${subTags[1][1]} ${currency}`;
                    currencyElement.textContent = currency === 'meso' ? '메소' : '메릿';
                    element.appendChild(currencyElement);
                }
                else if (tagName === 'div' && (className === 'hash-tags' || className === 'pallete-tags') && Array.isArray(content)) {
                    content.forEach(tag => {
                        const span = document.createElement('span');
                        span.textContent = tag;
                        element.appendChild(span);
                    });
                }
                else if (tagName === 'a' && className === 'download-links' && Array.isArray(content)) {
                    content.forEach(link => {
                        const linkElement = document.createElement('a');
                        linkElement.href = link;
                        linkElement.textContent = link;
                        linkElement.className = 'download-link';
                        element.appendChild(linkElement);
                    });
                }
                else if (tagName === 'div' && className === 'bgm_filename') {
                    if (Array.isArray(content)) {
                        content.forEach(filename => {
                            const filenameElement = document.createElement('div');
                            filenameElement.className = 'filename-item';
                            filenameElement.textContent = filename;
                            element.appendChild(filenameElement);
                        });
                    } else {
                        element.textContent = content;
                    }
                }
                else if (tagName === 'a' && className === 'bgm_src') {
                    element.href = content;
                    element.textContent = content;
                    if (content.includes('maplestory2.nexon.com')) {
                        element.classList.add('reference-link');
                    } else {
                        element.classList.add('download-link');
                    }
                }
                else if (Array.isArray(content)) {
                    content.forEach(item => {
                        if (subTags) {
                            const subElement = CreateTag(subTags, item);
                            if (subElement) {
                                element.appendChild(subElement);
                            }
                        } else {
                            const textNode = document.createTextNode(item);
                            element.appendChild(textNode);
                        }
                    });
                }
                else {
                    element.textContent = content;
                }

                return element;
            }

            let tag_root = document.createElement("div");
            tag_root.className = "dict-result " + this.typename;

            let tag_dictdatas = [];
            for(let idx_datas = 0 ; idx_datas < this.datas.length ; idx_datas++){
                let c = this.datas[idx_datas];
                let tuple_tag_format = this.tuple_tag_format;
                let target_data_arr = Array.isArray(c) ? c : [c];

                let tag_cell_root = document.createElement("div");
                tag_cell_root.className = "dict-data";
                tag_cell_root.addEventListener("click", function(){
                    let str_selected_className = "selected";
                    if(this.classList.contains(str_selected_className)) {
                        this.classList.remove(str_selected_className);
                    } else {
                        this.classList.add(str_selected_className);
                    }
                });

                target_data_arr.forEach((data_cell, idx_data_cell) => {
                    if(tuple_tag_format[idx_data_cell] instanceof Array) {
                        let tag_name = tuple_tag_format[idx_data_cell][0];
                        let tag_className = tuple_tag_format[idx_data_cell][1];
                        let subTags = tuple_tag_format[idx_data_cell][2];
                        const element = CreateTag([tag_name, tag_className, subTags], data_cell, idx_data_cell);
                        if(element) {
                            tag_cell_root.appendChild(element);
                        }
                    }
                });

                if(tag_cell_root.hasChildNodes()) {
                    tag_dictdatas.push(tag_cell_root);
                }
            }

            tag_dictdatas.forEach(e => tag_root.appendChild(e));

            let target = document.getElementById(represent_tag_target);
            if(target) {
                target.appendChild(tag_root);
            }
        }
    }
}

let ms2_dictdata_dungeon_datas = new ExtendedDictData("전체", ms2_dungeon_tagtypes, ms2_dungeon_datas, "ms2-dict-represent-area");
let ms2_dict_categorized_dictdatas = Object.keys(ms2_dungeon_categorized_datas).reduce((a,c)=>{
    a.push(new ExtendedDictData(c, ms2_dungeon_tagtypes, ms2_dungeon_categorized_datas[c], "ms2-dict-represent-area"));
    return a;
},[ms2_dictdata_dungeon_datas]);

let ms2_dict_collections = new DictCollection(...ms2_dict_categorized_dictdatas);

// @param target_text : it is string
function barToUppercase(target_text){
    let detect_bar = false;
    const LETTER_BAR = "-";
    return Array.from(target_text).reduce((a,c,i)=>{
        if(detect_bar === true){
            a = a + new String(c).toUpperCase();
            detect_bar = false;
        }
        else if(c == LETTER_BAR)detect_bar = true;
        else a = a + new String(c);
        return a;
    },"");
}

let ms2_mydungeon = ms2_dungeon_datas.reduce((a,c)=>{
    Array.isArray(c) ? a.push(c.reduce((acc,cul,idx)=>{
        acc[barToUppercase(ms2_flacibo_dungeon_tagtypes[idx][1])]=cul;
        return acc;
    },{})): undefined;
    return a;
}, []);

// 현재 선택된 카테고리와 검색어를 저장하는 변수들
let currentCategory = "전체";
let currentSearchTerm = "";

// 던전 데이터 필터링 함수
function filterDungeonData() {
    const dictDataElements = document.querySelectorAll('.dict-data');
    
    dictDataElements.forEach(element => {
        const dungeonName = element.querySelector('.ms2-dungeon-name')?.textContent.toLowerCase() || '';
        const dungeonType = element.querySelector('.ms2-dungeon-type')?.textContent.toLowerCase() || '';
        
        // 카테고리 필터링
        const matchesCategory = currentCategory === "전체" || dungeonType === currentCategory.toLowerCase();
        
        // 검색어 필터링
        const matchesSearch = currentSearchTerm === "" || 
            dungeonName.includes(currentSearchTerm) || 
            dungeonType.includes(currentSearchTerm);
        
        // 두 조건을 모두 만족하는 경우에만 표시
        element.style.display = (matchesCategory && matchesSearch) ? '' : 'none';
    });
}

// 검색 기능 구현
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            currentSearchTerm = e.target.value.toLowerCase();
            filterDungeonData();
        });
    }
}

// 카테고리 ID 생성 함수
function generateCategoryId(category) {
    return category.toLowerCase()
        .replace(/[\[\]]/g, '') // 대괄호 제거
        .replace(/\s+/g, '-')   // 공백을 하이픈으로 변경
        .replace(/[^a-z0-9-]/g, ''); // 영문자, 숫자, 하이픈만 남김
}

// URL 해시에 따른 카테고리 설정
function setCategoryFromHash() {
    const hash = window.location.hash.slice(1); // '#' 제거
    if (hash) {
        const category = Object.keys(ms2_dungeon_categorized_datas).find(
            cat => generateCategoryId(cat) === hash
        );
        if (category) {
            currentCategory = category;
            const button = document.querySelector(`[data-category-id="${hash}"]`);
            if (button) {
                document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterDungeonData();
            }
        }
    }
}

// 카테고리 버튼 생성 및 이벤트 처리
function setupCategoryButtons() {
    const categoryButtons = document.getElementById('categoryButtons');
    if (!categoryButtons) return;

    // 기존 버튼 제거
    categoryButtons.innerHTML = '';
    
    // "전체" 버튼 추가
    const allButton = document.createElement('button');
    allButton.className = 'category-btn active';
    allButton.textContent = '전체';
    allButton.setAttribute('data-category-id', 'all');
    allButton.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        allButton.classList.add('active');
        currentCategory = "전체";
        window.location.hash = 'all';
        filterDungeonData();
    });
    categoryButtons.appendChild(allButton);
    
    // 각 카테고리 버튼 추가
    const categories = Object.keys(ms2_dungeon_categorized_datas).sort();
    categories.forEach(category => {
        const categoryId = generateCategoryId(category);
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.textContent = category;
        button.setAttribute('data-category-id', categoryId);
        button.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = category;
            window.location.hash = categoryId;
            filterDungeonData();
        });
        categoryButtons.appendChild(button);
    });
}

// 초기화 함수
function initializeDungeonPage() {
    ms2_dict_collections.representData();
    setupSearch();
    setupCategoryButtons();
    setCategoryFromHash(); // URL 해시에 따른 초기 카테고리 설정
}

// 페이지 로드 시 초기화
window.onload = initializeDungeonPage;

// 던전 데이터 초기화 및 표시
document.addEventListener('DOMContentLoaded', () => {
    // 던전 데이터 초기화
    const dungeonDictData = new ExtendedDictData(
        "dungeon",
        ms2_dungeon_tagtypes,
        ms2_dungeon_datas,
        "ms2-dict-represent-area"
    );

    // 카테고리 버튼 생성
    const categoryButtons = document.getElementById('categoryButtons');
    const categories = Object.keys(ms2_dungeon_categorized_datas);
    
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.textContent = category;
        button.addEventListener('click', () => {
            // 모든 버튼에서 active 클래스 제거
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            // 클릭된 버튼에 active 클래스 추가
            button.classList.add('active');
            
            // 선택된 카테고리의 던전 데이터만 표시
            const filteredData = ms2_dungeon_categorized_datas[category];
            dungeonDictData.datas = filteredData;
            dungeonDictData.clearTags();
            dungeonDictData.representData();
        });
        categoryButtons.appendChild(button);
    });

    // 검색 기능 구현
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredData = ms2_dungeon_datas.filter(dungeon => 
            dungeon[1].toLowerCase().includes(searchTerm) || // 던전 이름으로 검색
            dungeon[0].toLowerCase().includes(searchTerm)    // 던전 타입으로 검색
        );
        dungeonDictData.datas = filteredData;
        dungeonDictData.clearTags();
        dungeonDictData.representData();
    });

    // 초기 데이터 표시
    if (categories.length > 0) {
        const firstCategory = categories[0];
        const firstButton = categoryButtons.querySelector('.category-btn');
        if (firstButton) {
            firstButton.classList.add('active');
            dungeonDictData.datas = ms2_dungeon_categorized_datas[firstCategory];
            dungeonDictData.representData();
        }
    }
});