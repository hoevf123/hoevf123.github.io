/* THIS SCRIPT REQUIRE  ms2_character_attack_status.js, createTag.js as PRE-REQUESTICS. */

class MS2DamageChecker{
    constructor(target_div_classname, target_tag_update_area){
        this.target_tag_update_area = target_tag_update_area;
        this.connector_player_tag_form = {
            //note : input default value or array of valueset

            // options of Attacking, speed.
            class: jobs,
            weaponQuality: Object.keys(WeaponQualityBAModifier),
            weaponAttack: 10767,
            bonusAttack: 0,
            petAttack: 0,
            phyAttack: 13,
            magAttack: 343,
            piercing: 0,
            phyPiercing: 0,
            magPiercing: 0,
            accuracy: 84,
            critRate: 136,
            critRateLimitIgnore: 0,
            critDamage: 167,
            critDamageLimitIgnore: 0.0,
            typedDamage: {
                melee: 0.0,
                ranged: 0.0,
                fire: 0,
                ice: 0,
                electric: 0,
                poison: 0,
                dark: 0,
                holy: 0,
                boss: 4.0,
                total: 0.0,
            },
            healSkillEffect : 0.0,
            HPhealSkillEffectReduction : 0.0,
            attackSpeed: 105.0,
            skillCooltimeReduction: 0,
            humanAttack:0.0,
            
            //options of Defense 
            defense : 0.0,
            phyResistance : 0.0,
            magResistance : 0.0,
            avoidance : 0.0,
            critAvoidance:0.0,
            meleeDamageReduction:0.0,
            rangedDamageReduction: 0.0,
            meleeDamageReduction: 0.0,
            rangedDamageReduction: 0.0,
            fireDamageReduction: 0,
            iceDamageReduction: 0,
            electricDamageReduction: 0,
            poisonDamageReduction: 0,
            darkDamageReduction: 0,
            holyDamageReduction: 0,
            completeDefense :0,
            completeAvoidance : 0,
            inactivityTimeReduction : 0,
            stateMalfunctionTimeReduction : 0,
            HPRecovery : 0,
        }
        let _default_player_tag_form = {
            //note : input default value or array of valueset
            class: "Priest",
            weaponQuality: "Ascendant",
            weaponAttack: 193943,
            bonusAttack: 2930,
            petAttack: 154,
            phyAttack: 13,
            magAttack: 1160,
            piercing: 31.5,
            phyPiercing: 5.5,
            magPiercing: 19.2,
            accuracy: 120,
            critRate: 316,
            critDamage: 168.7,
            critDamageLimitIgnore: 0.0,
            typedDamage: {
                melee: 0.0,
                ranged: 0.0,
                fire: 0,
                ice: 0,
                electric: 1.5,
                poison: 0,
                dark: 0,
                holy: 5.1,
                boss: 47.0,
                total: 0.0,
            },
            attackSpeed: 119.0,
            skillCooltimeReduction: 0,
            humanAttack:0.0,
        }

        // tag name wrapper
        let _default_tagname_kor_form = {
            //note : input default value or array of valueset
            class: "직업",
            weaponQuality: "등급",
            weaponAttack: "무기 공격력",
            bonusAttack: "전투력",
            petAttack: "펫 공격력",
            phyAttack: "물리 공격력",
            magAttack: "마법 공격력",
            piercing: "방어력 관통",
            phyPiercing: "물리 저항력 관통",
            magPiercing: "마법 저항력 관통",
            accuracy: "명중",
            critRate: "크리티컬 확률",
            critRateLimitIgnore: "크리티컬 확률(제한무시)",
            critDamage: "크리티컬 대미지",
            critDamageLimitIgnore: "크리티컬 대미지(제한무시)",
            typedDamage: {
                melee: "근접 대미지 증가",
                ranged: "원거리 대미지 증가",
                fire: "화염 대미지 증가",
                ice: "냉기 대미지 증가",
                electric: "전격 대미지 증가",
                poison: "독 대미지 증가",
                dark: "암흑 대미지 증가",
                holy: "신성 대미지 증가",
                boss: "보스 몬스터 공격 시 대미지 증가",
                total: "총 대미지 증가",
            },
            attackSpeed: "공격속도",
            healSkillEffect : "회복 스킬 효과 증가",
            HPhealSkillEffectReduction : "HP 회복 스킬 효과 감소",
            skillCooltimeReduction: "스킬 쿨타임 감소",
            humanAttack: "대인 공격력",


            // defencse options
            defense : "방어력",
            phyResistance : "물리 저항력",
            magResistance : "마법 저항력",
            avoidance : "회피",
            critAvoidance: "크리티컬 회피",
            meleeDamageReduction: "근접 대미지 감소",
            rangedDamageReduction: "원거리 대미지 감소",
            fireDamageReduction: "화염 대미지 감소",
            iceDamageReduction: "냉기 대미지 감소",
            electricDamageReduction: "전격 대미지 감소",
            poisonDamageReduction: "독 대미지 감소",
            darkDamageReduction: "암흑 대미지 감소",
            holyDamageReduction: "신성 대미지 감소",
            completeDefense :"완전 방어",
            completeAvoidance : "완전 회피",
            inactivityTimeReduction : "행동 불능 시간 감소",
            stateMalfunctionTimeReduction : "상태 이상 시간 감소",
            HPRecovery : "HP 재생력",
        }

        //create input form
        this.connector_player_tag_connection = this.generatePlayerAttackCheckForm(target_div_classname,this.connector_player_tag_form, _default_tagname_kor_form)[1];

        //create output form
        this.updateData(_default_player_tag_form);

        //activate onchange

    }
    updateData(target_object){
        function UpdateDataToTagElement(target_reflect, target_value){
            console.log("find : ", target_reflect, "value : " , target_value);
            if(target_reflect === undefined || target_value === undefined)console.log("found Nothing");
            else if(target_reflect instanceof HTMLElement){
                let _tag = target_reflect;
                let value = target_value;    
                let _cl_tagname = String(_tag.tagName).toLowerCase();
                switch(_cl_tagname){
                    case "select":
                    case "input":
                        _tag.value=value;
                        break;
                    default:
                        _tag.innerText=value;
                        break;
                }
            }
            else if(target_reflect instanceof Object && target_value instanceof Object){
                for(let a in target_value){
                    console.log("finding start, a :", a);
                    UpdateDataToTagElement(target_reflect[a], target_value[a]);
                }
            }
        }
        UpdateDataToTagElement(this.connector_player_tag_connection, target_object);
    }
    updateDamage(){
        if(this.target_tag_update_area instanceof HTMLElement){
            let dmg = this.calculate()
            let _cl_tagname = String(this.target_tag_update_area.tagName).toLowerCase();
            switch(_cl_tagname){
                case "select":
                case "input":
                    this.target_tag_update_area.value=String(dmg);
                    break;
                default:
                    this.target_tag_update_area.innerText=String(dmg);
            }
        }
    }
    calculate(){
        let player_status = function ObjecetDOMToObjectValue(target_obj){
            let ret_obj = {};
            for(let a in target_obj){
                function getValueFromTag(target_tag){
                    if(!(target_tag instanceof HTMLElement)) return undefined;
                    let tag_name = String(target_tag.tagName).toLowerCase();
                    let ret_val = "";
                    switch(tag_name){
                        case "select":
                        case "input":
                            if(target_tag.type=="number")
                                ret_val = Number(target_tag.value);
                            else
                                ret_val = String(target_tag.value);
                            break;
                        default:
                            ret_val = String(target_tag.innerText);
                            break;
                    }
                    return ret_val;
                }
                if(target_obj[a] instanceof HTMLElement){
                    ret_obj[a]=getValueFromTag(target_obj[a]);
                }
                else{
                    //it's object(nested) hiarchy
                    ret_obj[a]=ObjecetDOMToObjectValue(target_obj[a]);
                }
            }
            return ret_obj;
        }(this.connector_player_tag_connection);
        return calc(player_status);
    }
    generatePlayerAttackCheckForm(target_tagname, connector_player_tag_sample, tag_sample_tagalias = undefined){
        let target_tags = document.getElementsByClassName(target_tagname);
        if(target_tags === undefined) return;

        function CreateSomething(connector_player_tag_sample, tag_sample_tagalias){
            let assembled_tags = [];
            let connector_player_tag_connection = {};            
            for(const arg_name in connector_player_tag_sample){
                let object_stack = [];
                

                // create header tag
                let _tag_string_alias = (tag_sample_tagalias?.[arg_name] === undefined || tag_sample_tagalias[arg_name] instanceof Object) ? arg_name : tag_sample_tagalias[arg_name];
                let header_tag = createTag("p", "object-key " + new String(arg_name), _tag_string_alias);
                let content_tag = null;
                let arg_content = connector_player_tag_sample[arg_name];
                let arg_content_type =typeof(arg_content);
                console.log("Current Seeing content : ", arg_content);
                if(!(arg_content_type == "number" || arg_content_type == "object" || arg_content_type == "string"))continue;


                if(arg_content instanceof Array){
                    //create select box list
                    let tag_selectbox = createTag("select",arg_name);
                    let tag_options = Array.prototype.reduce.call(arg_content,function(a,c){
                        a.push(createTag("option",arg_name,c));
                        return a;
                    },[]);
                    //insert options to selectbox
                    tag_options.forEach(element => {
                        tag_selectbox.appendChild(element);
                    });
                    //indicates content tag
                    content_tag = tag_selectbox;
                }
                else if(typeof(arg_content) == "number" || typeof(arg_content) == "string"){ 
                    let tag_inputbox = createTag("input",arg_name, arg_content);
                    if(typeof(arg_content) == "number") tag_inputbox.type="number";
                    //indicates content tag
                    content_tag = tag_inputbox;
                }
                else{
                    //nested object(s)
                    let tag_div = createTag("div",new String(arg_name));
                    let ret_vals = CreateSomething(arg_content, tag_sample_tagalias?.[arg_name]);
                    let ret_tagset = ret_vals[0];
                    let ret_connetor_player_tag_connection = ret_vals[1];
                    if(ret_vals instanceof Array){
                        ret_tagset.forEach((e)=>tag_div.appendChild(e));
                        connector_player_tag_connection[arg_name]=ret_connetor_player_tag_connection;
                        content_tag =tag_div;
                    }
                    
                }
                
                //insert tag when acontent tag is well created
                console.log("header_tag", header_tag, "content_tag " , content_tag);
                if(header_tag instanceof HTMLElement && content_tag instanceof HTMLElement){
                    if(connector_player_tag_connection[arg_name]===undefined)
                        connector_player_tag_connection[arg_name]=content_tag;
                    // create container div tag of key-value set.
                    let container_tag = createTag("div","object-key-value-set " + new String(arg_name));
                    [header_tag, content_tag].forEach(e=>container_tag.appendChild(e));
                    assembled_tags.push(container_tag);
                }
            }

            return [assembled_tags, connector_player_tag_connection];
        }
        
        let ret_vals = CreateSomething(connector_player_tag_sample, tag_sample_tagalias);
        let assembled_tags = ret_vals[0];
        let connector_player_tag_connection = ret_vals[1];
        //attatch the created form
        console.log(assembled_tags);
        Array.prototype.forEach.call(target_tags,
        function(e){
            assembled_tags.forEach(function(a){
                e.appendChild(a);
            });
        });
        console.log("got object tree : ", connector_player_tag_connection);
        return [assembled_tags, connector_player_tag_connection];
    }
}

//connector of tag


//create auto inputbox or select box to generate
let className_generate_area = "ms2-damage-check-generating-area";
let tag_dmg_result = document.getElementsByClassName("ms2-damage-calculated-result")[0];
let ms2_attack_gen = new MS2DamageChecker(className_generate_area, tag_dmg_result);
