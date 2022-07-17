// Class DataWareHouse 정의

export class DataWareHowse{
    constructor(){
        this.items={}
    }
    set(dict_keyworditems){
        Object.assign(this.items, dict_keyworditems);
    }
    get(...key_names){
        let multiple_argument_enable = true;
        if(key_names.length<=1) multiple_argument_enable = false;
        let ret_arrs = [];
        for(let key in key_names){
            key = key_names[key];
            let ret_val = undefined;
            try{
                key = new String(key);
                ret_val = this.items[key];
            }catch(e){console.log(e);}
            ret_arrs.push(ret_val);
        }
        ret_arrs = (multiple_argument_enable?ret_arrs:ret_arrs[0]); 
        return ret_arrs;
    }
}