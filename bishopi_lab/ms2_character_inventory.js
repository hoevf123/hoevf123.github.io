

/* items */
class ItemSlot{
    constructor(itemInfo, itemAmount, attatchedDOM){
        this.itemInfo=itemInfo;
        this.itemAmount=itemAmount; // integer or array of integer/object(with property) amount.
        this.attatchedDOM = attatchedDOM;
    }
    getAmount(){
        let sum_amount = 0;
        function getAmount_variant(value){
            let ret_val = 0;
            if(value instanceof Number)ret_val = itemAmount;
            else if(value instanceof String)ret_val = Number(itemAmount);
            else if(this.itemAmount instanceof Array){
                ret_val=this.itemAmount.reduce(function getSumofArray(a,c,i){
                    return a = a + getAmount_variant(c);
                })(0);
            }
            else if(value instanceof Object){
                if(value.amount !== undefined){
                    let value_getted = getAmount_variant(value.amount);
                    if(value_getted !== undefined) ret_val = value_getted;
                }
            }
            // no need else phrase.
            return ret_val;
        }
        
        sum_amount = getAmount_variant(this.itemAmount);
        return sum_amount;
    }
}


class ItemInventory{
    constructor(...target_div_tags){
        this.items = [];
        this.representTargetTags = [];
        this.itemColumnsinRow = 8;
        this.addRepresentTargetTags(...target_div_tags);
    }
    createItemSlot(times){
        if(times <= 0 || times == NaN || times === undefined) times = 0;
        (function repeatFunc(target_func, args, times){
            for(let i = 0; i< times ; i++){
                if(args instanceof Array) target_func(...args) ;
                else target_func(args);
            }
        })(()=>this.items.push(new ItemSlot()) , [],  times);
    }
    insert(target_items){
        if(!(target_items instanceof Array)) target_items = [target_items];
        let items_idx = 0;
        let itemSlot_idx = 0;
        for(;(itemSlot_idx < this.items.length && items_idx < target_items.length);itemSlot_idx++){
            let target_itemSlot = this.items[itemSlot_idx];
            let target_item = target_items[items_idx];
            if(target_itemSlot === undefined) continue;
            if(target_itemSlot.itemInfo !== undefined)continue;
            else{
                target_itemSlot.itemInfo = target_item;
                if(target_item.itemAmount !== undefined) target_itemSlot.itemAmount = target_item.itemAmount;
                else target_itemSlot.itemAmount = 1;
                items_idx++;
            }
        }
    }
    addRepresentTargetTags(...target_div_tags){
        let inserting_array = this.representTargetTags;
        Array.from(target_div_tags).forEach((e)=>inserting_array.push(e));
    }
    representTag(){
        function CreateTag(tag_name, tag_className){
            let ret_tag = document.createElement(String(tag_name));
            if(tag_className !==undefined) ret_tag.className = String(tag_className);
            return ret_tag;
        }
        if((function isArrayEmpty(target_arr){return Array.isArray(target_arr) ? !target_arr.length == 0 : false;})(this.representTargetTags)){
            let ret_root = CreateTag("div", "ms2-inventory equipment");
            let _items_DOMElement = [];
            Array.from(this.items).forEach(function(e){
                if(e instanceof ItemSlot){
                    let _tag_item_slot = e.attatchedDOM;
                    if(_tag_item_slot === undefined || _tag_item_slot === null){
                        function itemslot_mouseRightclickEvent(e){
                            e.preventDefault();
                            let target_itemSlot = e.target.targetItemSlot;
                            if(target_itemSlot instanceof ItemSlot){
                                target_itemSlot.itemInfo = undefined; // erase item info
                                target_itemSlot.itemAmount = undefined; //empty all of item
                                delete e.target.dataset.itemName;
                            }
                        }
                        //item slot creation if connected tag empty
                        _tag_item_slot = CreateTag("div", "ms2-item-slot");
                        _tag_item_slot.targetItemSlot = e;
                        _tag_item_slot.addEventListener('contextmenu', itemslot_mouseRightclickEvent);
                        //item info insert at the tag
                        if(e.itemInfo !== undefined && e.itemInfo !== null){
                            _tag_item_slot.dataset.itemName = e.itemInfo.itemName;  
                            _tag_item_slot.draggable="true";
                            e.attatchedDOM = _tag_item_slot;
                        }
                    }
                    if(_tag_item_slot instanceof HTMLElement) _items_DOMElement.push(_tag_item_slot);
                    
                }
            });
            
            for(let i = 0, putting_row_items = null; i< _items_DOMElement.length ; i++){
                if(i % this.itemColumnsinRow == 0){
                    putting_row_items = CreateTag("div");
                    ret_root.appendChild(putting_row_items);
                }
                let _target_DOMitem = _items_DOMElement[i];
                console.log(_target_DOMitem);
                putting_row_items.appendChild(_target_DOMitem);
            }

            Array.from(this.representTargetTags).forEach(function(e){if(e instanceof HTMLElement){
                (function emptyDOM(e){if(e instanceof HTMLElement) e.innerHTML = "";})(e);
                e.appendChild(ret_root);
            } });
        }
    }
}


let character_inventory = new ItemInventory(...Array.from(document.getElementsByClassName("ms2-character-equipment-generating-area")));
character_inventory.createItemSlot(24);

class CharacterEquippedStatus{
    constructor(...DOM_HTMLDivElements){
        this.attatchedDOMs=[];
        this.attatchDOM(DOM_HTMLDivElements);
        this.equip_types = ["weapon", "subweapon", 
        "shirt", "pants", "headgear", "gloves", "shoes",
        "neckless", "earings", "rings", "belt", "cape"
        ];
        this.equipped = equip_types.reduce(function(a,c,i){a[c] = null; return a;} , new Object());
    }
    attatchDOM(...DOMTags){
        DOMTags.forEach(function(e){
            if(e instanceof HTMLDivElement) this.attatchedDOMs.push(e);
        });
    }
    equip(...items){
        
    }
    disequip(...itemTypes){
        itemTypes.forEach((function(e){
            //itemEquipSet={this.equipped.keys()}
        }).bind(this));
    }
}

const HAT_ADDITIONAL_OPTION_SETS = [
    {optionName : "STR", priority : 1, groupId : 1},
    {optionName : "DEX", priority : 2, groupId : 1},
    {optionName : "크리티컬 회피", priority : 3},
    {optionName : "INT", priority : 3, groupId : 1},
    {optionName : "LUK", priority : 4, groupId : 1},
    {optionName : "HP", priority : 5},
    {optionName : "공격력", priority : 6},
    {optionName : "물리 저항력", priority : 7},
    {optionName : "마법 저항력", priority : 8},
    {optionName : "명중", priority : 10},
    {optionName : "회피", priority : 11},
    {optionName : "행동 불가 시간 감소", priority : 12},
    {optionName : "근접 대미지 감소", priority : 13},
    {optionName : "원거리 대미지 감소", priority : 14},
    {optionName : "냉기 대미지 감소", priority : 16},
    {optionName : "보스 몬스터 공격 시 대미지 증가", priority : 17, groupId : 1},
    {optionName : "화염 대미지 감소", priority : 17},
    {optionName : "암흑 대미지 감소", priority : 18},
    {optionName : "처치 시 HP 회복", priority : 18},
    {optionName : "신성 대미지 감소", priority : 19},
    {optionName : "독 대미지 감소", priority : 20},
    {optionName : "전격 대미지 감소", priority : 21},
]



const FIRE_PRISM_WEAPON_DISMANTLE = [{itemName : "fire prism weapon box piece", amount : 10} , {itemName : "prism stone", amount : 2}];
const WEAPON_DISMANTLE = [{itemName : "Chaos Onyx Fragment", amount : {Normal : 0, Rare : 0, Unique : 0, Exceptional : 3, Legendary : 4, Ascendant : 5}}, {itemName : "Onyx Fragment", amount : 500}];
const FIRE_PRISM_EQUIPMENT_DEFAULT_PROPERTY = {itemName : "fire prism scepter", itemType : "scepter", itemGrade:"Ascedent", itemAmount : {characterBind : 1}, reqLv: 70, options: [{minDamage : 108014, maxDamage : 129371, itemScore : 42147}] ,enchantGrade : 15, limitBreakGrade : 42, additionalDismantleResult : FIRE_PRISM_WEAPON_DISMANTLE };
const FIRE_PRISM_SCEPTER = {...FIRE_PRISM_EQUIPMENT_DEFAULT_PROPERTY, options: [{minDamage : 108014, maxDamage : 129371, itemScore : 42147}], additionaloptions : [{critRate : 11 , holy : 2.6, magPiercing : 5.6}], additionalDismantleResult : FIRE_PRISM_WEAPON_DISMANTLE};
const FIRE_PRISM_CODEX = { ...FIRE_PRISM_EQUIPMENT_DEFAULT_PROPERTY, itemName : "fire prism codex", itemType : "codex", itemAmount : {characterBind : 1}, reqLv: 70, reqClass: "Preist" ,enchantGrade : 15, limitBreakGrade : 42, options: [{minDamage : 108014, maxDamage : 129371, itemScore : 42147}], additionaloptions : [{critRate : 11 , holy : 2.6, magPiercing : 5.6}], additionalDismantleResult : FIRE_PRISM_WEAPON_DISMANTLE}
character_inventory.insert([
    {...FIRE_PRISM_SCEPTER},
    {...FIRE_PRISM_SCEPTER},
    {...FIRE_PRISM_SCEPTER},
    {...FIRE_PRISM_SCEPTER},
    {...FIRE_PRISM_CODEX},
    {...FIRE_PRISM_CODEX},
]);
character_inventory.representTag();