class ItemCreator{
    constructor(target_div, item_infos, item_storage){
        this.domCreationDiv = null;
        this.item_infos = item_infos;
        this.item_storage = item_storage;
    }
    attatchCreatingFunction(){
        if(this.domCreationDiv instanceof HTMLElement){
            let dom_select = document.createElement("select");
            
        }
    }
}
class Item{
    constructor(itemDefinition, quantity = 0, item_property={}){
        this.itemDefinition = itemDefinition;
        this.quantity = new Number(quantity); //type as Number
        this.property = new Object(item_property); // type as Object.
    }
    get id(){return this.itemDefinition?.id;}
    get name(){return this.itemDefinition?.name;}
}
class ItemSlot{
    constructor(target_item){

    }
    get contain_item(){ return this._contained_item;}
    set contain_item(target_item){ this._contained_item = target_item instanceof Item ? target_item : undefined;}
    get quantity(){ return Array.from(contain_item).reduce((a,c,i)=>a=a+c,0);}
}
class ItemInventory{
    constructor(slot_size = 0, ...items){
        let i_slot_size = slot_size >= 0 ?new Number(slot_size) : 0; 
        this.slots = [...Array(slot_size).map(x=>new ItemSlot())];
        this.emptySlots = [...this.slots];
        this.itemdicts = {}; // item type serarch dictionary
    }
    insertItem(...items){
        function insertItemtoInventory(target_item, target_slot){
           return true;
        }
        console.log("activated insertItem");
        let self = this;
        return new Promise(function (resolve, reject){
            let result = Array.from(items).reduce(function(a,e){
                console.log("item insert, " + e);
                // 아이템 타입의 클래스가 아니면 아이템 삽입 거부.
                if(!(e.constructor === Item)){
                    console.log("rejected inserting item");
                    a.failure.push(e);
                }

                // 삽입할 아이템 슬롯을 저장하는 변수, null : 더 이상 삽입할 아이템 슬롯 없음.
                let target_slot = null; 

                // 아이템이 사전에 등록되어 있으면, 삽입 위치 소환.
                if(self.itemdicts[e.itemDefinition] != undefined){
                    console.log("same item found in your item Inventory.");
                }

                // 아이템 삽입
                let re = insertItemtoInventory(e);
                console.log(`Item ${e} Inserted`);
                a.success.push(e);
                return a;
            }, {success : [], failure : []});
            console.log("success : " + result.success + ", fail : " + result.failure);
            resolve(result);
        })
    }
    get length(){return this.slots.length;}
}


class DOMItemUpdator{
    constructor(...domElements){
        this.domElements=[];
        domElements.forEach((e)=>{ e instanceof HTMLDOMElement ? this.domElements.push(e): undefined;});
        // 내장 태그 만들기
        this.domOption = document.createElement("select");  //아이템 목록
    }
    update(){
        //등록된 태그의 목록들을 업데이트.
        domElements.forEach((e)=>{
              
        })
    }
}


let dismantle_items_slot = [...Array(10).keys()].map(x=>new ItemSlot());
let character_inventory_slot = [...Array(10).keys()].map(x=>new ItemSlot());
let ITEMIMAGE_DIR = "./pictogram";
// represent tag
let div_ms2_creator = Array.from(document.getElementsByClassName("ms2-item-create")).reduce((a,c,i) => a = a.concat(Array.from(c.getElementByTagName("div")), []));
let ms2_item_infos = [
    {item_id : 2300001, name:"파이어 프리즘 모자", reqLevel:70, imgSrc:`${ITEMIMAGE_DIR}/item_fire_prism_hat.png`, maxStack : 1},
    {item_id : 2300002, name:"파이어 프리즘 장갑", reqLevel:70, imgSrc:`${ITEMIMAGE_DIR}/item_fire_prism_gloves.png`, maxStack : 1},
    {item_id : 2300003, name:"파이어 프리즘 신발", reqLevel:70, imgSrc:`${ITEMIMAGE_DIR}/item_fire_prism_shoes.png`, maxStack : 1},
    {item_id : 2300004, name:"파이어 프리즘 상의", reqLevel:70, imgSrc:`${ITEMIMAGE_DIR}/item_fire_prism_shirt.png`, maxStack : 1} ,
    {item_id : 2300005, name:"파이어 프리즘 하의", reqLevel:70, imgSrc:`${ITEMIMAGE_DIR}/item_fire_prism_pants.png`, maxStack : 1},
    {item_id : 2300006, name:"파이어 프리즘 홀", reqLevel:70, imgSrc:`${ITEMIMAGE_DIR}/item_fire_prism_scepter.png`, maxStack : 1},

];
let item_user = new ItemInventory(14);
let FirePrism_ItemCreator = new ItemCreator(div_ms2_creator , ms2_item_infos);
item_user.insertItem(new Item(ms2_item_infos[0],1,{"메이플":"무야호"}));