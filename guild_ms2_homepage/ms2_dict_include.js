
class DictData{
    constructor(typename,tuples){
        this.typename=typename;
        this.datas = tuples;
    }
    representData(){
        if(true){
            for(var a in this.datas){
                let title = this.datas[a][0];
                let link_addr = this.datas[a][1];
                let link_date = this.datas[a][2];
                
                function CreateTag(tag_name, tag_classname, innerText){
                    let tag = document.createElement(new String(tag_name));
                    tag.className=new String(tag_classname);
                    innerText = new String(innerText);
                    if(innerText.trim().startsWith("http")){
                        let link_tag = document.createElement("a");
                        link_tag.href=innerText.trim();
                        link_tag.innerText=innerText;
                        tag.appendChild(link_tag);
                    }
                    else{
                        tag.innerText = innerText;
                    }
                    
                    return tag;
                }

                let tag_root = CreateTag("div", "dict-data","");

                let tag_title = CreateTag("p", "title", title);
                let tag_link_addr = CreateTag("p", "link_addr", link_addr);
                let tag_link_date = CreateTag("p", "link_date", link_date);

                [tag_title, tag_link_addr, tag_link_date].forEach(e=>{tag_root.appendChild(e)});

                let tags = document.getElementsByClassName("ms2-dict-represent-area");
                Array.prototype.forEach.call(tags, e=>e.appendChild(document.createElement("li").appendChild(tag_root)));
            }
        }
        
    }
}
ms2_illust_records = [
    ["메이플스토리2", "http://maplestory2.nexon.com/News/DetailView?&s=583707", "2013-11-05 00:00"],
    ["3D CASUAL MMORPG, 메~이플스토리2", "http://maplestory2.nexon.com/News/DetailView?&s=583708", "2013-11-08 00:00"],
    ["COMING SOON 2014", "http://maplestory2.nexon.com/News/DetailView?&s=583709", "2013-11-13 00:00"],
    ["새로운 모험의 시작, MAPLESTORY2", "http://maplestory2.nexon.com/News/DetailView?&s=583710", "2013-11-18 00:00"],
    ["LET'S MAPLE!!", "http://maplestory2.nexon.com/News/DetailView?&s=583711", "2013-11-22 00:00"],
    ["Stands With a Fist", "http://maplestory2.nexon.com/News/DetailView?&s=583712", "2013-11-27 00:00"],
    ["사나이 울리는 냄뚜라면", "http://maplestory2.nexon.com/News/DetailView?&s=583713", "2013-12-02 00:00"],
    ["꿈틀이와 메이플독수리2", "http://maplestory2.nexon.com/News/DetailView?&s=583714", "2013-12-05 00:00"],
    ["Desperado", "http://maplestory2.nexon.com/News/DetailView?&s=583716", "2013-12-06 00:00"],
    ["DEVLIN", "http://maplestory2.nexon.com/News/DetailView?&s=583717", "2013-12-09 00:00"],
    ["BELLA", "http://maplestory2.nexon.com/News/DetailView?&s=583718", "2013-12-12 00:00"],
    ["MAPLESTORY2, PRELUDE", "http://maplestory2.nexon.com/News/DetailView?&s=583719", "2013-12-13 00:00"],
    ["[CHRISTMAS] 01", "http://maplestory2.nexon.com/News/DetailView?&s=583720", "2013-12-20 00:00"],
    ["[CHRISTMAS] 02", "http://maplestory2.nexon.com/News/DetailView?&s=583721", "2013-12-23 00:00"],
    ["[CHRISTMAS] 03", "http://maplestory2.nexon.com/News/DetailView?&s=583722", "2013-12-24 00:00"],
    ["[ CHRISTMAS] 04", "http://maplestory2.nexon.com/News/DetailView?&s=583723", "2013-12-27 00:00"],
    ["[ CHRISTMAS] FINAL 뇌전수리검", "http://maplestory2.nexon.com/News/DetailView?&s=583728", "2013-12-30 00:00"],
    ["Happy New Year 2014", "http://maplestory2.nexon.com/News/DetailView?&s=583725", "2014-01-01 00:00"],
    ["[ 폴라로이드] 새로운이야기", "http://maplestory2.nexon.com/News/DetailView?&s=583725", "2014-01-06 00:00"],
    ["[ 폴라로이드 EP] 마을 길목에서 만난 냥이", "http://maplestory2.nexon.com/News/DetailView?&s=583727", "2014-01-10 00:00"],
    ["슬라임 - I'M YOUR FATHER !", "http://maplestory2.nexon.com/News/DetailView?&s=583728", "2014-01-15 00:00"],
    ["새해 복 많이 받으세요!!", "http://maplestory2.nexon.com/News/DetailView?&s=583732", "2014-01-31 00:00"],
    ["인소야닷컴 10주년 축전", "http://maplestory2.nexon.com/News/DetailView?&s=583734", "2014-02-07 00:00"],
    ["[네미] 소개", "http://maplestory2.nexon.com/News/DetailView?&s=583735", "2014-02-10 00:00"],
    ["발렌타인데이", "http://maplestory2.nexon.com/News/DetailView?&s=583737", "2014-02-14 00:00"],
    ["[네미] 시대적 배경", "http://maplestory2.nexon.com/News/DetailView?&s=583738", "2014-02-18 00:00"],
    ["[소개] 벨라", "http://maplestory2.nexon.com/News/DetailView?&s=583740", "2014-02-25 00:00"],
    ["[소개] 트라이아", "http://maplestory2.nexon.com/News/DetailView?&s=583741", "2014-02-27 00:00"],
    ["[폴라로이드] 모험가", "http://maplestory2.nexon.com/News/DetailView?&s=583742", "2014-03-04 00:00"],
    ["화이트데이", "http://maplestory2.nexon.com/News/DetailView?&s=583745", "2014-03-14 00:00"],
    ["[직업소개] 나이트", "http://maplestory2.nexon.com/News/DetailView?&s=583746", "2014-03-19 00:00"],
    ["[직업소개] 버서커", "http://maplestory2.nexon.com/News/DetailView?&s=583747", "2014-03-24 00:00"],
    ["디스이즈게임 9주년 축전", "http://maplestory2.nexon.com/News/DetailView?&s=583749", "2014-04-01 00:00"],
    ["[직업소개] 프리스트", "http://maplestory2.nexon.com/News/DetailView?&s=583750", "2014-04-07 00:00"],
    ["[직업소개] 위자드", "http://maplestory2.nexon.com/News/DetailView?&s=583751", "2014-04-11 00:00"],
    ["[직업소개] 레인저", "http://maplestory2.nexon.com/News/DetailView?&s=583755", "2014-04-29 00:00"],
    ["어린이날", "http://maplestory2.nexon.com/News/DetailView?&s=583756", "2014-07-08 00:00"],
    ["[직업소개] 헤비거너", "http://maplestory2.nexon.com/News/DetailView?&s=583763", "2014-06-03 00:00"],
    ["[직업소개] 어쌔신", "http://maplestory2.nexon.com/News/DetailView?&s=583766", "2014-06-18 00:00"],
    ["[직업소개] 시프", "http://maplestory2.nexon.com/News/DetailView?&s=583768", "2014-06-24 00:00"],
    ["몬스터 배경화면", "http://maplestory2.nexon.com/News/DetailView?&s=583773", "2014-07-08 00:00"],
    ["SUMMER VACATION 배경화면", "http://maplestory2.nexon.com/News/DetailView?&s=583779", "2014-07-29 00:00"],
    ["즐겁고 풍성한 추석!", "http://maplestory2.nexon.com/News/DetailView?&s=583790", "2014-09-04 00:00"],
    ["또 만나요~", "http://maplestory2.nexon.com/News/DetailView?&s=583806", "2014-09-26 00:00"],
    ["HAPPY HALLOWEEN", "http://maplestory2.nexon.com/News/DetailView?&s=583812", "2014-10-31 00:00"],
    ["수험생 여러분 힘내세요!!", "http://maplestory2.nexon.com/News/DetailView?&s=583813", "2014-11-06 00:00"],
    ["즐거운 크리스마스 ♡", "http://maplestory2.nexon.com/News/DetailView?&s=583830", "2014-12-24 00:00"],
    ["즐거운 설날 보내세요~", "http://maplestory2.nexon.com/News/DetailView?&s=583865", "2015-02-19 00:00"],
    ["새해에도 행福 하세요^^", "http://maplestory2.nexon.com/News/DetailView?&s=583832", "2015-01-01 00:00"],
    ["인소야닷컴 11주년 축전", "http://maplestory2.nexon.com/News/DetailView?&s=583858", "2015-02-09 00:00"],
    ["오늘은 발렌타인데이", "http://maplestory2.nexon.com/News/DetailView?&s=583863", "2015-02-14 00:00"],
    ["즐거운 설날 보내세요~", "http://maplestory2.nexon.com/News/DetailView?&s=583865", "2015-02-19 00:00"],
    ["디스이즈게임 10주년 축전", "http://maplestory2.nexon.com/News/DetailView?&s=583873", "2015-03-13 00:00"],
    ["화이트데이네요+_+", "http://maplestory2.nexon.com/News/DetailView?&s=583874", "2015-03-14 00:00"],
    ["돼냥이 모자 작업 START!", "http://maplestory2.nexon.com/News/DetailView?&s=583881", "2015-04-02 00:00"],
    ["게임메카 15주년 축전", "http://maplestory2.nexon.com/News/DetailView?&s=583924", "2015-05-12 00:00"],
    ["눈호강하세요~", "http://maplestory2.nexon.com/News/DetailView?&s=583929", "2015-05-20 00:00"],
    [">ㅁ< 시원해!!!!", "http://maplestory2.nexon.com/News/DetailView?&s=583994", "2015-08-30 00:00"],
    ["풍성한 한가위 되세요^^", "http://maplestory2.nexon.com/News/DetailView?&s=584039", "2015-09-25 00:00"],
    ["LET'S GO!", "http://maplestory2.nexon.com/News/DetailView?&s=584041", "2015-10-05 00:00"],
    ["메이플스토리2 100일!", "http://maplestory2.nexon.com/News/DetailView?&s=584049", "2015-10-14 00:00"],
    ["HAPPY HALLOWEEN", "http://maplestory2.nexon.com/News/DetailView?&s=584058", "2015-10-30 00:00"],
    ["수줍은 에레브와 활기찬 벨라가 빼빼로를 준비했어요~", "http://maplestory2.nexon.com/News/DetailView?&s=584060", "2015-11-10 00:00"],
    ["수능대박기원!! 화이팅!!", "http://maplestory2.nexon.com/News/DetailView?&s=584061", "2015-11-11 00:00"],
    ["Merry Christmas!", "http://maplestory2.nexon.com/News/DetailView?&s=584064", "2015-12-22 00:00"],
    ["고기를 잡으러 메이플스토리2로 갈까나~ ♪♩", "http://maplestory2.nexon.com/News/DetailView?&s=584065", "2015-12-29 00:00"],
    ["메이플 월드에 선율이 흐른다~ 샤라랄라~♪♩", "http://maplestory2.nexon.com/News/DetailView?&s=584068", "2015-12-30 00:00"],
    ["새해 복 많이 받으세요~*", "http://maplestory2.nexon.com/News/DetailView?&s=584069", "2015-12-31 00:00"],
    ["[일러스트] 귀여워~귀여워~", "http://maplestory2.nexon.com/News/DetailView?&s=584070", "2016-01-12 00:00"],
    ["바르칸트의 멋진 일러스트를 공유 드립니다!", "http://maplestory2.nexon.com/News/DetailView?&s=584072", "2016-01-15 00:00"],
    ["천사 vs 악마 : 당신의 취향은?", "http://maplestory2.nexon.com/News/DetailView?&s=584074", "2016-01-27 00:00"],
    ["까치~까치~ 설날은 모두 사이좋게!", "http://maplestory2.nexon.com/News/DetailView?&s=584076", "2016-02-04 00:00"],
    ["[당첨자발표] 발렌타인 초콜릿, 누구에게 받을까?", "http://maplestory2.nexon.com/News/DetailView?&s=584077", "2016-02-05 00:00"],
    ["Happy Valentine's Day!", "http://maplestory2.nexon.com/News/DetailView?&s=584078", "2016-02-12 00:00"],
    ["[일러스트] Sweet White Day!", "http://maplestory2.nexon.com/News/DetailView?&s=584081", "2016-03-14 00:00"],
    ["[일러스트] 두근두근! 새학기 기념 일러스트!", "http://maplestory2.nexon.com/News/DetailView?&s=584082", "2016-03-18 00:00"],
    ["[일러스트] HAVE FUN! 어린이날~", "http://maplestory2.nexon.com/News/DetailView?&s=584088", "2016-05-04 00:00"],
    ["(일러스트) 빰빠라밤! 1주년 미리 기념해요~ :)", "http://maplestory2.nexon.com/News/DetailView?&s=587552", "2016-06-16 11:00"],
    ["4차 시네마틱 영상 일러스트 공개! ver.1", "http://maplestory2.nexon.com/News/DetailView?&s=588811", "2016-06-22 19:00"],
    ["4차 시네마틱 영상 일러스트 공개! ver.2", "http://maplestory2.nexon.com/News/DetailView?&s=589139", "2016-06-24 18:00"],
    ["메이플스토리2 1주년 X 바람의나라 20주년 콜라보", "http://maplestory2.nexon.com/News/DetailView?&s=590179", "2016-06-30 11:00"],
    ["[일러스트] 하태핫태! 시~원한 바다를 느껴봐~!", "http://maplestory2.nexon.com/News/DetailView?&s=599064", "2016-08-01 18:15"],
    ["[일러스트]모두가 함께라서 행복한 한가위~!", "http://maplestory2.nexon.com/News/DetailView?&s=605962", "2016-09-08 17:00"],
    ["[일러스트] 벨라와 에레브...", "http://maplestory2.nexon.com/News/DetailView?&s=609546", "2016-10-05 11:10"],
    ["[일러스트] 단풍 축제가 시작되었습니다~!", "http://maplestory2.nexon.com/News/DetailView?&s=610622", "2016-10-12 18:51"],
    ["[일러스트] HAPPY HALLOWEEN", "http://maplestory2.nexon.com/News/DetailView?&s=612115", "2016-10-27 10:00"],
    ["[일러스트] 이제 우리 사이에 썸은! 빼!빼!", "http://maplestory2.nexon.com/News/DetailView?&s=612910", "2016-11-04 15:00"],
    ["[일러스트] 수능 대박 기원!!!! 화이팅!!", "http://maplestory2.nexon.com/News/DetailView?&s=613935", "2016-11-14 10:00"],
    ["[일러스트] 성큼 다가온 크리스마스~!", "http://maplestory2.nexon.com/News/DetailView?&s=616681", "2016-12-19 17:00"],
    ["2017년, HAPPY NEW YEAR!", "http://maplestory2.nexon.com/News/DetailView?&s=616749", "2017-12-29 11:00"],
    ["[일러스트]새해 복 많이 받으세요~!", "http://maplestory2.nexon.com/News/DetailView?&s=619293", "2017-01-24 16:00"],
    ["[일러스트] 해피 발렌타인데이♡", "http://maplestory2.nexon.com/News/DetailView?&s=619369", "2017-02-10 12:00"],
    ["[새학기 일러스트] 전학생 마드리아 VS 미카", "http://maplestory2.nexon.com/News/DetailView?&s=619459", "2017-02-24 17:00"],
    ["[화이트데이 일러스트] 이걸 전해야...하는데...", "http://maplestory2.nexon.com/News/DetailView?&s=619587", "2017-03-09 11:00"],
    ["[일러스트] 혁이! 마드리아! 오르데! 의문의 검사!", "http://maplestory2.nexon.com/News/DetailView?&s=619798", "2017-04-25 17:30"],
    ["2017 NDC 출품작 감상해요~!", "http://maplestory2.nexon.com/News/DetailView?&s=619805", "2017-04-27 11:19"],
    ["[일러스트] 5월은 메린이의 날!", "http://maplestory2.nexon.com/News/DetailView?&s=619806", "2017-04-28 11:00"],
    ["[일러스트] 딴~딴따라~딴~딴따라~♪", "http://maplestory2.nexon.com/News/DetailView?&s=619893", "2017-05-31 13:30"],
    ["[일러스트] 축★7/7 메이플스토리2 2주년★", "http://maplestory2.nexon.com/News/DetailView?&s=619947", "2017-06-29 12:00"],
    ["[일러스트]민트&바닐라와 함께하는 핫썸머!", "http://maplestory2.nexon.com/News/DetailView?&s=619955", "2017-06-30 10:45"],
    ["[일러스트] 무더운 여름! 메이플 월드에서 함께해요~", "http://maplestory2.nexon.com/News/DetailView?&s=619993", "2017-07-28 18:23"],
    ["[일러스트] 보름달 같이 풍성한~ 한가위 보내세요!", "http://maplestory2.nexon.com/News/DetailView?&s=620062", "2017-09-28 10:52"],
    ["[일러스트] HAPPY HALLOWEEN", "http://maplestory2.nexon.com/News/DetailView?&s=620078", "2017-10-26 10:42"],
    ["[일러스트] MERRY CHRISTMAS ~^0^~", "http://maplestory2.nexon.com/News/DetailView?&s=620109", "2017-12-21 11:09"],
    ["[일러스트]새해 복 많이 받으세요~!", "http://maplestory2.nexon.com/News/DetailView?&s=620118", "2017-12-29 13:57"],
    ["[일러스트] 새해 복 많이 받으세요!", "http://maplestory2.nexon.com/News/DetailView?&s=620122", "2018-01-25 12:10"],
    ["[일러스트] 발렌타인데이니까, 자! 초콜릿!", "http://maplestory2.nexon.com/News/DetailView?&s=620136", "2018-02-09 15:15"],
    ["[일러스트] 누구와 함께 화이트데이를 보내실래요?", "http://maplestory2.nexon.com/News/DetailView?&s=620150", "2018-03-08 17:38"],
    ["[일러스트] 메이플 월드에도 봄이 찾아왔어요~", "http://maplestory2.nexon.com/News/DetailView?&s=620163", "2018-04-05 11:48"],
    ["[일러스트] 5월은 푸르구나~ 우리들은 자~란다!", "http://maplestory2.nexon.com/News/DetailView?&s=620173", "2018-04-27 16:00"],
    ["[일러스트] 썸머~썸머~썸머!!", "http://maplestory2.nexon.com/News/DetailView?&s=620185", "2018-05-24 10:14"],
    ["[일러스트] 메투 3주년을 축하해주세요~^0^~", "http://maplestory2.nexon.com/News/DetailView?&s=620207", "2018-07-06 14:50"],
    ["[일러스트] 카우보이가 이렇게 귀여워도 되나?", "http://maplestory2.nexon.com/News/DetailView?&s=620221", "2018-07-27 10:25"],
    ["[일러스트] 아름다운 재능에 축복을!! ", "http://maplestory2.nexon.com/News/DetailView?&s=620246", "2018-09-21 11:00"],
    ["[일러스트] Happy Halloween ≫◎≪", "http://maplestory2.nexon.com/News/DetailView?&s=620256", "2018-10-25 18:28"],
    ["[일러스트] 메투와 메리 크리스마스~", "http://maplestory2.nexon.com/News/DetailView?&s=620306", "2018-12-21 11:48"],
    ["[일러스트] HAPPY NEW YEAR!", "http://maplestory2.nexon.com/News/DetailView?&s=620310", "2018-12-31 14:25"],
    ["[일러스트] 새해 복 많이 받으세요~•ܫ•", "http://maplestory2.nexon.com/News/DetailView?&s=620327", "2019-02-01 11:10"],
    ["[일러스트] HAPPY VALENTINE DAY", "http://maplestory2.nexon.com/News/DetailView?&s=620331", "2019-02-14 16:45"],
    ["[일러스트] SWEET WHITE DAY!", "http://maplestory2.nexon.com/News/DetailView?&s=620347", "2019-03-14 18:30"],
    ["[이슈] 2019 NDC 아트 전시회 현장 스케치", "http://maplestory2.nexon.com/News/DetailView?&s=620360", "2019-04-29 11:20"],
    ["[일러스트] 메투 4주년, 해피 메콩 데이!", "http://maplestory2.nexon.com/News/DetailView?&s=620373", "2019-07-05 11:00"],
    ["[일러스트] 2019년 추석에도 밝은 보름달처럼 행복하세요!✿", "http://maplestory2.nexon.com/News/DetailView?&s=620397", "2019-09-05 15:30"],
    ["[일러스트] HAPPY HALLOWEEN", "http://maplestory2.nexon.com/News/DetailView?&s=620407", "2019-10-31 15:47"],
    ["[일러스트] 수능 대박 기원!!!!", "http://maplestory2.nexon.com/News/DetailView?&s=620408", "2019-11-14 11:00"],
    ["[일러스트] 메리 크리스마스 ♥", "http://maplestory2.nexon.com/News/DetailView?&s=620420", "2019-12-24 16:52"],
    ["[일러스트] HAPPY NEW YEAR!!", "http://maplestory2.nexon.com/News/DetailView?&s=620428", "2020-01-23 10:44"],
    ["[일러스트] HAPPY VALENTINE DAY!", "http://maplestory2.nexon.com/News/DetailView?&s=620446", "2020-02-14 17:00"],
    ["[일러스트] 새학년, 새학기, 새출발", "http://maplestory2.nexon.com/News/DetailView?&s=620450", "2020-02-20 17:52"],
    ["[일러스트] 한 그루, 푸르름의 시작", "http://maplestory2.nexon.com/News/DetailView?&s=620459", "2020-04-02 11:40"]
]
ms2_illusts=new DictData("ms2_illust",ms2_illust_records);
window.onload=function(e){
    ms2_illusts.representData();
}