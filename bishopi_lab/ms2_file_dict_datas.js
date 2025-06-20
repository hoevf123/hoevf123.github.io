// 데이터 형식 정의
const ms2_wallpaper_tag_formats = [
    ['p', 'title ms2-dictdata-title'],
    ['p', 'link-addr'],
    ['p', 'link-date'],
    ['img', 'thumb-img'],
    ['a', 'link-img'],
    ['p', 'hash-tag']
];

const ms2_bgm_records_format = [
    ["p", "title ms2-dictdata-title"],
    ["p", "music_play_location"],
    ["p", "ms2_file_name ms2-dictdata-title"],
    ["a", "bgm_src"]
];

// 데이터 로더 클래스
class DataLoader {
    constructor() {
        this.data = {
            wallpapers: [],
            music: [],
            crafting: []
        };
    }

    // JSON 파일 로드
    async loadJsonFile(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error loading ${path}:`, error);
            return { records: [] };
        }
    }

    // 모든 데이터 로드
    async loadAllData() {
        try {
            const [wallpapers, music, crafting] = await Promise.all([
                this.loadJsonFile('./data/wallpapers.json'),
                this.loadJsonFile('./data/music.json'),
                this.loadJsonFile('./data/crafting.json')
            ]);

            this.data.wallpapers = wallpapers.records;
            this.data.music = music.records;
            this.data.crafting = crafting.records;

            // 날짜순으로 정렬
            Object.keys(this.data).forEach(category => {
                if (this.data[category].length > 0) {
                    this.data[category].sort((a, b) => {
                        const dateA = new Date(a.date || '');
                        const dateB = new Date(b.date || '');
                        return dateB - dateA;
                    });
                }
            });

            return this.data;
        } catch (error) {
            console.error('Error loading data:', error);
            return this.data;
        }
    }

    // 특정 카테고리의 데이터 가져오기
    getData(category) {
        return this.data[category] || [];
    }

    // 검색 및 필터링
    filterData(category, searchTerm = '', filterType = 'all') {
        const data = this.getData(category);
        return data.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterType === 'all' || item.type === filterType;
            return matchesSearch && matchesFilter;
        });
    }
}

// 전역 인스턴스 생성
window.dataLoader = new DataLoader();