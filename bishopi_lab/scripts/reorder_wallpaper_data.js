const fs = require('fs');
const path = require('path');

// JSON 파일 읽기
const jsonPath = path.join(__dirname, '..', 'data', 'ms2_wallpaper.json');
const wallpaperData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// 데이터 순서 변경
wallpaperData.datas = wallpaperData.datas.map(item => {
    if (Array.isArray(item)) {
        // 3개의 값만 있는 경우 4번째 위치에 빈 문자열 추가
        if (item.length === 3) {
            const [title, link, date] = item;
            return [title, link, '', date];
        }
        // 4개 이상의 값이 있는 경우 날짜와 이미지 순서 교체
        else if (item.length >= 4) {
            const [title, link, date, image, ...rest] = item;
            return [title, link, image, date, ...rest];
        }
    }
    return item;
});

// 수정된 데이터를 원본 파일에 저장
fs.writeFileSync(jsonPath, JSON.stringify(wallpaperData, null, 4), 'utf8');

console.log('데이터 순서 변경이 완료되었습니다.');
console.log('원본 파일이 수정되었습니다:', jsonPath); 