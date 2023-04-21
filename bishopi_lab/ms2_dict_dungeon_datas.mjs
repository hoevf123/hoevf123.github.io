// 더미 데이터로만 남겨두겠습니다.
import {temp_dungeon_datas} from "./ms2_datawarehouse_dungeon_datas.mjs";

let ms2_dungeon_tagtypes=[["p","ms2-dungeon-type ms2-dictdata-title"],["p","ms2-dungeon-name ms2-dictdata-title"],["p","ms2-require-level"],["p","ms2-minimum-require-players"],["p","ms2-maximum-require-players"],["p","ms2-dungeon-enter-condition"],["p","ms2-dungeon-description"],["p","ms2-dungeon-release-date"],["p","ms2-dungeon-closed-date"]];
let ms2_flacibo_dungeon_tagtypes=[["p","dungeon-type"],["p","dungeon-name"],["p","require-level"],["p","minimum-require-players"],["p","maximum-require-players"],["p","dungeon-enter-condition"],["p","dungeon-description"],["p","dungeon-release-date"],["p","dungeon-closed-date"]];

let ms2_dungeon_datas = temp_dungeon_datas.reduce((a,c,i)=>{
    let _arr = [c?.["dungeonType"], c?.["dungeonName"], c?.["requireLevel"], c?.["minimumRequirePlayers"], c?.["maximumRequirePlayers"],c?.["dungeonEnterCondition"], c?.["dungeonDescription"], c?.["dungeonClosedDate"]];
    a.push(_arr);
    return a;
},[]);


let ms2_dungeon_categorized_datas = ms2_dungeon_datas.reduce((a,c)=>{Array.isArray(a[c[0]]) ? a[c[0]].push(c) : a[c[0]]=[c]; return a;},{}); //categorized as dungeon-type(s) using dict(object type as javascript) type
let ms2_dictdata_dungeon_datas = new DictData("전체", ms2_dungeon_tagtypes, ms2_dungeon_datas, "ms2-dict-represent-area"); //create full dungeon info dictdata (to use as see full dungeon infos when page is opened first with header title position)
let ms2_dict_categorized_dictdatas = Object.keys(ms2_dungeon_categorized_datas).reduce((a,c)=>{a.push(new DictData(c,ms2_dungeon_tagtypes,ms2_dungeon_categorized_datas[c], "ms2-dict-represent-area")); return a},[ms2_dictdata_dungeon_datas]); //categorized dictdatas creation with behinds to the original dictdatas
let ms2_dict_collections = new DictCollection(...ms2_dict_categorized_dictdatas); //create dictcollection with categorized dictdatas(flattening the dictdata array to using as arguments)


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

let ms2_mydungeon = ms2_dungeon_datas.reduce((a,c)=>{Array.isArray(c) ? a.push(c.reduce((acc,cul,idx)=>{acc[barToUppercase(ms2_flacibo_dungeon_tagtypes[idx][1])]=cul; return acc;},{})): undefined; return a;}, []);
/* release under two lines when if you don't want categorize dungeon types and just want to see only full dungeon infos */
//let ms2_dictdata_dungeon_datas = new DictData("던전", ms2_dungeon_tagtypes, ms2_dungeon_datas);
//let ms2_dict_collections = new DictCollection(ms2_dictdata_dungeon_datas);

window.onload = function (e) {
    ms2_dict_collections.representData();
    //ms2_bgms.representData();
    //ms2_bgms.clearTags();
}