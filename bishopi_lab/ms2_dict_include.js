
class DictData {
    constructor(typename, tuple_tag_format, tuple_datas, represent_tag_target) {
        this.typename = typename;
        this.tuple_tag_format = tuple_tag_format; //[["p", "foo-class"], ["img", "bar-class"], ...]
        this.datas = tuple_datas; // ["hello", "temp-https://about:blank", ...]
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

            function temp_something(arr){
                return Array.prototype.reduce.call(arr,function(a,c,i){return a;},[]);
            }


            // 1. make dict-result(root) div tag.
            let tag_root = CreateTag("div","dict-result " + this.typename);

            // 2. make cells in data results
            let tag_dictdatas = [];
            for(let idx_datas = 0 ; idx_datas < this.datas.length ; idx_datas++){
                let c = this.datas[idx_datas];
                let tuple_tag_format = this.tuple_tag_format;
                // forced data to Array type.
                let target_data_arr = c;
                //let tuple_tag_format = this.tuple_tag_format;
                if(!(target_data_arr instanceof Array)) target_data_arr = [target_data_arr];

                // 2-1. make root cell of each div tag.
                let tag_cell_root = CreateTag("div", "dict-data", "");
                tag_cell_root.addEventListener("click",(function(){
                    //this : tag_cell_root, it change states of dict-data selected or not.
                    let str_selected_className = "selected";
                        if(this.classList.contains(str_selected_className))this.classList.remove(str_selected_className);
                        else this.classList.add(str_selected_className);
                    }).bind(tag_cell_root)
                );

                // 2-2. insert data to HTMLElement in the head cell tag
                // function name "asd" has no meaning.
                function asd(target_tag_root, target_tag_type, target_tag_className, target_data){
                    let ret_tag = undefined;
                    if(target_data === undefined){
                        
                    }
                    else if(target_data instanceof Array){
                        let _inside_tag = CreateTag("div", target_tag_className);
                        target_data.forEach((e)=>{asd(_inside_tag, target_tag_type, target_tag_className, e);});
                        if(!(_inside_tag.hasChildNodes()))ret_tag = undefined;
                        else ret_tag = _inside_tag;
                    }
                    else if(target_data instanceof Object){
                        // convert dict type to array classname format and array data(s)
                        let _inside_tag = CreateTag("div", target_tag_className);
                        let key_names = Object.keys(target_data);
                        let tagFramewithDatas = Array.prototype.reduce.call(key_names, function(a, c, i){
                            // c = name of keynames, used as className
                            a.push([String(target_tag_type), String(c), target_data[c]]);
                            return a;
                        }, []);
                        tagFramewithDatas.forEach(function(e){
                            return asd(_inside_tag, e[0], e[1], e[2]);
                        });
                        ret_tag = _inside_tag;
                    }
                    else{
                        ret_tag = CreateTag(target_tag_type, target_tag_className, String(target_data));
                    }

                    if(ret_tag instanceof HTMLElement) {
                        if(target_tag_root instanceof HTMLElement) target_tag_root.appendChild(ret_tag);
                        return ret_tag;
                    }
                    else return;
                }
                target_data_arr.forEach(function(data_cell, idx_data_cell){
                    if(tuple_tag_format[idx_data_cell] instanceof Array){
                        let tag_name = tuple_tag_format[idx_data_cell][0] || tag_name;
                        let tag_className = tuple_tag_format[idx_data_cell][1] || tag_className;
                        asd(tag_cell_root, tag_name, tag_className ,data_cell);
                    }
                });
                
                console.log(tag_cell_root);
                // return completly made cell tag.
                if(tag_cell_root instanceof HTMLElement) tag_dictdatas.push(tag_cell_root);
            }; 

            // 3. combine dict-data tags into (master) dict-result.
            tag_dictdatas.forEach((e)=>tag_root.appendChild(e));
            // 3. represent combined tag datas to represent area(s).
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
