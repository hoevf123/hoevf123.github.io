function createTag(element_name, class_name="", value=""){
    element_name = String(element_name)||"";
    let _tag = document.createElement(String(element_name));
    _tag.className = class_name;
    _tag.value = value;
    switch(element_name){
        case "input": _tag.name = value; break;
        default:_tag.innerText=value;break;
    }
    return _tag;
}