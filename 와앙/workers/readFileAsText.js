function readFile(file,encodingType){
    var text = ""
    var reader = new FileReader();
    var encoding;
    if(encodingType==undefined)encoding="utf-8";
    else encoding = encodingType;//encodeList.options[encodeList.selectedIndex].value;
    reader.readAsText(file, encoding);

    reader.onprogress = function (){}
    reader.onload = function(){
        text = reader.result		// 읽은 파일
        self.postMessage(text);
    }
    reader.onerror = function(){
        self.postMessage("read fail");
    }
    
}
self.onmessage = function(e){
    var file = e.data.file;
    var encodingType = e.data.encodingType;
    readFile(file,encoding);
}