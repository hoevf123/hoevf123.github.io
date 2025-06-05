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
        let target = document.getElementById(represent_tag_target);
        if(target) {
            target.innerHTML = "";
        }
    }
    representData(represent_tag_target) {
        if(represent_tag_target==undefined){
            represent_tag_target=this.represent_tag_target;
        }
        if (represent_tag_target!==undefined) {
            function CreateTag(tagFormat, content) {
                if (!Array.isArray(tagFormat)) {
                    const element = document.createElement(tagFormat);
                    if (content) {
                        element.textContent = content;
                    }
                    return element;
                }

                const [tagName, className, subTags] = tagFormat;
                const element = document.createElement(tagName);
                
                if (className) {
                    element.className = className;
                }

                if (content === undefined || content === null) {
                    return element;
                }

                // Handle special cases
                if (tagName === 'a' && className === 'link-addr') {
                    element.href = content;
                    element.textContent = content;
                }
                else if (tagName === 'img') {
                    element.src = content;
                    element.alt = '';
                }
                else if (tagName === 'audio') {
                    element.controls = true;
                    element.src = content;
                }
                else if (tagName === 'div' && className === 'pallete-cost' && Array.isArray(content)) {
                    const [price, currency] = content;
                    
                    const priceElement = document.createElement(subTags[0][0]);
                    priceElement.className = subTags[0][1];
                    priceElement.textContent = price.toLocaleString();
                    element.appendChild(priceElement);
                    
                    const currencyElement = document.createElement(subTags[1][0]);
                    currencyElement.className = `${subTags[1][1]} ${currency}`;
                    currencyElement.textContent = currency === 'meso' ? '메소' : '메릿';
                    element.appendChild(currencyElement);
                }
                else if (tagName === 'div' && (className === 'hash-tags' || className === 'pallete-tags') && Array.isArray(content)) {
                    content.forEach(tag => {
                        const span = document.createElement('span');
                        span.textContent = tag;
                        element.appendChild(span);
                    });
                }
                else if (tagName === 'a' && className === 'download-links' && Array.isArray(content)) {
                    content.forEach(link => {
                        const linkElement = document.createElement('a');
                        linkElement.href = link;
                        linkElement.textContent = link;
                        linkElement.className = 'download-link';
                        element.appendChild(linkElement);
                    });
                }
                else if (tagName === 'div' && className === 'bgm_filename') {
                    if (Array.isArray(content)) {
                        content.forEach(filename => {
                            const filenameElement = document.createElement('div');
                            filenameElement.className = 'filename-item';
                            filenameElement.textContent = filename;
                            element.appendChild(filenameElement);
                        });
                    } else {
                        element.textContent = content;
                    }
                }
                else if (tagName === 'a' && className === 'bgm_src') {
                    element.href = content;
                    element.textContent = content;
                    if (content.includes('maplestory2.nexon.com')) {
                        element.classList.add('reference-link');
                    } else {
                        element.classList.add('download-link');
                    }
                }
                else if (Array.isArray(content)) {
                    // Handle nested arrays recursively
                    content.forEach(item => {
                        if (subTags) {
                            const subElement = CreateTag(subTags, item);
                            if (subElement) {
                                element.appendChild(subElement);
                            }
                        } else {
                            const textNode = document.createTextNode(item);
                            element.appendChild(textNode);
                        }
                    });
                }
                else {
                    element.textContent = content;
                }

                return element;
            }

            let tag_root = document.createElement("div");
            tag_root.className = "dict-result " + this.typename;

            let tag_dictdatas = [];
            for(let idx_datas = 0 ; idx_datas < this.datas.length ; idx_datas++){
                let c = this.datas[idx_datas];
                let tuple_tag_format = this.tuple_tag_format;
                let target_data_arr = Array.isArray(c) ? c : [c];

                let tag_cell_root = document.createElement("div");
                tag_cell_root.className = "dict-data";
                tag_cell_root.addEventListener("click", function(){
                    let str_selected_className = "selected";
                    if(this.classList.contains(str_selected_className)) {
                        this.classList.remove(str_selected_className);
                    } else {
                        this.classList.add(str_selected_className);
                    }
                });

                target_data_arr.forEach((data_cell, idx_data_cell) => {
                    if(tuple_tag_format[idx_data_cell] instanceof Array) {
                        let tag_name = tuple_tag_format[idx_data_cell][0];
                        let tag_className = tuple_tag_format[idx_data_cell][1];
                        let subTags = tuple_tag_format[idx_data_cell][2];
                        const element = CreateTag([tag_name, tag_className, subTags], data_cell);
                        if(element) {
                            tag_cell_root.appendChild(element);
                        }
                    }
                });

                if(tag_cell_root.hasChildNodes()) {
                    tag_dictdatas.push(tag_cell_root);
                }
            }

            tag_dictdatas.forEach(e => tag_root.appendChild(e));

            let target = document.getElementById(represent_tag_target);
            if(target) {
                target.appendChild(tag_root);
            }
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
