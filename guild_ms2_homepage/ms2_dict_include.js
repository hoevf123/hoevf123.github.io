
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
