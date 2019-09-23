// JavaScript source code


var WordObj = function (line,col,content) {
    this.line = line;
    this.col = col;
    this.content = content;
}

var Keyword = function (name) {
    this.name = name;
}
var Operator = function (name) {
    this.name = name;
}
var Brace = function (leftPair, rightPair) {
    this.leftPair = leftPair;
    this.rightPair = rightPair;
}
var Dummy = function (content) {
    this.content = content;
}
var Space = function (content) {
    this.content = content;
}
var EscapeWord = function (name) {
    this.name = name;
}


function parseStrToCodeBlock(str) {
    var registeredStringBrace = [new Brace("\"","\"")];
    var registeredEscapeWord = ["\\"];
    var registeredBrace = [new Brace("[", "]"), new Brace("{", "}"), new Brace("(",")"), new Brace("Begin", "End")];
    var registeredKeyword = [new Keyword("var"), new Keyword("var"), new Keyword("var"), new Keyword("var")];
    var registeredOperator = ["=", "+", "-", "*", "/", "%", "?", ":", "&", "|", "^"];
    var originStr = str;
    var decFirst = 0;
    var results = [];


    var returnObject = [new WordObj(0,0,str)];
    var state = 0;
    //1. find string set
    var pair = undefined;
    
    for (var i = 0, startIdx=0; i < str.length; i++) {
        for (var idx_str_brace = 0; idx_str_brace < registeredStringBrace.length; idx_str_brace++) {
            if (pair === undefined) {
                if (str[i] == registeredStringBrace[i].leftPair[0]) {
                    startIdx = i;
                    /* Check Brace is Equal */
                    var idx_lp = 0;
                    for(; idx_lp<registeredStringBrace[idx_str_brace].leftPair.length; idx_lp++){
                        if (str[startIdx + idx_lp] !== registeredStringBrace[idx_str_brace].leftPair[idx_lp])
                            break;
                    }
                    if (idx_lp !== registeredStringBrace[idx_str_brace].leftPair.length)
                        continue;
                    else{
                        pair = registeredStringBrace[i].leftPair;
                    }
                }
            }
            else {
                
            }
        }
    }


    for (var i = 0; i < str.length; i++) {
        if (originStr[i] == ' ')
            continue;
        switch (state) {
            //First Decoding
            case 0:
                if (originStr[i] >= 0x30)
                    state = 1;
                break;
            case 1:
                /*if (originStr == '<')
                    state = "tag_left";*/
                if(originStr)
                break;
            case 2:
                break;
            case "tag_left":
                break;
            default:
                break;
        }
    }
}

var myBrain = function(){
    this.state = 0;
    this.mainloop = function () {
        

    }
}