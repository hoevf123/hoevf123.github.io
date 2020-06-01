
class DictData {
    constructor(typename, tuple_tag_format, tuple_datas, represent_tag_target) {
        this.typename = typename;
        this.tuple_tag_format = tuple_tag_format;
        this.datas = tuple_datas;
        this.represent_tag_target = represent_tag_target;
    }
    clearTags(represent_tag_target){
        if(represent_tag_target==undefined){
            represent_tag_target=this.represent_tag_target;
        }
        let tags = document.getElementsByClassName(represent_tag_target);
        Array.prototype.forEach.call(tags, e => e.innerHTML="");
    }
    representData(represent_tag_target) {
        if(represent_tag_target==undefined){
            represent_tag_target=this.represent_tag_target;
        }
        if (represent_tag_target!==undefined) {
            // tag creation method definition
            function CreateTag(tag_name, tag_classname, innerText) {
                // init value
                tag_name = tag_name || "div";
                tag_classname = tag_classname || "";
                innerText = innerText || "";

                let tag = document.createElement(new String(tag_name));
                tag.className = new String(tag_classname);
                innerText = new String(innerText);
                if(tag_name=="audio"){
                    tag.controls="controls";
                    tag.src=innerText;
                    // let source_tag = document.createElement("source");
                    // source_tag.src=innerText;
                    // if(String.prototype.endsWith.call(innerText,".mp3"))source_tag.type="audio/mpeg";
                    // else if(String.prototype.endsWith.call(innerText,".ogg"))source_tag.type="audio/ogg";
                    // tag.appendChild(source_tag);
                    tag.innerText=innerText;
                }
                else if(tag_name=="a"){
                    innerText = innerText.trim();
                    if(innerText.startsWith("http")){
                        tag.innerText=innerText;
                        tag.href=innerText;
                    }
                    else {
                        let local_blocked_file_type=["mp3"];
                        while(String.prototype.startsWith.call(innerText,"./")){
                            innerText=innerText.substring(2); //remove ./ at the header one
                        }
                        if((innerText == "") || local_blocked_file_type.reduce((a,c)=> a || innerText.endsWith("."+ new String(c)),false)){
                            //do nothing if blocked file type detected
                            return undefined;
                        }
                        else{
                            tag.innerText = "[" + String.prototype.split.call(innerText,"/").reverse()[0] + "]";
                            tag.href=innerText;
                            tag.style.textOverflow="ellipsis";
                        }
                    }
                }
                else if(tag_name=="img"){
                    tag.src=innerText;
                    tag.alt=innerText;
                }
                else if (innerText.trim().startsWith("http")) {
                    let link_tag = document.createElement("a");
                    link_tag.href = innerText.trim();
                    link_tag.innerText = innerText;
                    tag.appendChild(link_tag);
                }
                
                else {
                    tag.innerText = innerText;
                }

                return tag;
            }
            function flatten_array(...target_array){
                const reducer = function(a,c){
                    if(c instanceof Array) return a.concat(c.reduce(reducer,[]));
                    else return a.concat(c);
                };
                return Array.prototype.reduce.call(target_array,reducer, []);
            }


            let tag_root = CreateTag("div","dict-result " + this.typename);
            for (var idx_datas in this.datas) {
                let target_data = this.datas[idx_datas];    //[["title","music-name", "..."] <-- this ];
                let tag_cell_root = CreateTag("div", "dict-data", "");
                tag_cell_root.addEventListener("click",(function(){
                    //this : tag_cell_root, it change states of dict-data selected or not.
                    let str_selected_className = "selected";
                        if(this.classList.contains(str_selected_className))this.classList.remove(str_selected_className);
                        else this.classList.add(str_selected_className);
                    }).bind(tag_cell_root)
                );
                let tag_datas = this.tuple_tag_format.reduce((a, c, i) => {
                    // a = a list of created datas
                    // c = line dataset style definition object one. [["p", "foo-class"]<-- This ]
                    // i = line index of dataset, pos of target_cell
                    let target_cell = target_data[i]; // ["p" <-- This , "foo-class"]
                    let tag_style = c[0] || "p";
                    let tag_classname = c[1] || "";
                    //console.log(target_cell);
                    if(target_cell instanceof Array){
                        // target_cell = [["hello", ["world"]] <-- this(all of the list shell) , "blah-blah", ...] <-- not here!;
                        //console.log(target_cell);
                        let group_div_tag = CreateTag("div", tag_classname,"");
                        target_cell = flatten_array(target_cell).map((e)=>{
                            let _inside_tag = CreateTag(tag_style,tag_classname,e);
                            if(_inside_tag instanceof HTMLElement){
                                group_div_tag.appendChild(_inside_tag);
                                return _inside_tag;
                            }
                        });
                        //console.log("Merged : ", target_cell);
                        if(group_div_tag.childNodes.length <= 0){
                            // remove group tag if there's no included data in the group tag.
                            group_div_tag.remove();
                            group_div_tag=undefined; //set undefined value
                        }
                        target_cell = group_div_tag;
                    }
                    else if(target_cell == undefined);
                    else target_cell = CreateTag(tag_style, tag_classname, target_cell);
                    if(target_cell instanceof HTMLElement)
                        return a.concat(target_cell);
                    else
                        return a;
                },[]);
                // pack cell's data <div class="dict-data"> blah blah <----- this contents </div>
                tag_datas.forEach(e => { tag_cell_root.appendChild(e) });

                // and contains tag_cell_root to master tag root.
                tag_root.appendChild(tag_cell_root);
            }
            // represent combined tag datas to represent area(s).
            let tags = document.getElementsByClassName(represent_tag_target);
            Array.prototype.forEach.call(tags, e => e.appendChild(document.createElement("li").appendChild(tag_root)));
        }
    }
}

class DictCollection{
    constructor(...dict_datas){
        this.dictdatas=[];
        this.focusedDictdata=null;
        Array.prototype.forEach.call(dict_datas,(function(e){
            if(e instanceof DictData){
                this.dictdatas.push(e);
            }
            else if(e instanceof String){
                let tmp_dictdata = new DictData(e,[],[]);
                this.dictdatas.push(tmp_dictdata);
            }
            else if(e instanceof Array){
                let tmp_dictdata = new DictData("undefined",[],e);
                this.dictdatas.push(tmp_dictdata);
            }
        }).bind(this));
        if(this.dictdatas.length > 0 )
            this.focusedDictdata=this.dictdatas[0];
    }
    clearRepresentData(){
        if((this.focusedDictdata instanceof DictData)){
            let tmp_tags = document.getElementsByClassName(this.focusedDictdata.represent_tag_target)
            Array.prototype.forEach.call(tmp_tags,(e)=>{
                while(e.hasChildNodes()){
                    e.removeChild(e.firstChild);
                }
            }); //remove all tags in the target tags.
        }
        
    }
    representDictDataHeaders(){
        if((this.focusedDictdata instanceof DictData)){
            let dictdata_names = Array.prototype.map.call(this.dictdatas,(function(e){return e.typename;}).bind(this));
            let tag_ul = document.createElement("ul");
            tag_ul.className="dictdata-names";
            dictdata_names.forEach(function(e,i){
                let tmp_li = document.createElement("li");
                let tmp_a = document.createElement("a");
                tmp_a.innerText=new String(e);
                let tmp_dictdata = this.dictdatas[i];
                tmp_a.addEventListener("click",(function(){
                    this.focusedDictdata=tmp_dictdata;
                    this.clearRepresentData();
                    this.representData();
                }).bind(this));
                tmp_li.appendChild(tmp_a);
                tag_ul.appendChild(tmp_li);
            }.bind(this));
            
            let tmp_tags = document.getElementsByClassName(this.focusedDictdata.represent_tag_target);
            Array.prototype.forEach.call(tmp_tags,(function(e){e.appendChild(tag_ul);}).bind(this)); //insert all list of the dictdata's header;
        }
    }
    representData(){
        this.clearRepresentData();
        this.representDictDataHeaders();
        this.focusedDictdata.representData();
    }
}
let ms2_wallpaper_tag_formats = [
    ['p', 'title'],
    ['p', 'link-addr'],
    ['p', 'link-date'],
    ['img', 'thumb-img'],
    ['a', 'link-img'],
    ['p', 'hash-tag']
];
let ms2_wallpaper_records = [
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
    ["최초의 전직","http://maplestory2.nexon.com/events/20180705/FirstCareersUp","2018-07-05 10:00"],
    ["[일러스트] 메투 3주년을 축하해주세요~^0^~", "http://maplestory2.nexon.com/News/DetailView?&s=620207", "2018-07-06 14:50"],
    ["[일러스트] 카우보이가 이렇게 귀여워도 되나?", "http://maplestory2.nexon.com/News/DetailView?&s=620221", "2018-07-27 10:25"],
    ["[일러스트] 아름다운 재능에 축복을!! ", "http://maplestory2.nexon.com/News/DetailView?&s=620246", "2018-09-21 11:00", "./Maplestory2/wallpaper/contents_180921_olympusms22.jpg",["./Maplestory2/wallpaper/wallpaper_180921_olympusms22_iphone6_01.jpg","./Maplestory2/wallpaper/wallpaper_180921_olympusms22_iphone6_02.jpg","./Maplestory2/wallpaper/wallpaper_180921_olympusms22_iphone6_03.jpg","./Maplestory2/wallpaper/wallpaper_180921_olympusms22_galaxy_01.jpg","./Maplestory2/wallpaper/wallpaper_180921_olympusms22_galaxy_02.jpg","./Maplestory2/wallpaper/wallpaper_180921_olympusms22_galaxy_03.jpg","./Maplestory2/wallpaper/wallpaper_180921_olympusms22_43.jpg","./Maplestory2/wallpaper/wallpaper_180921_olympusms22_169.jpg"], ["올림포스", "이세계의 재능에 축복을","오르페우스", "그리스 로마 신화", "백우", "스킨"]],
    ["[일러스트] Happy Halloween ≫◎≪", "http://maplestory2.nexon.com/News/DetailView?&s=620256", "2018-10-25 18:28", "./Maplestory2/wallpaper/contents_181025_halloweenbox57.jpg",["./Maplestory2/wallpaper/wallpaper_181025_halloweenbox57_iphone6.jpg","./Maplestory2/wallpaper/wallpaper_181025_halloweenbox57_galaxy.jpg","./Maplestory2/wallpaper/wallpaper_181025_halloweenbox57_43.jpg","./Maplestory2/wallpaper/wallpaper_181025_halloweenbox57_169.jpg"], ["할로윈", "펌킨", "호박", "사탕", "몽환"]],
    ["[일러스트] 메투와 메리 크리스마스~", "http://maplestory2.nexon.com/News/DetailView?&s=620306", "2018-12-21 11:48", "./Maplestory2/wallpaper/contents_181220_ms2christmas777.jpg",["./Maplestory2/wallpaper/wallpaper_181220_ms2christmas777_iphone6.jpg","./Maplestory2/wallpaper/wallpaper_181220_ms2christmas777_galaxy.jpg","./Maplestory2/wallpaper/wallpaper_181220_ms2christmas777_43.jpg","./Maplestory2/wallpaper/wallpaper_181220_ms2christmas777_169.jpg"], ["크리스마스", "선물", "뿌뿌", "크리스마스 트리", "CHRISTMAS777"]],
    ["[일러스트] HAPPY NEW YEAR!", "http://maplestory2.nexon.com/News/DetailView?&s=620310", "2018-12-31 14:25","./Maplestory2/wallpaper/4764905167076259046.png",["./Maplestory2/wallpaper/wallpaper_190102_new_iphone6.jpg","./Maplestory2/wallpaper/wallpaper_190102_new_galaxy.jpg","./Maplestory2/wallpaper/wallpaper_190102_new_43.jpg","./Maplestory2/wallpaper/wallpaper_190102_new_169.jpg"],["예티", "2019", "새해", "파티"]],
    ["[일러스트] 새해 복 많이 받으세요~•ܫ•", "http://maplestory2.nexon.com/News/DetailView?&s=620327", "2019-02-01 11:10","./Maplestory2/wallpaper/contents_190201_new.jpg",["./Maplestory2/wallpaper/wallpaper_190201_new_iphone6.jpg","./Maplestory2/wallpaper/wallpaper_190201_new_galaxy.jpg","./Maplestory2/wallpaper/wallpaper_190201_new_43.jpg","./Maplestory2/wallpaper/wallpaper_190201_new_169.jpg"],["설날","클라디아", "포잉", "명절", "새해 복 많이 받으세요"]],
    ["[일러스트] HAPPY VALENTINE DAY", "http://maplestory2.nexon.com/News/DetailView?&s=620331", "2019-02-14 16:45","./Maplestory2/wallpaper/contents_190214_new.jpg",["./Maplestory2/wallpaper/wallpaper_190214_new_iphone6.jpg","./Maplestory2/wallpaper/wallpaper_190214_new_galaxy.jpg","./Maplestory2/wallpaper/wallpaper_190214_new_43.jpg","./Maplestory2/wallpaper/wallpaper_190214_new_169.jpg"],["발렌타인데이", "더키", "하트", "초콜릿", "쏠트 초콜릿", "컵케이크", "단짠"]],
    ["[일러스트] SWEET WHITE DAY!", "http://maplestory2.nexon.com/News/DetailView?&s=620347", "2019-03-14 18:30","./Maplestory2/wallpaper/5269254303243042847.jpg",["./Maplestory2/wallpaper/wallpaper_190314_new_iphone6.jpg","./Maplestory2/wallpaper/wallpaper_190314_new_galaxy.jpg","./Maplestory2/wallpaper/wallpaper_190314_new_43.jpg","./Maplestory2/wallpaper/wallpaper_190314_new_169.jpg"], ["화이트데이", "사탕", "캔디", "더키볼"]],
    ["[이슈] 2019 NDC 아트 전시회 현장 스케치", "http://maplestory2.nexon.com/News/DetailView?&s=620360", "2019-04-29 11:20", "./Maplestory2/wallpaper/5125140360707711402.jpg",[],["NDC", "NDC2019", "실버스톤 브릿지"]],
    ["[일러스트] 메투 4주년, 해피 메콩 데이!", "http://maplestory2.nexon.com/News/DetailView?&s=620373", "2019-07-05 11:00","./Maplestory2/wallpaper/contents_190705_new_EF33E5092DAB59FE.jpg",[
        "./Maplestory2/wallpaper/wallpaper_190705_new_iphone6_01_56785A91208283DA.jpg",
        "./Maplestory2/wallpaper/wallpaper_190705_new_iphone6_02_B198859B1880F63A.jpg",
        "./Maplestory2/wallpaper/wallpaper_190705_new_iphone6_03_AFF380E4CFFFBFB8.jpg",
        "./Maplestory2/wallpaper/wallpaper_190705_new_iphone6_04_CB155C1293D0EF45.jpg",
        "./Maplestory2/wallpaper/wallpaper_190704_new_galaxy_01_077CBC729CAF2AF8.jpg",
        "./Maplestory2/wallpaper/wallpaper_190704_new_galaxy_02_7549F9923AA61CA8.jpg",
        "./Maplestory2/wallpaper/wallpaper_190704_new_galaxy_03_56737727F0DF817E.jpg",
        "./Maplestory2/wallpaper/wallpaper_190704_new_galaxy_04_AA9E0669163C3EE1.jpg",
        "./Maplestory2/wallpaper/wallpaper_190705_new_43_4AD2707A8206F16F.jpg",
        "./Maplestory2/wallpaper/wallpaper_190705_new_169_C930CE71CFB0E72E.jpg"
    ],["메콩데이", "학교", "4주년", "나이트", "프리스트", "위자드","스트라이커", "룬블레이더","헤비거너", "버서커", "레인저","시프", "어쌔신", "주황버섯", "슬라임", "더키", "축제"]],
    ["[일러스트] 2019년 추석에도 밝은 보름달처럼 행복하세요!✿", "http://maplestory2.nexon.com/News/DetailView?&s=620397", "2019-09-05 15:30", "./Maplestory2/wallpaper/contents_190905_new_CFB70DACE946757D.jpg",["./Maplestory2/wallpaper/wallpaper_190905_new_iphone6_2F26706F0B754BF7.jpg","./Maplestory2/wallpaper/wallpaper_190905_new_162_9B30C939B864AE03.jpg","./Maplestory2/wallpaper/wallpaper_190905_new_169_282AB52C77400AAC.jpg","./Maplestory2/wallpaper/wallpaper_190905_new_169_282AB52C77400AAC.jpg"],["추석","보름달","제시카","한복","크리티아스"]],
    ["[일러스트] HAPPY HALLOWEEN", "http://maplestory2.nexon.com/News/DetailView?&s=620407", "2019-10-31 15:47", "./Maplestory2/wallpaper/contents_191031_new.jpg",["./Maplestory2/wallpaper/wallpaper_191031_new_iphone6.jpg","./Maplestory2/wallpaper/wallpaper_191031_new_galaxy.jpg","./Maplestory2/wallpaper/wallpaper_191031_new_1620.jpg","./Maplestory2/wallpaper/wallpaper_191031_new_1920.jpg"],["할로윈","할로윈데이","Trick or Treat","호박","마녀","인스타그램","셀카"]],
    ["[일러스트] 수능 대박 기원!!!!", "http://maplestory2.nexon.com/News/DetailView?&s=620408", "2019-11-14 11:00" ,"./Maplestory2/wallpaper/untitled.png",undefined,["수능"]], //not exist wallpapers for ios, galaxy, pc.
    ["[일러스트] 메리 크리스마스 ♥", "http://maplestory2.nexon.com/News/DetailView?&s=620420", "2019-12-24 16:52", "./Maplestory2/wallpaper/contents_191224_new.jpg",["./Maplestory2/wallpaper/wallpaper_191224_new_iphone6.jpg","./Maplestory2/wallpaper/wallpaper_191224_new_galaxy.jpg","./Maplestory2/wallpaper/wallpaper_191224_new_1620.jpg","./Maplestory2/wallpaper/wallpaper_191224_new_1920.jpg"],["크리스마트","설눈이"]],
    ["[일러스트] HAPPY NEW YEAR!!", "http://maplestory2.nexon.com/News/DetailView?&s=620428", "2020-01-23 10:44", "./Maplestory2/wallpaper/contents_200123_new.jpg",["./Maplestory2/wallpaper/wallpaper_200123_new_iphone6.jpg","./Maplestory2/wallpaper/wallpaper_200123_new_galaxy.jpg","./Maplestory2/wallpaper/wallpaper_200123_new_1620.jpg","./Maplestory2/wallpaper/wallpaper_200123_new_1920.jpg"],["새해", "경자년", "쥐띠"]],
    ["[일러스트] HAPPY VALENTINE DAY!", "http://maplestory2.nexon.com/News/DetailView?&s=620446", "2020-02-14 17:00", "./Maplestory2/wallpaper/contents_0214_new.jpg",["./Maplestory2/wallpaper/wallpaper_0214_new_iphone6.jpg","./Maplestory2/wallpaper/wallpaper_0214_new_galaxy.jpg","./Maplestory2/wallpaper/wallpaper_0214_new_1620.jpg","./Maplestory2/wallpaper/wallpaper_0214_new_1920.jpg"],["발렌타인데이", "하트", "케이크" ,"초콜릿", "더키볼"]],
    ["[일러스트] 새학년, 새학기, 새출발", "http://maplestory2.nexon.com/News/DetailView?&s=620450", "2020-02-20 17:52", "./Maplestory2/wallpaper/contents_0220_new.jpg",["./Maplestory2/wallpaper/wallpaper_0220_new_iphone6.jpg","./Maplestory2/wallpaper/wallpaper_0220_new_galaxy.jpg","./Maplestory2/wallpaper/wallpaper_0220_new_1620.jpg","./Maplestory2/wallpaper/wallpaper_0220_new_1920.jpg"],["새학기", "학교", "콘대르"]],
    ["[일러스트] SWEET WHITE DAY!", "http://maplestory2.nexon.com/News/DetailView?&s=620450", "2020-03-17 10:20", "./Maplestory2/wallpaper/contents_200317_new.jpg",["./Maplestory2/wallpaper/wallpaper_200317_new_iphone6.jpg","./Maplestory2/wallpaper/wallpaper_200317_new_galaxy.jpg","./Maplestory2/wallpaper/wallpaper_200317_new_1620.jpg","./Maplestory2/wallpaper/wallpaper_200317_new_1920.jpg"],["화이트데이", "소울바인더", "남소바"]],
    ["[일러스트] 한 그루, 푸르름의 시작", "http://maplestory2.nexon.com/News/DetailView?&s=620455", "2020-04-02 11:40", "./Maplestory2/wallpaper/contents_200402_new.jpg",["./Maplestory2/wallpaper/wallpaper_200402_new_iphone6.jpg","./Maplestory2/wallpaper/wallpaper_200402_new_galaxy.jpg","./Maplestory2/wallpaper/wallpaper_200402_new_1620.jpg","./Maplestory2/wallpaper/wallpaper_200402_new_1920.jpg"],["식목일", "더키볼"]],
    ["[일러스트] 5월 5일은 메린이의 날!", "http://maplestory2.nexon.com/News/DetailView?&s=620468", "2020-04-29 10:00", "./Maplestory2/wallpaper/contents_200430_new.jpg",["./Maplestory2/wallpaper/wallpaper_200430_new_iphone6.jpg","./Maplestory2/wallpaper/wallpaper_200430_new_galaxy.jpg","./Maplestory2/wallpaper/wallpaper_200430_new_1620.jpg","./Maplestory2/wallpaper/wallpaper_200430_new_1920.jpg"],["어린이날", "우르자", "곰돌이", "메린이", "더키볼"]]
];

let ms2_bgm_records_format = [
    ["p", "title"],
    ["p", "music_play_location"],
    ["p", "ms2_file_name"],
    ["a", "bgm_src"]
];

let ms2_bgm_records = [
    ['', '', 'BGM_AbandonedForest_Intro_01.mp3', './Maplestory2/BGM/BGM_AbandonedForest_Intro_01.mp3'],
    ['', '', 'BGM_AbandonedForest_Loop_01.mp3', './Maplestory2/BGM/BGM_AbandonedForest_Loop_01.mp3'],
    ['', '', 'BGM_AbandonedForest_Loop_02.mp3', './Maplestory2/BGM/BGM_AbandonedForest_Loop_02.mp3'],
    ['', '티아만', 'BGM_Acropolis_01.mp3', './Maplestory2/BGM/BGM_Acropolis_01.mp3'],
    ['', '', 'BGM_AfterSorrow_01.mp3', './Maplestory2/BGM/BGM_AfterSorrow_01.mp3'],
    ['Alkeina Theme', '바베니, 알케이나 고원', 'BGM_Alkeina_Theme_01.mp3', './Maplestory2/BGM/BGM_Alkeina_Theme_01.mp3'],
    ['Grace of Two', '결혼식장 - 트라이아 아모르앙 웨딩홀', 'BGM_AmorangWeddingHall_01.mp3', './Maplestory2/BGM/BGM_AmorangWeddingHall_01.mp3'],
    ['', '트라이아 - 아모르앙 웨딩홀', 'BGM_AmorangWeddingHall_02.mp3', './Maplestory2/BGM/BGM_AmorangWeddingHall_02.mp3'],
    ['', '트라이아 - 아모르앙 웨딩홀', 'BGM_AmorangWeddingHall_03.mp3', './Maplestory2/BGM/BGM_AmorangWeddingHall_03.mp3'],
    ['', '크리티아스 톱니바퀴 미니게임', 'BGM_ArcaneJourney_01.mp3', './Maplestory2/BGM/BGM_ArcaneJourney_01.mp3'],
    ['', '(던전)숨겨진 격납고', ['BGM_Archeon_Intro_01.mp3','BGM_Archeon_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_Archeon_Intro_01.mp3','./Maplestory2/BGM/BGM_Archeon_Loop_01.mp3']],
    ['', '스카이 포트리스 갑판 - (보스)아머드 체키 전투', 'BGM_ArmoredChecky_Theme_01.mp3', './Maplestory2/BGM/BGM_ArmoredChecky_Theme_01.mp3'],
    ['', '', 'BGM_Assassin_Theme_01.mp3', './Maplestory2/BGM/BGM_Assassin_Theme_01.mp3'],
    ['', '(던전)마드라칸 지하도 수로', ["BGM_Barlog's Desire_Intro.mp3","BGM_Barlog's Desire_Loop.mp3"], ["./Maplestory2/BGM/BGM_Barlog's Desire_Intro.mp3","./Maplestory2/BGM/BGM_Barlog's Desire_Loop.mp3"]],
    ['', '', 'BGM_BattleStage_01.mp3', './Maplestory2/BGM/BGM_BattleStage_01.mp3'],
    ['Afternoon Tea', '뷰티 스트리트', 'BGM_BeautyStreet_01.mp3', ['./Maplestory2/BGM/BGM_BeautyStreet_01.mp3','http://maple2.vod.nexoncdn.co.kr/official/bgm/Afternoon%20Tea.mp3']],
    ['', '', 'BGM_BeautyStreet_Quest_01.mp3', './Maplestory2/BGM/BGM_BeautyStreet_Quest_01.mp3'],
    ['', '', 'BGM_Berserker_Theme_01.mp3', './Maplestory2/BGM/BGM_Berserker_Theme_01.mp3'],
    ['', '', 'BGM_BindCrystal_Theme_01.mp3', './Maplestory2/BGM/BGM_BindCrystal_Theme_01.mp3'],
    ['', '(던전)우당탕 블랙빈 놀이터 - 달려달려 서킷', 'BGM_BlackBeanBoss_01.mp3', './Maplestory2/BGM/BGM_BlackBeanBoss_01.mp3'],
    ['', '(던전)우당탕 블랙빈 놀이터 - 쓱싹쓱싹 아틀리에', 'BGM_BlackBeanBoss_02.mp3', './Maplestory2/BGM/BGM_BlackBeanBoss_02.mp3'],
    ['', '(맵)블랙마켓', 'BGM_BlackMarket_01.mp3', './Maplestory2/BGM/BGM_BlackMarket_01.mp3'],
    ['', '(던전)블랙 오닉스 타워', 'BGM_BlackOynx_01.mp3', './Maplestory2/BGM/BGM_BlackOynx_01.mp3'],
    ['', '', 'BGM_BlackStar_Theme_01.mp3', './Maplestory2/BGM/BGM_BlackStar_Theme_01.mp3'],
    ['', '', 'BGM_BlackStar_Theme_02.mp3', './Maplestory2/BGM/BGM_BlackStar_Theme_02.mp3'],
    ['', '', ['BGM_BlackStar_Trap_Intro_01.mp3','BGM_BlackStar_Trap_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_BlackStar_Trap_Intro_01.mp3','./Maplestory2/BGM/BGM_BlackStar_Trap_Loop_01.mp3']],
    ['', '', ['BGM_Boss_01_Intro.mp3', 'BGM_Boss_01_Loop.mp3'], ['./Maplestory2/BGM/BGM_Boss_01_Intro.mp3','./Maplestory2/BGM/BGM_Boss_01_Loop.mp3']],
    ['', '', ['BGM_Boss_02_intro.mp3','BGM_Boss_02_main.mp3'], ['./Maplestory2/BGM/BGM_Boss_02_intro.mp3','./Maplestory2/BGM/BGM_Boss_02_main.mp3']],
    ['', '', ['BGM_Boss_03_Intro.mp3','BGM_Boss_03_Loop.mp3'], ['./Maplestory2/BGM/BGM_Boss_03_Intro.mp3','./Maplestory2/BGM/BGM_Boss_03_Loop.mp3']],
    ['', '', ['BGM_Boss_04_Intro.mp3','BGM_Boss_04_Loop.mp3'], ['./Maplestory2/BGM/BGM_Boss_04_Intro.mp3','./Maplestory2/BGM/BGM_Boss_04_Loop.mp3']],
    ['', '', ['BGM_Boss_05_Intro.mp3','BGM_Boss_05_Loop.mp3'], ['./Maplestory2/BGM/BGM_Boss_05_Intro.mp3','./Maplestory2/BGM/BGM_Boss_05_Loop.mp3']],
    ['', '(던전)마드라칸 첨탑', ['BGM_Boss_06_Intro.mp3','BGM_Boss_06_Loop.mp3'], ['./Maplestory2/BGM/BGM_Boss_06_Intro.mp3','./Maplestory2/BGM/BGM_Boss_06_Loop.mp3']],
    ['', '(던전)알케이나 델파이온, (던전)에네르 성 쟁탈전', ['BGM_Boss_07_intro_01.mp3','BGM_Boss_07_loop_01.mp3'], ['./Maplestory2/BGM/BGM_Boss_07_intro_01.mp3','./Maplestory2/BGM/BGM_Boss_07_loop_01.mp3']],
    ['', '(던전)투르카의 공중요새', ['BGM_Boss_08_Intro.mp3','BGM_Boss_08_Loop.mp3'], ['./Maplestory2/BGM/BGM_Boss_08_Intro.mp3','./Maplestory2/BGM/BGM_Boss_08_Loop.mp3']],
    ['', '(던전)마드라칸 잠입 선택루트', 'BGM_Boss_Event_Loop_01.mp3', './Maplestory2/BGM/BGM_Boss_Event_Loop_01.mp3'],
    ['', '(던전)퀸크빈 럼블 던전 로비', 'BGM_Colosseum_room_01.mp3', './Maplestory2/BGM/BGM_Colosseum_room_01.mp3'],
    ['', '(던전)퀸크빈 럼블', 'BGM_Colosseum_stadium_01.mp3', './Maplestory2/BGM/BGM_Colosseum_stadium_01.mp3'],
    ['', '(던전 보스)인페르녹 조우', ['BGM_CrimsonBarlogBoss_Intro_01.mp3','BGM_CrimsonBarlogBoss_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_CrimsonBarlogBoss_Intro_01.mp3','./Maplestory2/BGM/BGM_CrimsonBarlogBoss_Loop_01.mp3']],
    ['', '', 'BGM_DarkSide_01.mp3', './Maplestory2/BGM/BGM_DarkSide_01.mp3'],
    ['', '어둠의 뿌리, 다크 스트림', ['BGM_DarkStream_Intro.mp3','BGM_DarkStream_Loop.mp3'], ['./Maplestory2/BGM/BGM_DarkStream_Intro.mp3','./Maplestory2/BGM/BGM_DarkStream_Loop.mp3']],
    ['', '', 'BGM_DarkTears_01.mp3', './Maplestory2/BGM/BGM_DarkTears_01.mp3'],
    ['', '', 'BGM_DarkTower_01.mp3', './Maplestory2/BGM/BGM_DarkTower_01.mp3'],
    ['', '', 'BGM_Dark_Laboratory_Loop_01.mp3', './Maplestory2/BGM/BGM_Dark_Laboratory_Loop_01.mp3'],
    ['', '(미니게임)빛나는 모자 - 설눈이의 꿈', 'BGM_Dream.mp3', './Maplestory2/BGM/BGM_Dream.mp3'],
    ['', '던전 로비', 'BGM_Dungeon_01.mp3', './Maplestory2/BGM/BGM_Dungeon_01.mp3'],
    ['The Love Forest', '결혼식장 - 엘리니아 러브 포레스트', 'BGM_ElliniaLoveForest_01.mp3', './Maplestory2/BGM/BGM_ElliniaLoveForest_01.mp3'],
    ['The Glory Forest', '엘리니아', 'BGM_Ellinia_01.mp3', ['./Maplestory2/BGM/BGM_Ellinia_01.mp3','http://maple2.vod.nexoncdn.co.kr/official/bgm/The%20Glory%20Forest.mp3']],
    ['', '엘리니아 지역 필드', 'BGM_Ellinia_field_01.mp3', './Maplestory2/BGM/BGM_Ellinia_field_01.mp3'],
    ['', '엘리니아 지역 필드', 'BGM_Ellinia_field_02.mp3', './Maplestory2/BGM/BGM_Ellinia_field_02.mp3'],
    ['', '에레브의 침실', "BGM_Ereb's_Bedchamber_01.mp3", "./Maplestory2/BGM/BGM_Ereb's_Bedchamber_01.mp3"],
    ['', '시공의 균열, 시공의 균열이 생긴 에레브의 침실', "BGM_Ereb's_Dream_01.mp3", "./Maplestory2/BGM/BGM_Ereb's_Dream_01.mp3"],
    ['', '(던전)아이 오브 라펜타 보스', ['BGM_EyeOfLapenta_Boss_intro_01.mp3','BGM_EyeOfLapenta_Boss_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_EyeOfLapenta_Boss_intro_01.mp3','./Maplestory2/BGM/BGM_EyeOfLapenta_Boss_Loop_01.mp3']],
    ['', '(맵)아이 오브 라펜타', 'BGM_EyeOfLapenta_Field_01.mp3', './Maplestory2/BGM/BGM_EyeOfLapenta_Field_01.mp3'],
    ['', '(던전)블랙샤드 체임버', ['BGM_EyeOfLapenta_FinalBoss_Intro_01.mp3','BGM_EyeOfLapenta_FinalBoss_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_EyeOfLapenta_FinalBoss_Intro_01.mp3','./Maplestory2/BGM/BGM_EyeOfLapenta_FinalBoss_Loop_01.mp3']],
    ['', '(던전)아이 오브 라펜타 던전 로비', 'BGM_EyeOfLapenta_Lobby_01.mp3', './Maplestory2/BGM/BGM_EyeOfLapenta_Lobby_01.mp3'],
    ['', '(던전)아이 오브 라펜타', 'BGM_EyeOfLapenta_mob_Loop_01.mp3', './Maplestory2/BGM/BGM_EyeOfLapenta_mob_Loop_01.mp3'],
    ['Dice in Wonderland', '핑크하트의 스위트 캐슬, 빛나는 모자 - (미니게임)스페이스 번지 점프', 'BGM_FantasyCastle_01.mp3', ['./Maplestory2/BGM/BGM_FantasyCastle_01.mp3','http://maple2.vod.nexoncdn.co.kr/official/bgm/Dice%20In%20Wonderland.mp3']],
    ['', '성벽 테마 배경음', 'BGM_FantasyCastle_02.mp3', './Maplestory2/BGM/BGM_FantasyCastle_02.mp3'],
    ['', '네르만 대장간 거리', 'BGM_ForgeStreet_01.mp3', './Maplestory2/BGM/BGM_ForgeStreet_01.mp3'],
    ['', '크리티아스 필드맵 - 오로라 레이크', 'BGM_ForgottenRealm_01.mp3', './Maplestory2/BGM/BGM_ForgottenRealm_01.mp3'],
    ['', '크리티아스 필드맵', ['BGM_ForgottenTown_Intro_01.mp3', 'BGM_ForgottenTown_Castle_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_ForgottenTown_Intro_01.mp3', './Maplestory2/BGM/BGM_ForgottenTown_Castle_Loop_01.mp3']],
    ['', '크리티아스 - 키델 그랜드 브릿지', ['BGM_ForgottenTown_Intro_01.mp3', 'BGM_ForgottenTown_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_ForgottenTown_Intro_01.mp3', './Maplestory2/BGM/BGM_ForgottenTown_Loop_01.mp3']],
    ['', '', 'BGM_ForgottenTown_Loop_02.mp3', './Maplestory2/BGM/BGM_ForgottenTown_Loop_02.mp3'],
    ['', '프론티어 저택', 'BGM_Frontier_Conference_01.mp3', './Maplestory2/BGM/BGM_Frontier_Conference_01.mp3'],
    ['', '프론티어 저택 내부', 'BGM_Frontier_Mansion_01.mp3', './Maplestory2/BGM/BGM_Frontier_Mansion_01.mp3'],
    ['', '', 'BGM_GiganTika_01_Pre.mp3', './Maplestory2/BGM/BGM_GiganTika_01_Pre.mp3'],
    ['', '폐기물 매립지 - (보스)기간티카 등장', ['BGM_GiganTika_Intro_01.mp3','BGM_GiganTika_Loop_01.mp3','BGM_GiganTika_Loop_02.mp3'], ['./Maplestory2/BGM/BGM_GiganTika_Intro_01.mp3','./Maplestory2/BGM/BGM_GiganTika_Loop_01.mp3','./Maplestory2/BGM/BGM_GiganTika_Loop_02.mp3']],
    ['', '', 'BGM_Guidance_Theme_01.mp3', './Maplestory2/BGM/BGM_Guidance_Theme_01.mp3'],
    ['', '(던전)인도자의 성지', 'BGM_Guidance_Theme_02.mp3', './Maplestory2/BGM/BGM_Guidance_Theme_02.mp3'],
    ['', '던전 로비(기본) 등등...', 'BGM_GuildBattle_01.mp3', './Maplestory2/BGM/BGM_GuildBattle_01.mp3'],
    ['', '(이벤트)해피 빌리지 필드', 'BGM_HairyFairy_01.mp3', './Maplestory2/BGM/BGM_HairyFairy_01.mp3'],
    ['', '(이벤트)해피 빌리지 필드', 'BGM_HairyFairy_02.mp3', './Maplestory2/BGM/BGM_HairyFairy_02.mp3'],
    ['', '(이벤트)해피 빌리지 필드', 'BGM_HairyFairy_03.mp3', './Maplestory2/BGM/BGM_HairyFairy_03.mp3'],
    ['', '(이벤트)해피 빌리지 필드', 'BGM_HairyFairy_04.mp3', './Maplestory2/BGM/BGM_HairyFairy_04.mp3'],
    ['', '(이벤트)해피 빌리지 필드', 'BGM_HairyFairy_05_DC.mp3', './Maplestory2/BGM/BGM_HairyFairy_05_DC.mp3'],
    ['', '할로윈 이벤트 맵 배경음악, (모험[일반], 구)사무친 원한의 대저택', 'BGM_Halloween_01.mp3', './Maplestory2/BGM/BGM_Halloween_01.mp3'],
    ['Chiming Shore', '해변 배경음', 'BGM_HappyBeach_01.mp3', ['./Maplestory2/BGM/BGM_HappyBeach_01.mp3', 'http://maple2.vod.nexoncdn.co.kr/official/bgm/Chiming%20Shore.mp3']],
    ['', '', 'BGM_HappyBirthday_01.mp3', './Maplestory2/BGM/BGM_HappyBirthday_01.mp3'],
    ['', '(이밴트 맵)해피 빌리지', 'BGM_HappyWinter_01.mp3', './Maplestory2/BGM/BGM_HappyWinter_01.mp3'],
    ['', '(이밴트 맵)해피 빌리지', 'BGM_HappyWinter_02.mp3', './Maplestory2/BGM/BGM_HappyWinter_02.mp3'],
    ['Small Happiness', '결혼식장 - 헤네시스 하모니 웨딩 채플', 'BGM_HarmonyWeddingChapel_01.mp3', './Maplestory2/BGM/BGM_HarmonyWeddingChapel_01.mp3'],
    ['', '', 'BGM_HarmonyWeddingChapel_02.mp3', './Maplestory2/BGM/BGM_HarmonyWeddingChapel_02.mp3'],
    ['', '', 'BGM_HeavyGunner_Theme_01.mp3', './Maplestory2/BGM/BGM_HeavyGunner_Theme_01.mp3'],
    ['', '', 'BGM_HenesysShadow_01.mp3', './Maplestory2/BGM/BGM_HenesysShadow_01.mp3'],
    ['Spring Breeze / Forest Stacatto', '헤네시스', 'BGM_Henesys_01.mp3', ['./Maplestory2/BGM/BGM_Henesys_01.mp3',"https://soundcloud.com/maplestory2/bgm-henesys-01",'http://maple2.vod.nexoncdn.co.kr/ost/05_Forest_Staccato.mp3']],
    ['', '헤네시스 필드(경쾌한)', 'BGM_Henesys_field_01.mp3', './Maplestory2/BGM/BGM_Henesys_field_01.mp3'],
    ['', '헤네시스 필드(포근한)', 'BGM_Henesys_field_02.mp3', './Maplestory2/BGM/BGM_Henesys_field_02.mp3'],
    ['', '헤네시스 필드(초저녁)', 'BGM_Henesys_field_03.mp3', './Maplestory2/BGM/BGM_Henesys_field_03.mp3'],
    ['', '(이벤트)숨바꼭질', ['BGM_HideNSeek_Intro_01.mp3', 'BGM_HideNSeek_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_HideNSeek_Intro_01.mp3', './Maplestory2/BGM/BGM_HideNSeek_Loop_01.mp3']],
    ['Breeze Of Sands', '카르카르 아일랜드 - 루델리 시티 인근 사막', 'BGM_HistoricDesert_01.mp3', ['./Maplestory2/BGM/BGM_HistoricDesert_01.mp3','http://maple2.vod.nexoncdn.co.kr/official/bgm/Breeze%20Of%20Sands.mp3']],
    ['', '(이벤트)혁이 참참참', "BGM_HyukYi's Arcade_01.mp3", "./Maplestory2/BGM/BGM_HyukYi's Arcade_01.mp3"],
    ['', '얼음/눈 맵', 'BGM_IceAge_field_01.mp3', './Maplestory2/BGM/BGM_IceAge_field_01.mp3'],
    ['To The Highest Peak', '얼음/눈 맵', 'BGM_IceLand_01.mp3', ['./Maplestory2/BGM/BGM_IceLand_01.mp3','http://maple2.vod.nexoncdn.co.kr/official/bgm/To%20The%20Highest%20Peak.mp3']],
    ['Shiny Lane', '얼음/눈 맵', 'BGM_IceVillage_01.mp3', ['./Maplestory2/BGM/BGM_IceVillage_01.mp3', 'http://maple2.vod.nexoncdn.co.kr/official/bgm/Shiny%20Lane.mp3']],
    ['', '실내 배경음', 'BGM_indoor_01.mp3', './Maplestory2/BGM/BGM_indoor_01.mp3'],
    ['', '실내 배경음 - 포근함(헤네시스 - 넬프 어머니의 집 등)', 'BGM_indoor_02.mp3', './Maplestory2/BGM/BGM_indoor_02.mp3'],
    ['', '', ['BGM_IntoTheTempest_Intro_01.mp3','BGM_IntoTheTempest_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_IntoTheTempest_Intro_01.mp3','./Maplestory2/BGM/BGM_IntoTheTempest_Loop_01.mp3']],
    ['', '', 'BGM_Intro_Theme_01.mp3', './Maplestory2/BGM/BGM_Intro_Theme_01.mp3'],
    ['', '(이벤트 미니게임)크리스마스 때려때려 돈나무', 'BGM_JingleBell_01.mp3', './Maplestory2/BGM/BGM_JingleBell_01.mp3'],
    ['', '(던전)비욘드 링크 트리스', ['BGM_Kandura_Theme_Intro_01.mp3','BGM_Kandura_Theme_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_Kandura_Theme_Intro_01.mp3','./Maplestory2/BGM/BGM_Kandura_Theme_Loop_01.mp3']],
    ['', '(던전)비욘드 링크 트리스 - 칸두라 폭주', ['BGM_Kandura_Theme_Intro_02.mp3','BGM_Kandura_Theme_Loop_02.mp3'], ['./Maplestory2/BGM/BGM_Kandura_Theme_Intro_02.mp3','./Maplestory2/BGM/BGM_Kandura_Theme_Loop_02.mp3']],
    ['', '', 'BGM_Kargon_01.mp3', './Maplestory2/BGM/BGM_Kargon_01.mp3'],
    ['', '커닝시티 필드', 'BGM_KerningCity.mp3', './Maplestory2/BGM/BGM_KerningCity.mp3'],
    ['', '커닝시티', 'BGM_KerningCity_02.mp3', './Maplestory2/BGM/BGM_KerningCity_02.mp3'],
    ['', '커닝시티 필드', 'BGM_KerningCity_field_01.mp3', './Maplestory2/BGM/BGM_KerningCity_field_01.mp3'],
    ['', '커닝시티 필드', 'BGM_KerningCity_field_02.mp3', './Maplestory2/BGM/BGM_KerningCity_field_02.mp3'],
    ['', '', 'BGM_Knight_Theme_01.mp3', './Maplestory2/BGM/BGM_Knight_Theme_01.mp3'],
    ['', '포레인 숲, 리치몬드, 바베니 전초 기지', 'BGM_KritiasGeorkTheme_01.mp3', './Maplestory2/BGM/BGM_KritiasGeorkTheme_01.mp3'],
    ['', '게오르크 기계 맵 테마, ~~~ 실내', 'BGM_KritiasGeorkTheme_02.mp3', './Maplestory2/BGM/BGM_KritiasGeorkTheme_02.mp3'],
    ['', '란멜', 'BGM_KritiasMachineTheme_01.mp3', './Maplestory2/BGM/BGM_KritiasMachineTheme_01.mp3'],
    ['', '공중요새 투르칼리온', 'BGM_Kritias_DarkFort_01.mp3', './Maplestory2/BGM/BGM_Kritias_DarkFort_01.mp3'],
    ['', '초로록 둥지,', 'BGM_Kritias_SecretForest_01.mp3', './Maplestory2/BGM/BGM_Kritias_SecretForest_01.mp3'],
    ['', '난민 피난처 갈란, 버려진 황무지', 'BGM_Kritias_WasteLand_01.mp3', './Maplestory2/BGM/BGM_Kritias_WasteLand_01.mp3'],
    ['', '', 'BGM_Kylian_Theme_01.mp3', './Maplestory2/BGM/BGM_Kylian_Theme_01.mp3'],
    ['', '(던전)생명의 틈 - 생명의 숲', 'BGM_Lapenta_01.mp3', './Maplestory2/BGM/BGM_Lapenta_01.mp3'],
    ['Dreaming Sailor / Wind of Adventure', '리스항구', 'BGM_Lith_01.mp3', ['./Maplestory2/BGM/BGM_Lith_01.mp3','https://soundcloud.com/maplestory2/dreaming-sailor','http://maple2.vod.nexoncdn.co.kr/ost/19_Wind_of_Adventure.mp3']],
    ['', '서버 선택 화면(대양 테마)', ['BGM_Login_Ocenland_Start_01.mp3','BGM_Login_Ocenland_Loop_01.mp3'],['./Maplestory2/BGM/BGM_Login_Ocenland_Start_01.mp3', './Maplestory2/BGM/BGM_Login_Ocenland_Loop_01.mp3']],
    ['Reminisce', '서버 선택 화면(겨울 시즌)', ['BGM_Login_Reminisce_Start_01.mp3','BGM_Login_Reminisce_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_Login_Reminisce_Start_01.mp3','./Maplestory2/BGM/BGM_Login_Reminisce_Loop_01.mp3','http://maple2.vod.nexoncdn.co.kr/ost/11_Reminisce.mp3']],
    ['', '(던전)얼어붙은 신전', 'BGM_Lonely_Kana_01.mp3', './Maplestory2/BGM/BGM_Lonely_Kana_01.mp3'],
    ['Bouncing Coins', '루디브리엄 필드', 'BGM_Ludibrium_01.mp3', ['./Maplestory2/BGM/BGM_Ludibrium_01.mp3','http://maple2.vod.nexoncdn.co.kr/official/bgm/Bouncing%20Coins.mp3']],
    ['With Light Steps', '루디브리엄 필드', 'BGM_Ludibrium_02.mp3', ['./Maplestory2/BGM/BGM_Ludibrium_02.mp3','http://maple2.vod.nexoncdn.co.kr/official/bgm/With%20Light%20Steps.mp3']],
    ['', '', 'BGM_Lumieragon_01.mp3', './Maplestory2/BGM/BGM_Lumieragon_01.mp3'],
    ['Energetic Wave', '결혼식장 - 럭셔리 웨딩 크루즈', 'BGM_LuxuryCruiseWedding_01.mp3', ['./Maplestory2/BGM/BGM_LuxuryCruiseWedding_01.mp3', 'http://maple2vod-nexon30.ktics.co.kr/ost/BGM07_EnergeticWave_LuxuryCruiseWedding.mp3']],
    ['', '서버 선택 화면(마드리아 테마)', 'BGM_Madria_Theme_01.mp3', './Maplestory2/BGM/BGM_Madria_Theme_01.mp3'],
    ['Yester Story / MS2 Main Theme', '서버 선택 화면(봄/가을 테마)', 'BGM_MainTheme_01.mp3', ['./Maplestory2/BGM/BGM_MainTheme_01.mp3','https://soundcloud.com/maplestory2/yester-story','http://maple2.vod.nexoncdn.co.kr/ost/09_MS2_Main_Theme.mp3']],
    ['', '(아케이드)스프링 팜', 'BGM_MapleArcade_01_Loop.mp3', './Maplestory2/BGM/BGM_MapleArcade_01_Loop.mp3'],
    ['', '(아케이드)스프링 팜', 'BGM_MapleArcade_02.mp3', './Maplestory2/BGM/BGM_MapleArcade_02.mp3'],
    ['', '(이벤트 맵)메이플 마블', 'BGM_MapleEvent_Intro_01.mp3', './Maplestory2/BGM/BGM_MapleEvent_Intro_01.mp3'],
    ['', '(이벤트 맵)메이플 마블', 'BGM_MapleEvent_Loop_01.mp3', './Maplestory2/BGM/BGM_MapleEvent_Loop_01.mp3'],
    ['The Little Adventurer', '메이플 아일랜드 필드', 'BGM_MapleIsland_01.mp3', ['./Maplestory2/BGM/BGM_MapleIsland_01.mp3','http://maple2.vod.nexoncdn.co.kr/official/bgm/The%20Little%20Adventurer.mp3']],
    ['Sweet Serenity', '웨딩 빌리지', 'BGM_MapleWeddingVillage_01.mp3', ['./Maplestory2/BGM/BGM_MapleWeddingVillage_01.mp3', 'http://maple2vod-nexon30.ktics.co.kr/ost/BGM01_SweetSerenity_WeddingVillage.mp3']],
    ['', '(미니게임)케이 이벤트 - 루디브리엄 대탈출, 트랩 마스터, 파이널 서바이버, 메이플 OX 퀴즈쇼', 'BGM_Massive.mp3', './Maplestory2/BGM/BGM_Massive.mp3'],
    ['', '(미니게임)케이 이벤트 - 크레이지 러너즈, 스프링 비치, (던전)캐시마트 아르바이트', 'BGM_Massive_02.mp3', './Maplestory2/BGM/BGM_Massive_02.mp3'],
    ['', '', 'BGM_Michael_Theme_01.mp3', './Maplestory2/BGM/BGM_Michael_Theme_01.mp3'],
    ['', '', 'BGM_Michael_Theme_02.mp3', './Maplestory2/BGM/BGM_Michael_Theme_02.mp3'],
    ['', '(퀘스트 에필로그)미카 엔딩', 'BGM_Mika_Epilogue_01.mp3', './Maplestory2/BGM/BGM_Mika_Epilogue_01.mp3'],
    ['', '서버 선택 화면(모랑 숲 테마)', ['BGM_MomoAndTheSecretForest_Intro_01.mp3','BGM_MomoAndTheSecretForest_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_MomoAndTheSecretForest_Intro_01.mp3','./Maplestory2/BGM/BGM_MomoAndTheSecretForest_Loop_01.mp3']],
    ['', '크리티아스 - 오염된 모랑 숲, 초로록 둥지', ['BGM_MorangAndTheSecretForest_Intro_01.mp3','BGM_MorangAndTheSecretForest_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_MorangAndTheSecretForest_Intro_01.mp3','./Maplestory2/BGM/BGM_MorangAndTheSecretForest_Loop_01.mp3']],
    ['', '퍼니퍼니 아일랜드 - (보스)머쉬킹', 'BGM_MushroomRichKing_01.mp3', './Maplestory2/BGM/BGM_MushroomRichKing_01.mp3'],
    ['', '[던전]대양의 수호신, (초기)스카이 포트리스 함교', 'BGM_OceanLand_01.mp3', './Maplestory2/BGM/BGM_OceanLand_01.mp3'],
    ['', '페리온', 'BGM_Perion.mp3', './Maplestory2/BGM/BGM_Perion.mp3'],
    ['Sacred Highland', '결혼식장 - 페리온 서약의 골짜기', 'BGM_PerionWeddingValley_01.mp3', './Maplestory2/BGM/BGM_PerionWeddingValley_01.mp3'],
    ['', '페리온 필드', 'BGM_Perion_field_01.mp3', './Maplestory2/BGM/BGM_Perion_field_01.mp3'],
    ['', '페리온 필드', 'BGM_Perion_field_02.mp3', './Maplestory2/BGM/BGM_Perion_field_02.mp3'],
    ['', '(미니게임)웨딩 피냐타', 'BGM_PinataTheUnicorn_Battle_Loop_01.mp3', './Maplestory2/BGM/BGM_PinataTheUnicorn_Battle_Loop_01.mp3'],
    ['', '(미니게임)웨딩 피냐타', ['BGM_PinataTheUnicorn_Intro_01.mp3', 'BGM_PinataTheUnicorn_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_PinataTheUnicorn_Intro_01.mp3', './Maplestory2/BGM/BGM_PinataTheUnicorn_Loop_01.mp3']],
    ['', '(이벤트 미니게임)핑크빈 셋, 둘, 하나!', "BGM_PinkBean's Arcade_01.mp3", "./Maplestory2/BGM/BGM_PinkBean's Arcade_01.mp3"],
    ['', '[던전] 이계의 존재', ['BGM_PinkBean_Intro_01.mp3', 'BGM_PinkBean_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_PinkBean_Intro_01.mp3','./Maplestory2/BGM/BGM_PinkBean_Loop_01.mp3']],
    ['', '[던전]달빛 선장의 요새 / 오르비스 공중 함선(인페르녹 최후의 방어선 1,2페이즈)', 'BGM_PirateShip_01.mp3', './Maplestory2/BGM/BGM_PirateShip_01.mp3'],
    ['', '독액 동굴', 'BGM_PosionCave_01.mp3', './Maplestory2/BGM/BGM_PosionCave_01.mp3'],
    ['', '', 'BGM_Priest_Theme_01.mp3', './Maplestory2/BGM/BGM_Priest_Theme_01.mp3'],
    ['', '알리카르 감옥', 'BGM_Prison_01.mp3', './Maplestory2/BGM/BGM_Prison_01.mp3'],
    ['Puppet Theatre', '(이벤트 맵)블러디 몽슈슈 호텔', 'BGM_PuppetTheatre_01.mp3', ['./Maplestory2/BGM/BGM_PuppetTheatre_01.mp3','http://maple2.vod.nexoncdn.co.kr/ost/10_Puppet_Theatre.mp3']],
    ['', '', 'BGM_Ranger_Theme_01.mp3', './Maplestory2/BGM/BGM_Ranger_Theme_01.mp3'],
    ['Snowy Dream', '서버 선택 화면(겨울 테마)', 'BGM_Reminiscing_01.mp3', ['./Maplestory2/BGM/BGM_Reminiscing_01.mp3','http://maple2vod-nexon30.ktics.co.kr/ost/BGM08_SnowyDream_Login2019Winter.mp3']],
    ['', '', 'BGM_ReversedRebirth_01.mp3', './Maplestory2/BGM/BGM_ReversedRebirth_01.mp3'],
    ['Road To Home', '서버 선택 화면(가을 테마)', ['BGM_RoadtoHome_Intro_01.mp3','BGM_RoadtoHome_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_RoadtoHome_Intro_01.mp3','./Maplestory2/BGM/BGM_RoadtoHome_Loop_01.mp3','http://maple2.vod.nexoncdn.co.kr/ost/12_Road_to_Home.mp3']],
    ['The Little Boy', '루델리 시티', 'BGM_RoyalCity_01.mp3', ['./Maplestory2/BGM/BGM_RoyalCity_01.mp3','http://maple2.vod.nexoncdn.co.kr/official/bgm/The%20Little%20Boy.mp3']],
    ['The Big R', '루델리 시티 필드', 'BGM_RoyalCity_Field_01.mp3', ['./Maplestory2/BGM/BGM_RoyalCity_Field_01.mp3','http://maple2.vod.nexoncdn.co.kr/official/bgm/The%20Big%20R.mp3']],
    ['Echo Of The Runes', '', 'BGM_RuneBlader_Cave_01.mp3', ['./Maplestory2/BGM/BGM_RuneBlader_Cave_01.mp3','http://maple2.vod.nexoncdn.co.kr/official/bgm/Echo%20Of%20The%20Runes.mp3']],
    ['', '', 'BGM_RuneBlader_Cave_02.mp3', './Maplestory2/BGM/BGM_RuneBlader_Cave_02.mp3'],
    ['The Mission Fateful', '', 'BGM_RuneBlader_Fortress_01.mp3', ['./Maplestory2/BGM/BGM_RuneBlader_Fortress_01.mp3','http://maple2.vod.nexoncdn.co.kr/official/bgm/The%20Mission%20Fateful.mp3']],
    ['Seashell Under The Sands', '', 'BGM_RuneBlader_Island_01.mp3', ['./Maplestory2/BGM/BGM_RuneBlader_Island_01.mp3','http://maple2.vod.nexoncdn.co.kr/official/bgm/Seashell%20With%20The%20Moon.mp3']],
    ['Little Chatterers', '꽃비 숲길', 'BGM_SecretSakura_01.mp3', ['./Maplestory2/BGM/BGM_SecretSakura_01.mp3','http://maple2.vod.nexoncdn.co.kr/official/bgm/Little%20Chatterers.mp3']],
    ['', '탈리스커 필드', 'BGM_SF_field_01.mp3', './Maplestory2/BGM/BGM_SF_field_01.mp3'],
    ['', '그림자 원정대 / 군단전 / 길드레이드 링크5 : 불사의 결투장', 'BGM_ShadowExpedition_Loop_01.mp3', './Maplestory2/BGM/BGM_ShadowExpedition_Loop_01.mp3'],
    ['', '쉐도우 게이트 인근 지역', 'BGM_ShadowGate_01.mp3', './Maplestory2/BGM/BGM_ShadowGate_01.mp3'],
    ['', '', 'BGM_ShadowHidden_01.mp3', './Maplestory2/BGM/BGM_ShadowHidden_01.mp3'],
    ['', '커닝시티 인근 SF 테마 필드', 'BGM_ShadowSF_01.mp3', './Maplestory2/BGM/BGM_ShadowSF_01.mp3'],
    ['', '쉐도우 월드 필드', 'BGM_ShadowWorld_01.mp3', './Maplestory2/BGM/BGM_ShadowWorld_01.mp3'],
    ['', '커닝시티 - 아케이드 센터 / 쁘띠 쇼핑몰', 'BGM_ShoppingAcade_01.mp3', './Maplestory2/BGM/BGM_ShoppingAcade_01.mp3'],
    ['', '(에픽 퀘스트)', 'BGM_SkyFortress_Battle_01.mp3', './Maplestory2/BGM/BGM_SkyFortress_Battle_01.mp3'],
    ['', '(포트리스 럼블) 블리체 전투', 'BGM_SkyFortress_Bliche_01.mp3', './Maplestory2/BGM/BGM_SkyFortress_Bliche_01.mp3'],
    ['', '(포트리스 럼블) 콘대르 전투', 'BGM_SkyFortress_Conder_01.mp3', './Maplestory2/BGM/BGM_SkyFortress_Conder_01.mp3'],
    ['', '(포트리스 럼블) 메이슨 전투', 'BGM_SkyFortress_Mason_01.mp3', './Maplestory2/BGM/BGM_SkyFortress_Mason_01.mp3'],
    ['', '(포트리스 럼블) 네이린 전투', 'BGM_SkyFortress_Neirin_01.mp3', './Maplestory2/BGM/BGM_SkyFortress_Neirin_01.mp3'],
    ['', '(포트리스 럼블) 샤텐 전투', 'BGM_SkyFortress_Schatten_01.mp3', './Maplestory2/BGM/BGM_SkyFortress_Schatten_01.mp3'],
    ['', '스카이 포트리스 함교', ['BGM_SkyFortress_Theme_Intro_01.mp3', 'BGM_SkyFortress_Theme_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_SkyFortress_Theme_Intro_01.mp3','./Maplestory2/BGM/BGM_SkyFortress_Theme_Loop_01.mp3']],
    ['', '', 'BGM_SkyTower_01.mp3', './Maplestory2/BGM/BGM_SkyTower_01.mp3'],
    ['Twinking Hearts', '결혼식장 - 루델리 스카이 캐슬', 'BGM_SkyWeddingCastle_01.mp3', './Maplestory2/BGM/BGM_SkyWeddingCastle_01.mp3'],
    ['', '눈보라 산맥, 서릿발 신전', 'BGM_SnowLand_01.mp3', './Maplestory2/BGM/BGM_SnowLand_01.mp3'],
    ['', '', 'BGM_Sorrow_01.mp3', './Maplestory2/BGM/BGM_Sorrow_01.mp3'],
    ['', '', 'BGM_SoulBinder_Theme_01.mp3', './Maplestory2/BGM/BGM_SoulBinder_Theme_01.mp3'],
    ['', '', 'BGM_SoulBinder_Theme_02.mp3', './Maplestory2/BGM/BGM_SoulBinder_Theme_02.mp3'],
    ['', '트라이아 - 시공의 균열', 'BGM_Spacetime_01.mp3', './Maplestory2/BGM/BGM_Spacetime_01.mp3'],
    ['Spring In Kritias', '서버 선택 화면(크리티아스의 봄 테마)', 'BGM_SpringInKritias_01.mp3', './Maplestory2/BGM/BGM_SpringInKritias_01.mp3'],
    ['', '', 'BGM_Striker_Theme_01.mp3', './Maplestory2/BGM/BGM_Striker_Theme_01.mp3'],
    ['Tales of Light', '최초의 전직 테마곡', ["BGM_TalesofLight.mp3",'BGM_TalesOfLight_MR.mp3'], ["https://youtu.be/Sm2B_YYPQWo",'./Maplestory2/BGM/BGM_TalesOfLight_MR.mp3']],
    ['', '탈리스커', 'BGM_Talisker_01.mp3', './Maplestory2/BGM/BGM_Talisker_01.mp3'],
    ['Secrets Under The Sands', '미나르, 미나르 주변 필드, 나즈카르 신전', 'BGM_Temple_01.mp3', ['./Maplestory2/BGM/BGM_Temple_01.mp3','http://maple2.vod.nexoncdn.co.kr/official/bgm/Secrets%20Under%20The%20Sands.mp3']],
    ['', '(이벤트)크리스마스 이벤트 퀘스트 맵 / (이벤트)블러디 몽슈슈 호텔 퀘스트 맵 ', 'BGM_The Nightmare Before Christmas_01.mp3', './Maplestory2/BGM/BGM_The Nightmare Before Christmas_01.mp3'],
    ['', '', 'BGM_Theme_Ereb_01.mp3', './Maplestory2/BGM/BGM_Theme_Ereb_01.mp3'],
    ['', '', 'BGM_Thief_Theme_01.mp3', './Maplestory2/BGM/BGM_Thief_Theme_01.mp3'],
    ['', '(던전)티마이온 회랑', 'BGM_Timaion_01.mp3', './Maplestory2/BGM/BGM_Timaion_01.mp3'],
    ['Timeless Town', '크리티아스 필드', 'BGM_TimelessTown_01.mp3', ['./Maplestory2/BGM/BGM_TimelessTown_01.mp3','http://maple2.vod.nexoncdn.co.kr/ost/17_Timeless_Town.mp3']],
    ['', '크리티아스 필드', 'BGM_TimelessTown_02.mp3', './Maplestory2/BGM/BGM_TimelessTown_02.mp3'],
    ['', '(던전)트라이아 성 지하', 'BGM_TriaAttack_01.mp3', './Maplestory2/BGM/BGM_TriaAttack_01.mp3'],
    ['Tria', '트라이아', 'BGM_Tria_01.mp3', ['./Maplestory2/BGM/BGM_Tria_01.mp3', 'http://maple2.vod.nexoncdn.co.kr/ost/18_Tria.mp3']],
    ['', '개미굴', 'BGM_UnderGround_01.mp3', './Maplestory2/BGM/BGM_UnderGround_01.mp3'],
    ['', '(던전)루디브리엄 시계탑', ['BGM_WakeUp_Intro_01.mp3','BGM_WakeUp_Loop_01.mp3'], ['./Maplestory2/BGM/BGM_WakeUp_Intro_01.mp3','./Maplestory2/BGM/BGM_WakeUp_Loop_01.mp3']],
    ['', '(이벤트) 크리스마스 퀘스트 엔딩', 'BGM_WarmHug_01.mp3', './Maplestory2/BGM/BGM_WarmHug_01.mp3'],
    ['', '(웨딩)결혼식 행진', 'BGM_WeddingMarch_01.mp3', './Maplestory2/BGM/BGM_WeddingMarch_01.mp3'],
    ['', '(웨딩)결혼식 행진', 'BGM_WeddingMarch_02.mp3', './Maplestory2/BGM/BGM_WeddingMarch_02.mp3'],
    ['', '', 'BGM_WeiHong_Theme_01.mp3', './Maplestory2/BGM/BGM_WeiHong_Theme_01.mp3'],
    ['', '', 'BGM_Wizard_Theme_01.mp3', './Maplestory2/BGM/BGM_Wizard_Theme_01.mp3'],
    ['', '머쉬킹 챔피언십(머쉬킹 로얄) 인트로', 'BGM_YOYO_Intro_01.mp3', './Maplestory2/BGM/BGM_YOYO_Intro_01.mp3'],
    ['', '머쉬킹 챔피언십(머쉬킹 로얄) - 태초의 버섯 섬 경기 대기', 'BGM_YOYO_Lobby_01.mp3', './Maplestory2/BGM/BGM_YOYO_Lobby_01.mp3'],
    ['', '머쉬킹 챔피언십(머쉬킹 로얄) - 태초의 버섯 섬', 'BGM_YOYO_Loop_01.mp3', './Maplestory2/BGM/BGM_YOYO_Loop_01.mp3'],
    ['', '(보스)자쿰', ['BGM_Zakum_Intro.mp3','BGM_Zakum_Loop.mp3'], ['./Maplestory2/BGM/BGM_Zakum_Intro.mp3','./Maplestory2/BGM/BGM_Zakum_Loop.mp3']],
    ['', '무음', 'bridge.mp3', './Maplestory2/BGM/bridge.mp3'],
    ['', '무음', 'bridge2.mp3', './Maplestory2/BGM/bridge2.mp3'],
    ['', '무음', 'bridge3.mp3', './Maplestory2/BGM/bridge3.mp3'],
    ['', '(이벤트 케이 이벤트)크리스마스 댄스댄스스탑 시작', 'DDStop_Christmas_DanceIntro_01.mp3', './Maplestory2/BGM/DDStop_Christmas_DanceIntro_01.mp3'],
    ['', '(이벤트 케이 이벤트)크리스마스 댄스댄스스탑 숫자맞추기', 'DDStop_Christmas_DanceLoop_01.mp3', './Maplestory2/BGM/DDStop_Christmas_DanceLoop_01.mp3'],
    ['', '(이벤트 케이 이벤트)크리스마스 댄스댄스스탑 - 댄스타임', ['DDStop_Christmas_Loop_01.mp3', 'DDStop_Christmas_Loop_02.mp3', 'DDStop_Christmas_Loop_03.mp3', 'DDStop_Christmas_Loop_04.mp3', 'DDStop_Christmas_Loop_05.mp3', 'DDStop_Christmas_Loop_06.mp3', 'DDStop_Christmas_Loop_07.mp3', 'DDStop_Christmas_Loop_08.mp3', 'DDStop_Christmas_Loop_09.mp3', 'DDStop_Christmas_Loop_10.mp3', 'DDStop_Christmas_Loop_11.mp3', 'DDStop_Christmas_Loop_12.mp3', 'DDStop_Christmas_Loop_13.mp3', 'DDStop_Christmas_Loop_14.mp3', 'DDStop_Christmas_Loop_15.mp3'], ['./Maplestory2/BGM/DDStop_Christmas_Loop_01.mp3', './Maplestory2/BGM/DDStop_Christmas_Loop_02.mp3', './Maplestory2/BGM/DDStop_Christmas_Loop_03.mp3', './Maplestory2/BGM/DDStop_Christmas_Loop_04.mp3', './Maplestory2/BGM/DDStop_Christmas_Loop_05.mp3', './Maplestory2/BGM/DDStop_Christmas_Loop_06.mp3', './Maplestory2/BGM/DDStop_Christmas_Loop_07.mp3', './Maplestory2/BGM/DDStop_Christmas_Loop_08.mp3', './Maplestory2/BGM/DDStop_Christmas_Loop_09.mp3', './Maplestory2/BGM/DDStop_Christmas_Loop_10.mp3', './Maplestory2/BGM/DDStop_Christmas_Loop_11.mp3', './Maplestory2/BGM/DDStop_Christmas_Loop_12.mp3', './Maplestory2/BGM/DDStop_Christmas_Loop_13.mp3', './Maplestory2/BGM/DDStop_Christmas_Loop_14.mp3', './Maplestory2/BGM/DDStop_Christmas_Loop_15.mp3']],
    ['', '(케이 이벤트)댄스댄스스탑 시작', 'DDStop_DanceIntro_01.mp3', './Maplestory2/BGM/DDStop_DanceIntro_01.mp3'],
    ['', '(케이 이벤트)댄스댄스스탑 숫자맞추기', 'DDStop_DanceLoop_01.mp3', './Maplestory2/BGM/DDStop_DanceLoop_01.mp3'],
    ['', '(케이 이벤트)댄스댄스스탑 숫자맞추기', 'DDStop_DanceLoop_02.mp3', './Maplestory2/BGM/DDStop_DanceLoop_02.mp3'],
    ['', '(케이 이벤트)댄스댄스스탑 - 댄스타임', ['DDStop_Loop_01.mp3','DDStop_Loop_02.mp3','DDStop_Loop_03.mp3','DDStop_Loop_04.mp3','DDStop_Loop_05.mp3','DDStop_Loop_06.mp3','DDStop_Loop_07.mp3','DDStop_Loop_08.mp3','DDStop_Loop_09.mp3','DDStop_Loop_10.mp3','DDStop_Loop_11.mp3','DDStop_Loop_12.mp3','DDStop_Loop_13.mp3','DDStop_Loop_14.mp3','DDStop_Loop_15.mp3','DDStop_Loop_16.mp3','DDStop_Loop_17.mp3','DDStop_Loop_18.mp3','DDStop_Loop_19.mp3'], ['./Maplestory2/BGM/DDStop_Loop_01.mp3','./Maplestory2/BGM/DDStop_Loop_02.mp3','./Maplestory2/BGM/DDStop_Loop_03.mp3','./Maplestory2/BGM/DDStop_Loop_04.mp3','./Maplestory2/BGM/DDStop_Loop_05.mp3','./Maplestory2/BGM/DDStop_Loop_06.mp3','./Maplestory2/BGM/DDStop_Loop_07.mp3','./Maplestory2/BGM/DDStop_Loop_08.mp3','./Maplestory2/BGM/DDStop_Loop_09.mp3','./Maplestory2/BGM/DDStop_Loop_10.mp3','./Maplestory2/BGM/DDStop_Loop_11.mp3','./Maplestory2/BGM/DDStop_Loop_12.mp3','./Maplestory2/BGM/DDStop_Loop_13.mp3','./Maplestory2/BGM/DDStop_Loop_14.mp3','./Maplestory2/BGM/DDStop_Loop_15.mp3','./Maplestory2/BGM/DDStop_Loop_16.mp3','./Maplestory2/BGM/DDStop_Loop_17.mp3','./Maplestory2/BGM/DDStop_Loop_18.mp3','./Maplestory2/BGM/DDStop_Loop_19.mp3']],
    ['', '(미니게임)웨딩 댄스댄스스탑 시작', 'DDstop_Wedding_DanceIntro_01.mp3', './Maplestory2/BGM/DDstop_Wedding_DanceIntro_01.mp3'],
    ['', '(미니게임)웨딩 댄스댄스스탑 숫자맞추기', 'DDstop_Wedding_DanceLoop_01.mp3', './Maplestory2/BGM/DDstop_Wedding_DanceLoop_01.mp3'],
    ['', '(미니게임)웨딩 댄스댄스스탑 - 댄스타임', ['DDstop_Wedding_Loop_01.mp3','DDstop_Wedding_Loop_02.mp3','DDstop_Wedding_Loop_03.mp3','DDstop_Wedding_Loop_04.mp3','DDstop_Wedding_Loop_05.mp3','DDstop_Wedding_Loop_06.mp3','DDstop_Wedding_Loop_07.mp3','DDstop_Wedding_Loop_08.mp3'], ['./Maplestory2/BGM/DDstop_Wedding_Loop_01.mp3', './Maplestory2/BGM/DDstop_Wedding_Loop_02.mp3', './Maplestory2/BGM/DDstop_Wedding_Loop_03.mp3', './Maplestory2/BGM/DDstop_Wedding_Loop_04.mp3', './Maplestory2/BGM/DDstop_Wedding_Loop_05.mp3', './Maplestory2/BGM/DDstop_Wedding_Loop_06.mp3', './Maplestory2/BGM/DDstop_Wedding_Loop_07.mp3', './Maplestory2/BGM/DDstop_Wedding_Loop_08.mp3']],
    ['', '무음', 'silence1.mp3', './Maplestory2/BGM/silence1.mp3'],
    ['메투난다', '(Youtube)메이플2 리스타트',["MS2_MV_AR.mp3"], ["https://youtu.be/WHNwjph_r5g",'http://maple2.vod.nexoncdn.co.kr/ost/21_MS2_MV_AR.mp3']],
    ['핑크빈 송','(Youtube)핑크빈송 ♬','undefined',"https://youtu.be/LGbHpuaVxRw"],
    ['혁이 프로젝트- Mirror','(Youtube)프로듀스 혁이',['MS2_MirrorMirror.mp3','MS2_MirrorMirror_MR.mp3'],["https://youtu.be/k7oSqjd_OJg","http://maple2.vod.nexoncdn.co.kr/ost/22_MS2_MirrorMirror_MR.mp3"]],
    ['우리들의행복해지는방법(feat.해피월드)','(Youtube)메이플스토리2 오픈 2주년 기념 뮤직비디오','','https://youtu.be/uQLdpz1j9_0'],
    ['블랙빈 송','(Youtube)블랙빈','BGM09_BlackBeanSong_01.mp3' ,['https://youtu.be/litRxevuHmM','http://maple2vod-nexon30.ktics.co.kr/ost/BGM09_BlackBeanSong_01.mp3']],
    ['','서버 선택 화면(메이플스토리2 1주년 테마)','BGM_1stAnniversary_Login_Theme_01.mp3' ,'https://youtu.be/2GkcwG_TgIE'],
    ['','서버 선택 화면(메이플스토리2 오픈베타)','BGM_Login_Theme_01.mp3','https://youtu.be/hf7XUpQsi1g'],
    ['','(Youtube)메이플스토리2 게임 플레이 영상 첫 공개!','(단 한 번도 공개된 적 없는 음원)','https://youtu.be/xZ0-cZHEexw']
];

//palletes
let ms2_included_palletes_origin_format=[
    ['p', 'pallete-title'],
    ['img','pallete-img']
];

let ms2_included_palletes_origin_records=[
    //including sample custom design of MS2(Equip)
    ["아기칠면조 망토(디자인 망토)", "./Maplestory2/Custom/Equip/Babyturkey_Mantle.png"],
    ["Cha_Bag_D(디자인 배낭)", "./Maplestory2/Custom/Equip/Cha_Bag_D.png"],
    ["의사 원피스 가운(여성용 디자인 원피스)", "./Maplestory2/Custom/Equip/Doctor_Onepice_F.png"],
    ["듀크 원피스(남성용 디자인 원피스)", "./Maplestory2/Custom/Equip/Duke_Onepice_M.png"],
    ["축구 바지(디자인 바지)", "./Maplestory2/Custom/Equip/Football_Pants.png"],
    ["축구 바지(여성용 디자인 바지)", "./Maplestory2/Custom/Equip/Football_Pants_F.png"],
    ["축구 상의(디자인 탑)", "./Maplestory2/Custom/Equip/Football_Top.png"],
    ["축구 상의(여성용 디자인 탑)", "./Maplestory2/Custom/Equip/Football_Top_F.png"],
    ["더키 장갑(디자인 장갑)", "./Maplestory2/Custom/Equip/gloves_duck.png"],
    ["더키 장갑(여성용 디자인 장갑)", "./Maplestory2/Custom/Equip/gloves_F_duck.png"],
    ["메이플 자이언츠(디자인 탑)", "./Maplestory2/Custom/Equip/maplegiants_Top.png"],
    ["메이플 자이언츠(여성용 디자인 탑)", "./Maplestory2/Custom/Equip/maplegiants_Top_F.png"],
    ["메이플 자이언츠 바지(여성용 디자인 바지)", "./Maplestory2/Custom/Equip/MaplegiantsPants_F.png"],
    ["메이플 자아언츠 반소매 상의(여성용 디자인 탑)", "./Maplestory2/Custom/Equip/MaplegiantsTop_F.png"],
    ["단풍잎 패턴 코트(여성용 디자인 한벌)", "./Maplestory2/Custom/Equip/maplepattern_coat_f.png"],
    ["단풍잎 패턴 코트(남성용 디자인 한벌)", "./Maplestory2/Custom/Equip/maplepattern_coat_m.png"],
    ["더키 원피스(여성용 디자인 원피스)", "./Maplestory2/Custom/Equip/onepiece_F_duck.png"],
    ["모던 룩 원피스(여성용 디자인 원피스)", "./Maplestory2/Custom/Equip/onepiece_F_modernlook.png"],
    ["버섯 원피스(디자인 원피스)", "./Maplestory2/Custom/Equip/onepiece_mushroom.png"],
    ["점박이 바지(디자인 바지)", "./Maplestory2/Custom/Equip/pants_dot.png"],
    ["청바지(여성용 디자인 바지)", "./Maplestory2/Custom/Equip/pants_F_jeans.png"],
    ["오리너구리 모자(여성용 디자인 캡)", "./Maplestory2/Custom/Equip/Platypus_Cap_C.png"],
    ["점박이 셔츠(디자인 탑)", "./Maplestory2/Custom/Equip/shirt_dot.png"],
    ["메이플스토리2 로고 셔츠(여성용 디자인 탑)", "./Maplestory2/Custom/Equip/shirt_F_logo.png"],
    ["검정색 부츠(디자인 신발)", "./Maplestory2/Custom/Equip/shoes_blackboots.png"],
    ["데블린 신발(여성용 디자인 신발)", "./Maplestory2/Custom/Equip/shoes_F_devlin.png"],
    ["눈사람 저지(남성용 디자인 탑)", "./Maplestory2/Custom/Equip/snowman_jersey_f.png"],
    ["눈사람 저지(여성용 디자인 탑)", "./Maplestory2/Custom/Equip/snowman_jersey_m.png"],
    ["눈사람 가면(여성용 디자인 가면)", "./Maplestory2/Custom/Equip/snowman_mask_f.png"],
    ["눈사람 가면(남성용 디자인 가면)", "./Maplestory2/Custom/Equip/snowman_mask_m.png"],
    ["다람쥐 모자(디자인 동물 탈)", "./Maplestory2/Custom/Equip/Squirrel_Hat_C.png"],
    ["수영모(디자인 수영모)", "./Maplestory2/Custom/Equip/snowman_jersey_m.png"],
    ["화사한 수영모(여성용 디자인 수영모)", "./Maplestory2/Custom/Equip/swimmigcap_F_floral.png"],
    ["타이즈 바지(남성용 디자인 바지)", "./Maplestory2/Custom/Equip/TaizzPants_M.png"],
    
    /* NO Wepon Equipment palletes pre-included */

    //including sample custom design of MS2(for Construction)
    ["상자(디자인 큐브)", "./Maplestory2/Custom/Cube/box.png"],
    ["어항(디자인 큐브)", "./Maplestory2/Custom/Cube/fish tank.png"],
    ["오븐(디자인 책장 큐브)", "./Maplestory2/Custom/Cube/oven.png"],
    ["종이 집(디자인 큐브)", "./Maplestory2/Custom/Cube/paper house.png"],
    ["피아노(디자인 계단 큐브)", "./Maplestory2/Custom/Cube/piano.png"],
    ["기둥(디자인 원통형 큐브)", "./Maplestory2/Custom/Cube/sign.png"],
    //including sample custom design of MS2(Ridee)
    /* Nothing to pre-installed included default Ridee palletes */
];


//palletes
let ms2_custom_palletes_origin_format=[
    ['p', 'pallete-title'],
    ['img','pallete-img'],
    ['p', 'pallete-cost-meso'],
    ['p', 'pallete-cost-meret']
];

let ms2_custom_palletes_origin_records=[
    //default design scheme in the MS2(Equip)
    ["디자인 티셔츠 (남)", "./Maplestory2/Custom/Equip/template_T-shirt_M.png", 100000],
    ["디자인 티셔츠 (여)", "./Maplestory2/Custom/Equip/template_T-shirt_F.png", 100000],
    ["디자인 반바지 (남)", "./Maplestory2/Custom/Equip/template_pants_half_M.png", 100000],
    ["디자인 반바지 (여)", "./Maplestory2/Custom/Equip/template_pants_half_F.png", 100000],
    ["디자인 웨이브 대거 (단검)", "./Maplestory2/Custom/Equip/template_wave_dagger.png",undefined, 500],
    ["디자인 폴첸 (롱소드)", "./Maplestory2/Custom/Equip/template_polechen.png",undefined, 500],
    ["디자인 버클러 (방패)", "./Maplestory2/Custom/Equip/template_buckler.png",undefined, 500],
    ["디자인 리커브 (활)", "./Maplestory2/Custom/Equip/template_recurve.png",undefined, 500],
    ["디자인 크롭 탑 (남)", "./Maplestory2/Custom/Equip/template_crop_top_M.png",undefined, 400],
    ["디자인 크롭 탑 (여)", "./Maplestory2/Custom/Equip/template_crop_top_F.png",undefined, 400],
    ["디자인 핫팬츠 (남)", "./Maplestory2/Custom/Equip/template_hot_pants_M.png",undefined, 200],
    ["디자인 핫팬츠 (여)", "./Maplestory2/Custom/Equip/template_hot_pants_F.png",undefined, 200],
    ["디자인 단검 (단검)", "./Maplestory2/Custom/Equip/template_dagger.png",undefined, 500],
    ["디자인 둔기 (둔기)", "./pictogram/locked.png",undefined, 500],
    ["디자인 롱소드 (롱소드)", "./Maplestory2/Custom/Equip/template_longsword.png",undefined, 500],
    ["디자인 라운드 홀 (홀)", "./Maplestory2/Custom/Equip/template_round_scepter.png",undefined, 500],    
    ["디자인 홀 (홀)", "./Maplestory2/Custom/Equip/template_scepter.png",undefined, 500],
    ["디자인 초승달 표창 (표창)", "./Maplestory2/Custom/Equip/template_crescent_moon_chakram.png",undefined, 500],
    ["디자인 표창 (표창)", "./Maplestory2/Custom/Equip/template_throwing_star.png",undefined, 500],
    ["디자인 스크롤 (법전)", "./Maplestory2/Custom/Equip/template_scroll.png",undefined, 500],
    ["디자인 법전 (법전)", "./Maplestory2/Custom/Equip/template_codex.png",undefined, 500],
    ["디자인 방패 (방패)", "./Maplestory2/Custom/Equip/template_shield.png",undefined, 500],
    ["디자인 플랫 라지소드 (라지소드)", "./Maplestory2/Custom/Equip/template_flat_largesword.png",undefined, 500],
    ["디자인 라지소드 (라지소드)", "./Maplestory2/Custom/Equip/template_largesword.png",undefined, 500],
    ["디자인 활 (활)", "./Maplestory2/Custom/Equip/template_bow.png",undefined, 500],
    ["디자인 라운드 스태프 (스태프)", "./Maplestory2/Custom/Equip/template_round_staff.png",undefined, 500],
    ["디자인 스태프 (스태프)", "./Maplestory2/Custom/Equip/template_staff.png",undefined, 500],
    ["디자인 포멀 캐논 (캐논)", "./Maplestory2/Custom/Equip/template_pommeled_cannon.png",undefined, 500],
    ["디자인 캐논 (캐논)", "./Maplestory2/Custom/Equip/template_cannon.png",undefined, 500],
    ["디자인 샤프 블레이드 (블레이드)", "./Maplestory2/Custom/Equip/template_sharp_blade.png",undefined, 500],
    ["디자인 블레이드 (블레이드)", "./Maplestory2/Custom/Equip/template_blade.png",undefined, 500],
    ["디자인 너클 (너클)", "./Maplestory2/Custom/Equip/template_knuckles.png",undefined, 500],
    ["디자인 크리스탈 오브 (오브)", "./Maplestory2/Custom/Equip/template_crystal_orb.png",undefined, 500],
    ["디자인 오브 (오브)", "./Maplestory2/Custom/Equip/template_orb.png",undefined, 500],
    ["디자인 헌팅캡 (남)", "./Maplestory2/Custom/Equip/template_hunting_cap_M.png",undefined, 200],
    ["디자인 헌팅캡 (여)", "./Maplestory2/Custom/Equip/template_hunting_cap_F.png",undefined, 200],
    ["디자인 동물탈 (남)", "./Maplestory2/Custom/Equip/template_animal_hat_M.png",undefined, 200],
    ["디자인 동물탈 (여)", "./Maplestory2/Custom/Equip/template_animal_hat_F.png",undefined, 200],
    ["디자인 야구모자 (남)", "./Maplestory2/Custom/Equip/template_baseball_cap_M.png",undefined, 250],
    ["디자인 야구모자 (여)", "./Maplestory2/Custom/Equip/template_baseball_cap_F.png",undefined, 250],
    ["디자인 비니 (남)", "./Maplestory2/Custom/Equip/template_beanie_M.png",undefined, 250],
    ["디자인 비니 (여)", "./Maplestory2/Custom/Equip/template_beanie_F.png",undefined, 250],
    ["디자인 헬멧 (남)", "./Maplestory2/Custom/Equip/template_helmet_M.png",undefined, 200],
    ["디자인 헬멧 (여)", "./Maplestory2/Custom/Equip/template_helmet_F.png",undefined, 200],
    ["디자인 봉투 모자 (남)", "./Maplestory2/Custom/Equip/template_paper_bag_hat_M.png",undefined, 200],
    ["디자인 봉투 모자 (여)", "./Maplestory2/Custom/Equip/template_paper_bag_hat_F.png",undefined, 200],
    ["디자인 수영모자 (남)", "./Maplestory2/Custom/Equip/template_swimming_cap_M.png",undefined, 200],
    ["디자인 수영모자 (여)", "./Maplestory2/Custom/Equip/template_swimming_cap_F.png",undefined, 200],
    ["디자인 코트 (남)", "./Maplestory2/Custom/Equip/template_coat_M.png",undefined, 400],
    ["디자인 코트 (여)", "./Maplestory2/Custom/Equip/template_coat_F.png",undefined, 400],
    ["디자인 언밸런스(비대칭) 코트 (남)", "./Maplestory2/Custom/Equip/template_asymmetrical_coat_M.png",undefined, 400],
    ["디자인 언밸런스(비대칭) 코트 (여)", "./Maplestory2/Custom/Equip/template_asymmetrical_coat_F.png",undefined, 400],
    ["디자인 긴팔 원피스 (남)", "./Maplestory2/Custom/Equip/template_long_sleeve_dress_M.png",undefined, 400],
    ["디자인 긴팔 원피스 (여)", "./Maplestory2/Custom/Equip/template_long_sleeve_dress_F.png",undefined, 400],
    ["디자인 원피스 (남)", "./Maplestory2/Custom/Equip/template_dress_M.png",undefined, 400],
    ["디자인 원피스 (여)", "./Maplestory2/Custom/Equip/template_dress_F.png",undefined, 400],
    ["디자인 져지 (남)", "./Maplestory2/Custom/Equip/template_jersey_M.png",undefined, 400],
    ["디자인 져지 (여)", "./Maplestory2/Custom/Equip/template_jersey_F.png",undefined, 400],
    ["디자인 후드티 (남)", "./Maplestory2/Custom/Equip/template_hoodie_M.png",undefined, 300],
    ["디자인 후드티 (여)", "./Maplestory2/Custom/Equip/template_hoodie_F.png",undefined, 300],
    ["디자인 쫄티 (남)", "./Maplestory2/Custom/Equip/template_sleek_shirt_M.png",undefined, 200],
    ["디자인 쫄티 (여)", "./Maplestory2/Custom/Equip/template_sleek_shirt_F.png",undefined, 200],
    ["디자인 박시 티셔츠 (남)", "./Maplestory2/Custom/Equip/template_boxy_shirt_M.png",undefined, 200],
    ["디자인 박시 티셔츠 (여)", "./Maplestory2/Custom/Equip/template_boxy_shirt_F.png",undefined, 200],
    ["디자인 티셔츠 (남)", "./Maplestory2/Custom/Equip/template_T-shirt_M.png",undefined, 200],
    ["디자인 티셔츠 (여)", "./Maplestory2/Custom/Equip/template_T-shirt_F.png",undefined, 200],
    ["디자인 쫄바지 (남)", "./Maplestory2/Custom/Equip/template_tight_pants_M.png",undefined, 200],
    ["디자인 쫄바지 (여)", "./Maplestory2/Custom/Equip/template_tight_pants_F.png",undefined, 200],
    ["디자인 치마 (남)", "./Maplestory2/Custom/Equip/template_skirt_M.png",undefined, 300],
    ["디자인 치마 (여)", "./Maplestory2/Custom/Equip/template_skirt_F.png",undefined, 300],
    ["디자인 반바지 (남)", "./Maplestory2/Custom/Equip/template_pants_half_M.png",undefined, 200],
    ["디자인 반바지 (여)", "./Maplestory2/Custom/Equip/template_pants_half_F.png",undefined, 200],
    ["디자인 손모아 장갑 (남)", "./Maplestory2/Custom/Equip/template_mittens_M.png",undefined, 150],
    ["디자인 손모아 장갑 (여)", "./Maplestory2/Custom/Equip/template_mittens_F.png",undefined, 150],
    ["디자인 신발 (남)", "./Maplestory2/Custom/Equip/template_shoes_M.png",undefined, 150],
    ["디자인 신발 (여)", "./Maplestory2/Custom/Equip/template_shoes_F.png",undefined, 150],
    ["디자인 레인부츠 (남)", "./Maplestory2/Custom/Equip/template_rain_boots_M.png",undefined, 220],
    ["디자인 레인부츠 (여)", "./Maplestory2/Custom/Equip/template_rain_boots_F.png",undefined, 220],
    ["디자인 숏 망토", "./Maplestory2/Custom/Equip/template_short_cape.png",100000],
    ["디자인 책가방", "./Maplestory2/Custom/Equip/template_backpack.png",undefined, 250],
    ["디자인 망토", "./Maplestory2/Custom/Equip/template_cape.png",undefined, 250],
    ["디자인 가면 (남)", "./Maplestory2/Custom/Equip/template_mask_M.png",undefined, 200],
    ["디자인 가면 (여)", "./Maplestory2/Custom/Equip/template_mask_F.png",undefined, 200],



    //default design scheme in the MS2(for Construction)
    ["디자인 슬로프 큐브", "./Maplestory2/Custom/Cube/template_slope_cube.png",undefined, 50],
    ["디자인 삼각형 큐브", "./Maplestory2/Custom/Cube/template_triangle_cube.png",undefined, 50],
    ["디자인 아치형 큐브", "./Maplestory2/Custom/Cube/template_arch_type_cube.png",undefined, 50],
    ["디자인 아치 기둥 큐브", "./Maplestory2/Custom/Cube/template_arch_pillar_cube.png",undefined, 50],
    ["디자인 아치 천장 큐브", "./Maplestory2/Custom/Cube/template_arch_ceiling_cube.png",undefined, 50],
    ["디자인 사다리꼴 슬로프 큐브", "./Maplestory2/Custom/Cube/template_trapezoid_slope_cube.png",undefined, 50],
    ["디자인 사다리꼴 모서리 큐브", "./Maplestory2/Custom/Cube/template_trapezoid_edge_cube.png",undefined, 50],
    ["디자인 사다리꼴 기둥 큐브", "./Maplestory2/Custom/Cube/template_trapezoid_pillar_cube.png",undefined, 50],
    ["디자인 납작 원통 큐브", "./Maplestory2/Custom/Cube/template_broad_cylinder_cube.png",undefined, 50],
    ["디자인 카드 큐브", "./Maplestory2/Custom/Cube/template_card_cube.png",undefined, 100],
    ["디자인 3단 계단 큐브", "./Maplestory2/Custom/Cube/template_3-step_stairs_cube.png",undefined, 100],
    ["디자인 사각 기둥 하단 큐브", "./Maplestory2/Custom/Cube/template_square_pillar_base_cube.png",undefined, 100],
    ["디자인 사각 기둥 큐브", "./Maplestory2/Custom/Cube/template_square_pillar_cube.png",undefined, 100],
    ["디자인 원 기둥 큐브", "./Maplestory2/Custom/Cube/template_round_pillar_cube.png",undefined, 100],
    ["디자인 원뿔 나무(전등) 큐브", "./Maplestory2/Custom/Cube/template_lamp_cube.png",undefined, 100],
    ["디자인 소파 큐브", "./Maplestory2/Custom/Cube/template_sofa_cube.png",undefined, 100],
    ["디자인 사각 테이블 큐브", "./Maplestory2/Custom/Cube/template_rectangle_table_cube.png",undefined, 100],
    ["디자인 깃발 큐브", "./Maplestory2/Custom/Cube/template_flag_cube.png",undefined, 100],
    ["디자인 지붕 큐브", "./Maplestory2/Custom/Cube/template_roof_cube.png",undefined, 100],
    ["디자인 삼각 지붕 큐브", "./Maplestory2/Custom/Cube/template_triangle_roof_cube.png",undefined, 100],
    ["디자인 화단 큐브", "./Maplestory2/Custom/Cube/template_flower_garden_cube.png",undefined, 100],
    ["디자인 코너 파티션 큐브", "./Maplestory2/Custom/Cube/template_corner_partition_cube.png",undefined, 100],
    ["디자인 파티션 큐브", "./Maplestory2/Custom/Cube/template_partition_cube.png",undefined, 100],
    ["디자인 원목 침대 큐브", "./Maplestory2/Custom/Cube/template_wooden_bed_cube.png",undefined, 100],
    ["디자인 수납장 큐브", "./Maplestory2/Custom/Cube/template_dresser_cube.png",undefined, 100],
    ["디자인 의자 큐브", "./Maplestory2/Custom/Cube/template_chair_cube.png",undefined, 100],
    ["디자인 코너 테이블 큐브", "./Maplestory2/Custom/Cube/template_corner_table_cube.png",undefined, 100],
    ["디자인 바 테이블 큐브", "./Maplestory2/Custom/Cube/template_bar_table_cube.png",undefined, 100],
    ["디자인 바닥 판넬 큐브", "./Maplestory2/Custom/Cube/template_floor_panel_cube.png",undefined, 100],
    ["디자인 두루마리 장식 큐브", "./Maplestory2/Custom/Cube/template_scroll_decoration_cube.png",undefined, 100],
    ["디자인 큐브", "./Maplestory2/Custom/Cube/template_design_cube.png",undefined, 100],
    ["디자인 칸막이 큐브", "./Maplestory2/Custom/Cube/template_divider_cube.png",undefined, 100],
    ["디자인 투명(투과) 박스 큐브", "./Maplestory2/Custom/Cube/template_traversable_box_cube.png",undefined, 100],
    ["디자인 회전 큐브", "./Maplestory2/Custom/Cube/template_spinning_cube.png",undefined, 150],
    ["디자인 직각 큐브", "./Maplestory2/Custom/Cube/template_broad_rectangle_cube.png",undefined, 100],
    ["디자인 함정 큐브", "./Maplestory2/Custom/Cube/template_trap_door_cube.png",undefined, 150],
    ["디자인 계단 큐브", "./Maplestory2/Custom/Cube/template_stairs_cube.png",undefined, 100],
    ["디자인 원통 큐브", "./Maplestory2/Custom/Cube/template_cylinder_cube.png",undefined, 100],
    ["디자인 (사각)탁자 큐브", "./Maplestory2/Custom/Cube/template_square_table_cube.png",undefined, 100],
    ["디자인 책장 큐브", "./Maplestory2/Custom/Cube/template_bookcase_cube.png",undefined, 100],
    ["디자인 미니 액자 큐브", "./pictogram/locked.png",undefined, "???"], //not released template
    ["디자인 자동 회전 원통 큐브", "./pictogram/locked.png",undefined, "???"], //not released template
    ["디자인 원형 식탁", "./pictogram/locked.png",undefined, 500], //premium top designer only template
    ["디자인 침대", "./pictogram/locked.png",undefined, 500], //premium top designer only template
    
    
    //default design scheme in the MS2(Ridee)
    ["디자인 미니밴", "./Maplestory2/Custom/Ridee/template_minivan.png",undefined, 1090],
    ["디자인 지프", "./Maplestory2/Custom/Ridee/template_jeep.png",undefined, 990],
    ["디자인 에퀴리아", "./Maplestory2/Custom/Ridee/template_equirria.png",undefined, 990],
    ["디자인 네이키드 비스트", "./Maplestory2/Custom/Ridee/template_naked_beast.png",undefined, 990],
    ["디자인 보니토", "./Maplestory2/Custom/Ridee/template_bonito.png",undefined, 990],
    ["디자인 인티모", "./Maplestory2/Custom/Ridee/template_intimo.png",undefined, 1090],
    ["디자인 포크레인(굴착기)", "./Maplestory2/Custom/Ridee/template_excavator.png",undefined, 1090],
    ["디자인 레이싱 머신", "./Maplestory2/Custom/Ridee/template_racing_machine.png",undefined, 1090],
    ["탑 디자이너 광고 트럭", "./pictogram/locked.png",undefined, 100000] //premium top designer only template
];

let ms2_custom_palletes_paint_optimized_format = [
    ['p', 'pallete-title'],
    ['img','pallete-img']
]


let ms2_custom_palletes_paint_optimized_records=[
    //optimized design for distinguishing border of the area and no stucking to pour colour because of the aliased origin scheme.
    //default design scheme in the MS2(for Construction)
    ["디자인 슬로프 큐브", "./Maplestory2/Custom/optimized/template_slope_cube.png",undefined, 50],
    ["디자인 삼각형 큐브", "./Maplestory2/Custom/optimized/template_triangle_cube.png",undefined, 50],
    ["디자인 아치형 큐브", "./Maplestory2/Custom/optimized/template_arch_type_cube.png",undefined, 50],
    ["디자인 아치 기둥 큐브", "./Maplestory2/Custom/optimized/template_arch_pillar_cube.png",undefined, 50],
    ["디자인 아치 천장 큐브", "./Maplestory2/Custom/optimized/template_arch_ceiling_cube.png",undefined, 50],
    ["디자인 사다리꼴 슬로프 큐브", "./Maplestory2/Custom/optimized/template_trapezoid_slope_cube.png",undefined, 50],
    ["디자인 사다리꼴 모서리 큐브", "./Maplestory2/Custom/optimized/template_trapezoid_edge_cube.png",undefined, 50],
    ["디자인 사다리꼴 기둥 큐브", "./Maplestory2/Custom/optimized/template_trapezoid_pillar_cube.png",undefined, 50],
    ["디자인 납작 원통 큐브", "./Maplestory2/Custom/optimized/template_broad_cylinder_cube.png",undefined, 50],
    ["디자인 카드 큐브", "./Maplestory2/Custom/optimized/template_card_cube.png",undefined, 100],
    ["디자인 3단 계단 큐브", "./Maplestory2/Custom/optimized/template_3-step_stairs_cube.png",undefined, 100],
    ["디자인 사각 기둥 하단 큐브", "./Maplestory2/Custom/optimized/template_square_pillar_base_cube.png",undefined, 100],
    ["디자인 사각 기둥 큐브", "./Maplestory2/Custom/optimized/template_square_pillar_cube.png",undefined, 100],
    ["디자인 원 기둥 큐브", "./Maplestory2/Custom/optimized/template_round_pillar_cube.png",undefined, 100],
    ["디자인 원뿔 나무(전등) 큐브", "./Maplestory2/Custom/optimized/template_lamp_cube.png",undefined, 100],
    ["디자인 소파 큐브", "./Maplestory2/Custom/optimized/template_sofa_cube.png",undefined, 100],
    ["디자인 사각 테이블 큐브", "./Maplestory2/Custom/optimized/template_rectangle_table_cube.png",undefined, 100],
    ["디자인 깃발 큐브", "./Maplestory2/Custom/optimized/template_flag_cube.png",undefined, 100],
    ["디자인 지붕 큐브", "./Maplestory2/Custom/optimized/template_roof_cube.png",undefined, 100],
    ["디자인 삼각 지붕 큐브", "./Maplestory2/Custom/optimized/template_triangle_roof_cube.png",undefined, 100],
    ["디자인 화단 큐브", "./Maplestory2/Custom/optimized/template_flower_garden_cube.png",undefined, 100],
    ["디자인 코너 파티션 큐브", "./Maplestory2/Custom/optimized/template_corner_partition_cube.png",undefined, 100],
    ["디자인 파티션 큐브", "./Maplestory2/Custom/optimized/template_partition_cube.png",undefined, 100],
    ["디자인 원목 침대 큐브", "./Maplestory2/Custom/optimized/template_wooden_bed_cube.png",undefined, 100],
    ["디자인 수납장 큐브", "./Maplestory2/Custom/optimized/template_dresser_cube.png",undefined, 100],
    ["디자인 의자 큐브", "./Maplestory2/Custom/optimized/template_chair_cube.png",undefined, 100],
    ["디자인 코너 테이블 큐브", "./Maplestory2/Custom/optimized/template_corner_table_cube.png",undefined, 100],
    ["디자인 바 테이블 큐브", "./Maplestory2/Custom/optimized/template_bar_table_cube.png",undefined, 100],
    ["디자인 바닥 판넬 큐브", "./Maplestory2/Custom/optimized/template_floor_panel_cube.png",undefined, 100],
    ["디자인 두루마리 장식 큐브", "./Maplestory2/Custom/optimized/template_scroll_decoration_cube.png",undefined, 100],
    ["디자인 큐브", "./Maplestory2/Custom/optimized/template_design_cube.png",undefined, 100],
    ["디자인 칸막이 큐브", "./Maplestory2/Custom/optimized/template_divider_cube.png",undefined, 100],
    ["디자인 투명(투과) 박스 큐브", "./Maplestory2/Custom/optimized/template_traversable_box_cube.png",undefined, 100],
    ["디자인 회전 큐브", "./Maplestory2/Custom/optimized/template_spinning_cube.png",undefined, 150],
    ["디자인 직각 큐브", "./Maplestory2/Custom/optimized/template_broad_rectangle_cube.png",undefined, 100],
    ["디자인 함정 큐브", "./Maplestory2/Custom/optimized/template_trap_door_cube.png",undefined, 150],
    ["디자인 계단 큐브", "./Maplestory2/Custom/optimized/template_stairs_cube.png",undefined, 100],
    ["디자인 원통 큐브", "./Maplestory2/Custom/optimized/template_cylinder_cube.png",undefined, 100],
    ["디자인 (사각)탁자 큐브", "./Maplestory2/Custom/optimized/template_square_table_cube.png",undefined, 100],
    ["디자인 책장 큐브", "./Maplestory2/Custom/optimized/template_bookcase_cube.png",undefined, 100],
    ["디자인 미니 액자 큐브", "./pictogram/locked.png",undefined, "???"], //not released template
    ["디자인 자동 회전 원통 큐브", "./pictogram/locked.png",undefined, "???"], //not released template
    ["디자인 원형 식탁", "./pictogram/locked.png",undefined, 500], //premium top designer only template
    ["디자인 침대", "./pictogram/locked.png",undefined, 500], //premium top designer only template
];

let ms2_wallpapers = new DictData("월페이퍼", ms2_wallpaper_tag_formats, ms2_wallpaper_records,"ms2-dict-represent-area");
let ms2_bgms = new DictData("배경음악",ms2_bgm_records_format,ms2_bgm_records,"ms2-dict-represent-area");
let ms2_included_palletes_origin = new DictData("공방도안 (기본제공)", ms2_included_palletes_origin_format, ms2_included_palletes_origin_records, "ms2-dict-represent-area");
let ms2_custom_palletes_origin = new DictData("공방도안 (원본)", ms2_custom_palletes_origin_format, ms2_custom_palletes_origin_records, "ms2-dict-represent-area");

let ms2_custom_palletes_paint_optimized = new DictData("공방도안 (그림판 최적화)", ms2_custom_palletes_paint_optimized_format, ms2_custom_palletes_paint_optimized_records, "ms2-dict-represent-area");
let ms2_dict_collections = new DictCollection(ms2_wallpapers, ms2_bgms, ms2_included_palletes_origin, ms2_custom_palletes_origin,ms2_custom_palletes_paint_optimized);
window.onload = function (e) {
    ms2_dict_collections.representData();
    //ms2_bgms.representData();
    // ms2_bgms.clearTags();
}