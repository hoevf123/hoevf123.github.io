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
            const data = await response.json();
            return data.records;
        } catch (error) {
            console.error(`Error loading ${path}:`, error);
            return [];
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

            this.data.wallpapers = this.sortByDate(wallpapers);
            this.data.music = this.sortByDate(music);
            this.data.crafting = this.sortByDate(crafting);

            return this.data;
        } catch (error) {
            console.error('Error loading all data:', error);
            return this.data;
        }
    }

    sortByDate(records) {
        return records.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
    }

    // 특정 카테고리의 데이터 가져오기
    getData(category) {
        return this.data[category] || [];
    }

    // 검색 및 필터링
    filterData(category, searchTerm = '', filterType = '') {
        let filteredData = this.getData(category);

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filteredData = filteredData.filter(item => 
                item.title.toLowerCase().includes(term)
            );
        }

        if (filterType) {
            filteredData = filteredData.filter(item => 
                item.type === filterType
            );
        }

        return filteredData;
    }
}

// 전역 인스턴스 생성
window.dataLoader = new DataLoader(); 