/**
 * Created by hoevf_000 on 2014-10-12.
 */
function number_pad(number)
{
    var textbox = document.getElementById("value");
    textbox.value+=String(number);
}
function number_pad_delete()
{
    var textbox = document.getElementById("value");
    var temptext = textbox.value.split("");
    temptext.pop();
    textbox.value=temptext.join("");
}
function toggle_number_pad_appear()
{
    var number_pad = document.getElementById("number_pad");
    var status = document.getElementById("number_pad_status");
    if("숫자패드 접기"===status.value)
    {
        number_pad.style.display="none";
        status.value = "숫자패드 펼치기";
    }
    else if("숫자패드 펼치기"===status.value)
    {
        number_pad.style.display="inline";
        status.value = "숫자패드 접기";
    }
    else
    {
        number_pad.style.display="inline";
        status.value = "숫자패드 접기";
    }
}

function number_pad_clear()
{
    var textbox =document.getElementById("value");
    textbox.value="";
}
function qunn_arr_decode(num,ndigit)
{
    if(typeof num != "number")return -1;
    var index=0;
    var digit = 2;
    var result=[];
//    for(ndigit=1;num>ndigit*digit;ndigit*=digit)console.log("ndigit : "+ndigit);
   //ndigit : max_digit
    for(index=0;ndigit>=1;index++,ndigit/=digit)
    {
        result[index]=Math.floor((num%(ndigit*digit)/(ndigit)));
    }
    return result;
}
function test() {
    var ndigit=1;
    var power=0;
    var digit =2;
    var arr_i;
    var arr_j;
    var arr_index;
    var arr_k;
    var arr_l;
    var a;
    var arr_indexcomp;
    var count = 0;
    var arr_count = 0;
    var stack_count=0;
    var full_stack_count=1;
    var arr = [];
    var temp;
    var number = [];
    var table_str="";
    arr[0] = [];

    var numvalue = document.getElementById("value").value;
    console.log("numvalue : "+ numvalue);

    number = numvalue.split(",");
    console.log("number : "+number);
    for(arr_count=0;arr_count<number.length;arr_count++)
        number[arr_count]=Number(number[arr_count]);
    for(arr_count=0;arr_count<number.length;arr_count++)
        for(;number[arr_count]>=ndigit*digit;ndigit*=digit,power++);
    console.log("number.length : "+number.length);
    for(arr_count=0;arr_count<number.length;arr_count++)
        arr[0][arr_count]=qunn_arr_decode(number[arr_count],ndigit);
    console.log("ndigit : "+ndigit+ " power : "+ power);
    arr_count=0;

    console.log("arr.length : "+arr[0].length);
    console.log("=============== 0차 간략화 ================");
    for(arr_index = 0 ; arr_index<arr[0].length;arr_index++)
    {
        console.log("arr[0]["+arr_index+"] = "+arr[0][arr_index]);
    }
    console.log("==========================================");

    for(arr_k=0;arr_k<ndigit;arr_k++) {
        full_stack_count=0;
        arr[(arr_k+1)] = [];
        for (arr_i = 0; arr_i < arr[arr_k].length; arr_i++)
        {
            for (arr_j = 0; arr_j < arr[arr_k].length; arr_j++)
            {
                count = 0;//initialize
                for (arr_index = 0; arr_index <= power; arr_index++)
                {
                    if (arr[arr_k][arr_i][arr_index] !== arr[arr_k][arr_j][arr_index])
                    {
//                        console.log((arr[arr_k][arr_i][arr_index]+"!=="+ arr[arr_k][arr_j][arr_index]));
                        count++;
                    }
                }
//                console.log("count 값 : "+count);
//                console.log("[스택] arr_count : " + arr_count);
                if (count == 1)
                {
                    arr[(arr_k + 1)][arr_count] = [];
                    for(arr_index=0;arr_index<=power;arr_index++)
                        arr[(arr_k + 1)][arr_count][arr_index] = arr[arr_k][arr_j][arr_index];
                    for (arr_index = 0; arr_index <= power; arr_index++)
                    {
                        if (arr[arr_k + 1][arr_count][arr_index] != arr[arr_k][arr_i][arr_index])
                        {
                            arr[(arr_k + 1)][arr_count][arr_index] = '_';
                            arr_count++;
                            stack_count++;
                            break;
                        }
                        else ;
                    }
                    for(arr_l=0;arr_l<arr_count-1;arr_l++)
                    {
                        count=0;
                        for (arr_index = 0; arr_index <= power; arr_index++)
                        {
                            if (arr[(arr_k + 1)][arr_count-1][arr_index] === arr[(arr_k + 1)][arr_l][arr_index])
                            {
                                count++;
                            }
                        }
                        if(count===(power+1)) {
                            arr[(arr_k+1)].length--;
                            arr_count--;
//                            console.log("arr["+(arr_k+1)+"]["+arr_l+"] = "+ arr[(arr_k + 1)][arr_l]+"과 일치함.");
//                            console.log("arr["+(arr_k+1)+"]["+arr_count+"] = "+ arr[(arr_k + 1)][arr_count]+"제거 과정이 진행되었음.");
                            delete arr[arr_k + 1][arr_count];
                            break;
                        }
                    }
                }
                else ;
            }
            if (stack_count == 0)
            {
                arr[(arr_k+1)][arr_count]=[];
                for(arr_index=0;arr_index<=power;arr_index++)
                    arr[(arr_k+1)][arr_count][arr_index] = arr[arr_k][arr_i][arr_index];
                arr_count++;
            }
            else
            {
                full_stack_count++;
            }
            stack_count = 0;

        }
        console.log("Full Stack Count : "+ full_stack_count +" arr_count : "+ arr_count+ " Stack Count : "+ stack_count);
        if(full_stack_count==0)break;
        else;
        //1차 간략화 완료

        console.log("========== "+(arr_k+1)+"차 간략화 (총 "+arr[arr_k+1].length+"개)=========");
        for (arr_index = 0; arr_index < arr[(arr_k+1)].length; arr_index++) {
            console.log("arr["+(arr_k+1)+"]["+arr_index+"] = "+arr[(arr_k+1)][arr_index]);
        }
        console.log("=========================================");

        arr_count=0;
    }

    //finished invesigating cells

    var table = document.getElementById("qunn_mc_result");
    table.style.display="none";

    for(arr_j=0;arr_j<arr[arr_k].length;arr_j++)
    {
        table_str+="<style>\ntable#qunn_mc_result,table#qunn_mc_result td{border:1px solid #000000;}td{text-align:center}\ntd.checked{background-color:#ccdd00;}\ninput{text-align:center;}</style>\n";
        table_str+="<tr>\n";
        table_str+="<td>"+arr[arr_k][arr_j]+"</td>\n";
        table_str+="<td><input size = 2></td>\n";

        for (arr_i = 0; arr_i < number.length; arr_i++)
        {
            temp=qunn_arr_decode(number[arr_i],ndigit);
            count=0;
            for(arr_index=0;arr_index<arr[arr_k][arr_j].length;arr_index++)
            {
                if (arr[arr_k][arr_j][arr_index] === "_")continue;
                if (temp[arr_index] !== arr[arr_k][arr_j][arr_index])count++;
            }
            if(count==0)table_str+="<td class=\"checked\">V</td>\n";
            else table_str+="<td class = \"unchecked\"></td>\n";
        }
        table_str+="</tr>\n";
    }
    table_str+="<tr>\n";
    table_str+="<td>진리표</td>\n<td>주항</td>\n";

    for(arr_i=0;arr_i<number.length;arr_i++)
        table_str+="<td><input size = 2></td>\n";

    table_str+="</tr>\n";
    table_str+="<tr>\n";
    table_str+="<td rowspan = 2></td>\n<td>체크</td>\n";

    for(arr_i=0;arr_i<number.length;arr_i++)
        table_str+="<td name='check_bottom'><input size = 2></td>\n";

    table_str+="</tr>\n";
    table_str+="<tr>\n";
    table_str+="<td>숫자</td>\n";
    for(arr_i=0;arr_i<number.length;arr_i++)
        table_str+="<td>"+ number[arr_i]+"</td>\n";
    table_str+="</tr>\n";
    console.log(table_str);
    table.innerHTML=table_str;

    //table treat statement set area





    table.style.display="inline";


    //qunn_mc sheet insert end


    /*
    *       arr_i ->
    *
    * arr_j
    * ||
    * v
    * */

/*
     for(arr_i=0;arr_i<table.getElementsByName("check_bottom").length;arr_i++)
    {
        for(arr_j=0;arr_j<table.getElementsByTagName("<tr>").length;arr_j++)
        table.querySelectorAll("<tr>");
    }
*/
}