/**
 * Created by hoevf_000 on 2014-10-09.
 */

//this js file is related to print page version 0.0.2 revision 2


var printpage ;
printpage.body = document.getElementById("body");
printpage.body.onload=function()
{
    this.str = "";
    this.str+= "<article><div id=\"print_page\"><h1>프린트 출력하기</h1>아직 작동되는 것이 없습니다.</div></article>";
    this.innerHTML(this.str);
};