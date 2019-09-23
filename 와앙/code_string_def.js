// JavaScript source code
var DependentTree = function Dependent() {

}
var Variable = function Variable(name, type, value) {

}
var Dummy = function Dummy(value) {

}
var CodeString = function CodeString(line, col, content) {
    this.line = line;
    this.col = col;
    this.content = content;
}
function tokening(str) {
    var results = [];
    var start_idx = 0;
    var end_idx = 0;
    var line = 0;
    var col = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] == '\n') {
            end_idx = i;
            results.push(new CodeString(line, col, str.substring(start_idx, end_idx)));
            start_idx = i + 1;
            line = line + 1;
            col = 0;
        }
        else if (i == str.length - 1) {
            end_idx = i;
            results.push(new CodeString(line, col, str.substring(start_idx, end_idx)));
        }
    }
    return results;
}