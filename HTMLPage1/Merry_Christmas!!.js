/**
 * Created by hoevf_000 on 2014-12-25.
 */


var progress_storage=[];
var progress_page_min=0;
var progress_page_max=0;

var user=function(username,imgSrc,ownedMoney,paidMoney)
{
    this.name=username;
    this.imgSrc=imgSrc;
    this.ownedMoney=ownedMoney;
    this.paidMoney=paidMoney;
}
var authority=function(_name,_property)
{
    //private:
    var name;
    var property;
    var constructor = authority;
    //public: //invalid modifying variables. just get it.
    this.getName=function(){return name};
    this.getProperty=function(){return property;};
}
var printer=function(name,address,port,colorType,lovename)
{
    this.adress=address;
    if(this.adress===undefined)this.adress="0.0.0.0";
    this.name=name;
    if(this.name===undefined)this.name="";
    this.port=port;
    if(this.port===undefined)this.port=0;
    this.colorType=colorType;//type : black, color, 3d(supposed to be);
    if(this.colorType===undefined)this.colorType="none";
    this.readyState=undefined;
    this.availSize ={a4:"available",b4:undefined};
    this.connected=undefined
    this.availColor={color:"available"};
    this.lovename=lovename;
    this.authority_list=[];
}
var owner= new user("노란메론","resources/profile_melon_yellow.png");
var user_logined = new user("오프라인 유저");
var printer_storage=[];

var progress=function(_user,_printer)
{
//    if(_printer===undefined)
//    {
//       alert("프린터가 선택되지 않았습니다.");
//        return false;
//    }
    this.userData = new user(user_logined.name,user_logined.imgSrc,user_logined.ownedMoney,user_logined.paidMoney);
    this.printerInfo = new printer(printer_storage[0].name,printer_storage[0].adress,printer_storage[0].port,printer_storage[0].colorType,printer_storage[0].lovename);
    this.fileType="text";
    this.files=[];
    for(var i=0;i<document.getElementById("button_file_add").files.length;i++)
        this.files.push(document.getElementById("button_file_add").files[i]);
}

document.getElementById("page_info").innerHTML=owner.name+"님의 Print Page";

function add_file(_user,_printer)
{
    if(document.getElementById("button_file_add").value==="")return false;
    /* private(only this function block available) function : callback file asking */
    function final_warning()
    {
        var str="";
        str+="경고\n\n당신은 다음과 같은 파일을 선택하셨습니다.\n";
        str+="선택한 파일의 개수:"+document.getElementById("button_file_add").files.length+"개\n\n";
        for(var i = 0 ;i<document.getElementById("button_file_add").files.length;i++) {
            str += (i + 1) + ". " + document.getElementById("button_file_add").files[i].name + "\n";
            str += "크기 : "+document.getElementById("button_file_add").files[i].size +" Byte "+ "\n";
        }
        str+="\n\n정말로 인쇄하시겠습니까?";
        return confirm(str);
    }
    if(final_warning()===false)return false;
    var temp_progress = new progress();
 //   if(owner.name!==user_logined.name)
 //   {
//        alert("프린트 권한이 없습니다");
//        document.getElementById("button_file_add").files=undefined;
//        document.getElementById("button_file_add").value="";
//        return false;
//    }
    progress_storage.push(new progress());
    var str ="";
    str+='<div><img src="';
    if(user_logined.imgSrc==undefined)str+='resources/profile_default.png';
    else str+=user_logined.imgSrc;
    str+='"><span><label class = "printer_name">'+progress_storage[progress_storage.length-1].printerInfo.name+'</label>';
    if(progress_storage[progress_storage.length-1].printerInfo.lovename!==undefined)str+='<label>('+progress_storage[progress_storage.length-1].printerInfo.lovename+")</label>";
    str+='<label class = "userName">'+ progress_storage[progress_storage.length-1].userData.name+'</label></span><br><span><label class = "file_name">'+progress_storage[progress_storage.length-1].files[0].name;
    if(progress_storage[progress_storage.length-1].files.length>1)str+='외 '+ ((progress_storage[progress_storage.length-1].files.length)-1)+'개';
    str+='</label><label class="file_type">'+progress_storage[progress_storage.length-1].files[0].type+'</label><label class="file_size">';
    //Array.prototype.reduce.apply(progress_storage[progress_storage.length-1].files,function(pv,v,i,arr){return v+=arr[i].size},0);
    var total_size=0;
    for(var i=0;i<progress_storage[progress_storage.length-1].files.length;i++)
        total_size+=progress_storage[progress_storage.length-1].files[i].size;
    str+=total_size+'Byte'+'</label></span></div>';
    document.getElementById("progress_block").innerHTML+=str;
    document.getElementById("button_file_add").value="";//Initialize
    //readFile(progress_storage[progress_storage.length-1].files[0],"EUC-KR");
};

function objcpy(obj1,obj2) //copy object's all value
{
    obj1 = new Object();
    for(var arr in obj2)
    {
        if((typeof objcpy[arr])==="Object")
        {
            objcpy(obj1[arr],obj2[arr]);
        }
        else obj1[arr]=obj2[arr];
    }
}
function btn_file_upload()
{
    document.getElementById("button_file_add").click();
    add_file();
}

//print_selector displaying Initialize
/* replaced instead of main function */
function user_login_release()
{
    document.getElementById("login_button").removeEventListener("click",user_login_release);
    document.getElementById("login_button").addEventListener("click",user_login);
    document.getElementById("user_id").innerText=document.getElementById("user_id").value="아이디";
    document.getElementById("login_id").style.display="inline";
    document.getElementById("user_password").style.display="inline";
    document.getElementById("login_password").style.display="inline";
    document.getElementById("login_id").addEventListener("keydown",password_enter);
    document.getElementById("login_password").addEventListener("keydown",password_enter);
}

function user_logout()
{
    user_logined=new user("오프라인 유저");
    document.getElementById("user_id").innerText=document.getElementById("user_id").value=user_logined.name;
    document.getElementById("login_button").removeEventListener("click",user_logout);
    document.getElementById("login_button").addEventListener("click",user_login_release);
    document.getElementById("login_button").innerText="로그인";
}

function user_login()
{
    /* if login failed */
    if(document.getElementById("login_id").value.length<4)
    {
        if(document.getElementById("login_id").value.length<=0)
        {
            document.getElementById("login_button").removeEventListener("click",user_login);
            document.getElementById("login_button").addEventListener("click",user_login_release);
            document.getElementById("user_id").innerText=document.getElementById("user_id").value=user_logined.name;
            document.getElementById("login_id").style.display="none";
            document.getElementById("user_password").style.display="none";
            document.getElementById("login_password").style.display="none";
            document.getElementById("login_button").removeEventListener("click",user_login);
            document.getElementById("login_button").addEventListener("click",user_login_release);
            return;
        }
        else alert("아이디는 4자리 수 이상으로 지어주세요.");
        return false;
    }
    /* if login trial were succeed  */
    else
    {
        /* write down initializing things to wipe login area and all functions */
        document.getElementById("user_id").innerText=document.getElementById("user_id").value=document.getElementById("login_id").value;
        document.getElementById("login_id").value="";
        document.getElementById("login_password").value="";
        document.getElementById("login_id").removeEventListener("keydown",password_enter);
        document.getElementById("login_password").removeEventListener("keydown",password_enter);
        document.getElementById("login_button").removeEventListener("click",user_login);

        /* write down to add components and functions to show logout available situation */
        document.getElementById("login_button").addEventListener("click",user_logout);
        document.getElementById("login_id").style.display="none";
        document.getElementById("user_password").style.display="none";
        document.getElementById("login_password").style.display="none";
        document.getElementById("login_button").innerText="로그아웃";
        if(document.getElementById("user_id").innerText==="노란메론")window.user_logined=new user(document.getElementById("user_id").innerHTML,"resources/profile_melon_yellow.png");
        else window.user_logined=new user(document.getElementById("user_id").value);
    }
}
function read_file()
{
 //   var reader = new FileReader();
 //   reader.readAsText("authority_list.csv","UTF-8");
 //   document.getElementById("read_test").innerText=reader.result;

    var xmlhttp= new XMLHttpRequest();
    var fileName="authority_list.csv";
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4&&xmlhttp.status==200){
//            alert(xmlhttp.responseText);
            document.getElementById("read_test").innerHTML=xmlhttp.responseText;
        }
        else if(xmlhttp.readyState==4&&xmlhttp.status==404)
        {
            document.getElementById("read_test").innerHTML="접근 불가능";
        }
    }
    xmlhttp.open("GET",fileName);
    xmlhttp.send();
}
function distribute_file()
{

}
function disappear_window(time)
{
    if(time<0)document.getElementById("page_decoration").style.display=document.getElementById("page_printer").style.display=document.getElementsByTagName("footer")[0].style.display="none";
    else document.getElementById("page_decoration").style.display=document.getElementById("page_printer").style.display=document.getElementsByTagName("footer")[0].style.display="inline";
    document.getElementById("page_decoration").style.opacity=document.getElementById("page_printer").style.opacity=document.getElementsByTagName("footer")[0].style.opacity=new String(time/100);
}
function intro()
{
    var time =-1000;
    disappear_window(time);
    var h= setInterval(display_control,10);
    //출력할 문자의 설정
    var textarea_str=document.createElement("label");
    textarea_str.style.fontSize="2em";
    textarea_str.style.fontFamily="굴림체,gulim";
    textarea_str.style.position="absolute";
    textarea_str.style.backgroundPosition="50% 50%";
    textarea_str.style.opacity="0";
    //여기까지 출력할 문자의 설정 끝
    function display_control()
    {
        disappear_window(time);
        if(time==-1000)
        {
            textarea_str.innerText=owner.name+" 님의 Print Page\n\nVersion : 0.0.3";
            document.getElementsByTagName("body")[0].appendChild(textarea_str);
        }
        if(time>=-1000&&time<=-600)
        {
            textarea_str.style.opacity=new String(-((time/100+8)*(time/100+8))+2);
        }
        if(time==-600)
        {
            document.getElementsByTagName("body")[0].removeChild(textarea_str);
        }
        if(time==-500)
        {
            textarea_str.innerText="이 프로그램은 직접 광고와 간접 광고를 포함하고 있습니다.\n\n잘못된 프로그램 사용은 바람직하지 않습니다.";
            document.getElementsByTagName("body")[0].appendChild(textarea_str);
        }
        if(time>=-500&&time<=-100)
        {
            textarea_str.style.opacity=new String(-((time/100+3)*(time/100+3))+2);
        }
        time++;
        if(time==-100)document.getElementsByTagName("body")[0].removeChild(textarea_str);
        if(time>=100)clearInterval(h);
    }
}
//copied at internet site.
function readFile(file,encodingType){
    var handler;

    document.getElementById("read_test_file_name").innerText=file.name;
    alert(file.name);

//    document.getElementById("fileName").textContent = file.name;

//    document.getElementById("fileSize").textContent = file.size;



    var reader = new FileReader();

//    var encodeList = document.getElementById("encoding");


    var encoding;
    if(encodingType==undefined)encoding="utf-8";
    else encoding = encodingType;//encodeList.options[encodeList.selectedIndex].value;

    reader.readAsText(file, encoding);
//    reader.readAsArrayBuffer(file);
//    reader.readAsBinaryString(file);

    reader.onprogress = function ()
    {
        var display = document.getElementById("read_test");
        display.innerText = "읽는 중...";		// 읽은 파일
    }
    reader.onload = function(){
        var display = document.getElementById("read_test");
        display.textContent = reader.result + "\nresult 길이 : " + reader.result.length;		// 읽은 파일
        alert("파일 로드 완료");
    }
    reader.onerror = function(e){
        alert("읽기 오류:" + e.target.error.code);
        return;
    }
}
function password_enter(e)
{
    switch(e.keycode)
    {
        /* enter key input */
        case 13:
            user_login();//try to login
            break;
    }
}
function network_check()
{
    document.getElementById("network_status").innerText=navigator.onLine;
    read_file();
}
window.onload=function()
{
    intro();
    setInterval(network_check,10000);//you cannot break this timer
//    setInterval(intro,60000);
 //   document.getElementById("lan_connection_status").style.backgroundImage=url("resources/print_available.png");
    printer_storage.push(new printer("EPSON NX130 TX130","0.0.0.0","3","color","기본 프린터"));
    printer_storage.push(new printer("CANNON IR5076","0.0.0.0","8010","black"));
    for (var i = 0; i < printer_storage.length; i++) {
        var str = "";
        str += "<div>";
        if (printer_storage[i].connected === "connected")str += '<class = "printer_connection_status" img src="resources/print_available.png">';
        else str += '<img src="resources/print_not_available.png">';
        if (printer_storage[i].connected === "connected")
        {
            if (printer_storage[i].colorType === "color")str += '<img src="resources/color_ink_available.png">';
            else if (printer_storage[i].colorType === "black")str += '<img src="resources/black_ink_available.png">';
            else ;
        }
        else
        {
            if (printer_storage[i].colorType === "color")str += '<img src="resources/color_ink_not_available.png">';
            else if (printer_storage[i].colorType === "black")str += '<img src="resources/black_ink_not_available.png">';
            else ;
        }
        str += '<label class="printer_name">' + printer_storage[i].name + '</label>';
        if(printer_storage[i].lovename!=undefined)str+='<label>('+ printer_storage[i].lovename+')</label>';
        str+='<span class="buttonList">';
        if (printer_storage[i].availSize.a4 === "available")str += '<a onclick = (function(){document.getElementById("button_file_add").click();}());><img class = "button" src="resources/a4_button.png" ></a>';
        else str += '<img class = "button" src="resources/a4_not_available.png">';
        if (printer_storage[i].availSize.b4 === "available")str += '<a onclick = (function(){document.getElementById("button_file_add").click();}());><img class = "button" src="resources/b4_button.png"></a>';
        else str += '<img class = "button"src="resources/b4_not_available.png">';
        str += '</span></div>';
        document.getElementById("file_selector").innerHTML += str;
    }
    document.getElementById("button_file_add").addEventListener("click",function(){alert("경고 : 이 프로그램에는 다음과 같은 위험성이 있습니다.\n[업체 의뢰가 아닌 자체 판단에 의한 기준]\n\n- 선정성(☆★★)\n- 폭력성(☆☆★)\n- 공포(☆★★)\n- 사행성(★★★)\n- 범죄의 이용성(★★★)\n\n※※※※※※※※※※※ 확인 요망! ※※※※※※※※※※※※※\n\n이 행위는 상대방과의 관계가 악화될 수 있습니다.\n파일 선택을 하기 전에 반드시 인쇄 목적을 생각해주세요.\n\n※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※\n"+"\n현재 선택하신 프린터:EPSON NX130 TX130\n용지:A4\n색상:color")});
    document.getElementById("button_file_add").addEventListener("change",add_file);
    document.getElementById("login_button").addEventListener("click",user_login);

    /* decoration part */
//    read_file();
}
