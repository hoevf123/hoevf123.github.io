/**
 * ReCreated by kim on 2019-02-20.
 * Reused and Refactored From Previous Blog's Blog Record.
 * Link : http://blog.naver.com/hoevf123/220627851289
 *
 *
 * Modified Value - 2017-02-25
 * 0. Blocked And Distributed Codes. And Then Little Code Refactored.
 *  -> Grouped As Sequence "Global Variable" , "Object Definitions" , "Object Manipulations", "Stuff(Dummy) Functions".
 *  -> Block Style Used As Grouping Codes Like Under Format.
 *     {
 *          ...
 *     }
 *
 *     And Then function Style Modified Like Under Format.
 *     function xxx(arg...)
 *     {
 *          ...
 *     }
 *     To
 *     function xxx(arg...){
 *          ...
 *     }
 *
 *
 *
 * 1. Swapped Code of onXXX event method of CustomScreen Object
 *    For Maintaining Read Consistency of Value's Status.
 *
 *  -----  Previous   ------
 *  _customObject.onclick(event);<-- Changed eventTransparent Status
 *  if(_customObject.eventTransparent!==true)eventActivated=true; <-- Changed eventTransparent Status Occur Immediately.(Read Consistency Error)
 *
 *  -----   Current   ------
 *  if(_customObject.eventTransparent!==true)eventActivated=true; <-- Okay For Read Consistency.
 *  _customObject.onclick(event); <-- Safe For After Change eventTransParent Status.
 *
 *
 *  2. Fixed Bug From onXXX Code.
 *  if(_customObject.eventTransparent!==true)eventActivated=false; <-- Wrong.
 *  if(_customObject.eventTransparent!==true)eventActivated=true; <-- Okay.
 *
 *
 * Appended Method 'remove()' of CustomObject Object To remove Objects.
 */
/**
  * Created by hoevf on 2015-11-11. Wed.
  * Notice : This Module Javascript Code is Only for Canvas Object Definition.
  * Target : main.html for as
  */
//CustomObject Class declaration

/**
  *  Notice!!
  *
  *  this.FunctionName=function(Arguments...)
  *  {
         *  }// Means Public Function (You Can Access)
  *
  *  function FunctionName(Arguments...)
  *  {
         *  }// Means Private Function (You Can't Access, Only Used ForInner Object)
  *
  *
  */
/* Variable Definition */
{
    //VARIABLE DECLARATION PART
    var CustomObjectList=[];//Stack-Structure Data
    var CustomObjectList_Wait=[];//only stored as Object index
    var CustomObjectList_Pointer=[];//Sorted By Index, Just Pointing For Viewing, Event, Etc.
}

/* CustomObject Object Definition */
{
    class CustomObject{
        constructor(){
            this.allocatedCustomObjectList;
            this.allocatedCustomObjectList_Wait;
            this.constructor=CustomObject;
            this.id=0;
            this.name="undefined";
            this.type="undefined";
            this.hp=1;
            this.lineWidth=0.5;
            this.x=0;/* middle of Object's x Position */
            this.y=0;/* middle of Object's y Position */
            this.speed_x=0;/* speed, pixel per second of Object's x Position */
            this.speed_y=0;/* speed, pixel per second of Object's y Position */
            this.width=0;/* Object's width */
            this.height=0;/* Object's height */
            this.imgSrc="";/* (optional) imageSrc, displaying image for */
            this.fillStyle="red";
            this.strokeStyle="black";
            this.display=false;/* distinguish this object appears(imagically) */
            this.visibility=false;/* Hide Object, Existed */
            this.direction=1;/* Object's direction, left to right : 1, right to left : -1 */
            this.deadsign=undefined;/* Last Hit causion Traced variable by String */
            /* Useless Variable */
            this.left=this.x-this.width/2;
            this.right=this.x+this.width/2;
            this.top=this.y-this.height/2;
            this.bottom=this.y+this.height/2;
            this.property=undefined;
            /* Useless Variable End*/
            /* Object's Canvas Context Variable */
            this.shadowOffsetX=0;
            this.shadowOffsetY=0;
            this.shadowBlur=0;
            this.shadowColor="transparent";
            this.globalAlpha=1;
            /* Object's Canvas Context Variable End */
            this.text=this.name;
            this.font="14pt 궁서체"
            this.attackcool=0; /* Important : Cannot Attack Time Remain (Per Miliseconds), Used for Hit Protection, CustomObject's Animation, ETC... */
            this.movePatternHandler=undefined;
            this.zIndex=undefined;/* Useless, used for Priority of CustomObjectList's show sequence */
            this.eventTransparent=false;/* Ablity(able) of throughouting mouse EventListener Activating */
            this.objectPoint=new Array();/* Useless, CustomObject's drawLinePoint */
            this.onmove = function(){}; /* Act When Object Moves */
            /* Abstract event functions(about Objects), THESE EVENT FUNCTION ARE MUST BE OVERRIDDEN!!(replaced only one function) */
            /* Notice : this.onclick ~ this.onmouseup function definition is setted by default, for using trace of CustomObject's Mouse Event */
            /* Important : this function variables are managed from CustomScreen's EventListener Timer */
            this.onclick=function(event)
            {
                /* show mouse's position when this CustomObject is clicked */
                console.log(this.name +"(id : "+this.id+")"+ " : onclick EventListener Occured!! ("+event.offsetX+","+event.offsetY+")");
            }
            this.onmousemove=function(event){ }
            this.onmousedown=function(event){ }
            this.onmouseup=function(event){ }
        }
        /* function displayName : display imformation of CustomObject's id, CustomObject's name, CustomObject's hp , Used Only at Debugging */
        displayName(context) {
            var str="name : "+this.name+" id : "+this.id + "("+Math.round(this.x)+", "+Math.round(this.y)+")"+" hp : "+this.hp;
            var top=this.y-this.height/2;
            context.font=this.font;
            context.textAlign="center";
            context.textBaseline="bottom";
            context.strokeStyle="rgb(192,192,192)"
            context.fillStyle="green";
            context.lineWidth=1;
            context.fillText(str,this.x,top);
            context.strokeText(str,this.x,top);
        }

        /* SetInterval Handler Function, determine How to move CustomObject's Position */
        move(time){
            time/=1000;
            this.x+=this.speed_x*time;
            this.y+=this.speed_y*time;
            if((this.speed_x != 0 || this.speed_y != 0) && this.onmove != undefined )
                this.onmove();
        }

        /* Useless, Delete All objectPoint's Parameter */
        objectPointClear()
        {
            console.log(this.name+" : objectPoint Clear Function Activated!!");
            var i=this.objectPoint.length;
            for(;i>0;i++)
                this.objectPoint.pop();
            console.log(this.name+" : objectPoint Clear Function Finished!!")
        }
        /* Distinguish another Object is in CustomObject's Area */
        isObjectIn(x,y,width,height,closePathTrue)
        {
            //x : Center of CustomObject XPosition
            //y : Center of CustomObject YPosition
            //width : all of CustomObject Width (left : x-width/2, right : x+width/2)
            //height : all of CustomObject Height (top : y-height/2). bottom : y+height/2)
            //closePathTrue : Consider All Paths Boundaries Are Surrounded(like context.closePath();, context.fill();), false is default.
            //            if(this.objectPoint.length<2)return; /* if(ObjectPoint is called line, dot, Not Exist) escape this method */
            var idx;/* asd */
            var isIn=false;
            var left=x-width/2;
            var right=x+width/2;
            var top=y-height/2;
            var bottom=y+height/2;
            /*                if(closePathTrue==true);
                      else {
                      for (idx = 1; idx < this.objectPoint.length; idx++) {
                      }
                      }*/
            //check isIn
            /* Rectangle Area Distinguishing Between This CustomObject and Another Object */
            if((Math.abs(this.x-x)<=Math.abs(this.width/2+width/2)&&(Math.abs(this.y-y)<=Math.abs(this.height/2+height/2)))&&isIn==false)isIn=true;
            else isIn=false;/* if Another Objet is NOT in This CustomObject */
            return isIn;/* return result of isObjectIn */
        }
        /* Important : Logic of drawing All CustomObject(s) Stored in CustomObjectList, drawType arguments's value is must be "image" */
        /* Notice 1 : this.draw function can be overridden by another code access!! */
        /* Notice 2 : There has no Situation to drawing using objectPoint Array variable */
        draw(context,drawType){
            if(this.display==false)return;
            if(drawType=="image"){
                context.beginPath();
                var direction=this.direction/Math.abs(this.direction);/* Makes Direction value only 1(left to right), -1(right to left). */
                var image=new Image();
                image.src=this.imgSrc;
                context.save();//must be written
                context.scale(direction,1);/* flip x using direction variable */
                context.drawImage(image,(this.x-this.width/2)*direction,this.y-this.height/2,this.width*direction,this.height);
                context.scale(1,1);//restore origin state
                context.restore();//must be written
            }
            else {
                var idx = 0;
                if (this.objectPoint.length <= 0)return;
                context.beginPath();/* initialize context */
                /* context.fillStyle ~ context.lineWidth : initialize line's style */
                context.fillStyle = this.fillStyle;
                context.strokeStyle = this.strokeStyle;
                context.lineWidth = this.lineWidth;
                /* Draw First and Second Line */
                context.moveTo(this.objectPoint[0].x, this.objectPoint[0].y);
                context.lineTo(this.objectPoint[0].x, this.objectPoint[0].y);
                /* ..and Draw rest of objectPoint */
                for (idx = 1; idx < this.objectPoint.length; idx++) {
                    context.LineTo(this.objectPoint[idx].x, this.objectPoint[idx].y);
                }
                context.stroke();/* Draw The line(s) */
            }
        }

        /* Determine CustomObject's MovePattern, using setInterval Function */
        setMovePattern(myFunc,time){
            if(this.movePatternHandler!==undefined){/* if this.movePatternHandler value is Exist */
                console.log("Error : movePatternHandler Setting Failed(Already Exist!!)");
                return;/* exit function */
            }
            else {
                /* enroll movePatternHandler */
                this.movePatternHandler=setInterval(myFunc,time);
            }
        }
        
        removeMovePatternHandler(){
            if(this.movePatternHandler===undefined){
                console.log("Error : removeMovePatternHandler Setting Failed!!(Alreay Exist!!)");
                return;
            }
            else{
                /* Removing setInterval, initialize movePatternHandler variable cleaned */
                clearInterval(this.movePatternHandler);
                this.movePatternHandler=undefined;
            }
        }
        /* Abstract event functions(about Objects), THESE EVENT FUNCTION ARE MUST BE OVERRIDDEN!!(replaced only one function) */
        /* Notice : this.onclick ~ this.onmouseup function definition is setted by default, for using trace of CustomObject's Mouse Event */
        /* Important : this function variables are managed from CustomScreen's EventListener Timer */
        click(event)
        {
            this.onclick(event);
        }
        mousemove(event){
            this.onmousemove(event);
        }
        mousedown(event){
            this.onmousedown(event);
        }
        mouseup(event){ 
            this.onmouseup(event);
        }

        /* this.addCustomObjectEventListener : enroll CustomObject's EventAction function, replaced at new function */
        addCustomObjectEventListener(eventType,enrollFunc)
        {
            switch(eventType)
            {
                case "click":
                    this.onclick=enrollFunc;
                    break;
                case "mousemove":
                    this.onmousemove=enrollFunc;
                    break;
                case "mousedown":
                    this.onmousedown=enrollFunc;
                    break;
                case "mouseup":
                    this.onmouseup=enrollFunc;
                    break;
            }
		}
        /* this.removeCustomObjectEventListener : initialize(remove) CustomObject's Event Clean */
        removeCustomObjectEventListener(eventType)
        {
            switch(eventType)
            {
                case "click":
                    this.onclick=undefined;
                    break;
                case "mousemove":
                    this.onmousemove=undefined;
                    break;
                case "mousedown":
                    this.onmousedown=undefined;
                    break;
                case "mouseup":
                    this.onmouseup=undefined;
                    break;
            }
        }
        /* Useless, this.removeCustomObject : remove this CustomObject. but, this function is never used. and causes some errors */
        removeCustomObject(){
            DeleteCustomObject(CustomObjectList,CustomObjectList_Wait,this.id);
        }
        /* Added Method At 2017-03-13 To Remove Object If This Object is Allocated To CustomObjectList*/
        remove=function(){
            if(this.allocatedCustomObjectList==undefined||this.allocatedCustomObjectList_Wait==undefined){
                console.log("Not Avaliable To Remove This Object Without Not Allocated CustomObject.");
                return this;
            }
            DeleteCustomObject(this.allocatedCustomObjectList,this.allocatedCustomObjectList_Wait,this.id);
            return undefined;
        }
    }

     /* Important : It must be needed to Manage CustomObjectList, Display CustomObject(image), EventInput, ReDefinable Timer, ETC... */
    class CustomScreen{
        constructor(CanvasName){
            // var width=1024;/* Unused, use canvas.width instead. size of CustomScreen(canvas Element)'s width */
            // var height=800;/* Unused, use canvas.height instead. size of CustomScreen(canvas Element)'s height */
            var time=30;/* Important : Call Image Per Miliseconds, Timer which is undefined call time value */
            var CanvasName=CanvasName;/* Important : It Must be Exist Canvas Element's Id value */
            var canvas=document.getElementById(CanvasName);/* get Element */
            var context=canvas.getContext("2d");/* Get Context */
            var screenLoad=null;/* Important : EventListener Handle Check Variable From Returning this.StartLoadScreen() Method */
            var timerLoad=null;/* Important : EventListener Handle Check Variable From Returning this.StartLoadScreen() Method */
            var TimerFunctionList=[];/* Timer(CustomTimer, Interval) Handle Stored Array, Linear Variant Queue */
            var handler_OnclickListener=null;/* unused */
            this.mouseEvent=undefined;/* unused */

            /* Important : this.onclick ~ this.onmouseup functions are Definitions of sending EventListener from CustomScreen to CustomObject */
            /* logic definition of CustomScreen's click Event Function for CustomObjectList */
            this.onclick=function(event){
                var mouse_x=event.offsetX;
                var mouse_y=event.offsetY;
                var mouse_pointer=findCustomObjectByName("MOUSE_POINTER");
                if(mouse_pointer!==undefined){
                    mouse_pointer.x=event.offsetX;
                    mouse_pointer.y=event.offsetY;
                }
                var idx=0;/* index value for CustomObjectList Array */
                var eventActivated=false;/* checking CustomObject's Activation variable which is Activated with CustomObject's eventTransparent value is false */
                for(idx=CustomObjectList.length-1;idx>=0;idx--){
                    if(_customObject==undefined||(_customObject.onclick==undefined||_customObject.onclick==null||(_customObject.eventTransparent!==true&&eventActivated==true)))continue;
                    if(_customObject.display!=true)continue; /* Skip Unplaced Object's Event */
                    if(_customObject.isObjectIn(mouse_x,mouse_y,10,10)==true){
                        if(_customObject.eventTransparent!==true)eventActivated=true;
                        _customObject.onclick(event);
                    }
                }
            }
            /* logic definition of CustomScreen's mousemove Event Function for CustomObjectList */
            this.onmousemove=function(event){
                var mouse_x=event.offsetX;
                var mouse_y=event.offsetY;
                var mouse_pointer=findCustomObjectByName("MOUSE_POINTER");
                if(mouse_pointer!==undefined){
                    mouse_pointer.x=event.offsetX;
                    mouse_pointer.y=event.offsetY;
                }
                var idx=0;/* index value for CustomObjectList Array */
                var eventActivated=false;/* checking CustomObject's Activation variable which is Activated with CustomObject's eventTransparent value is false */
                for(idx=CustomObjectList.length-1;idx>=0;idx--){
                    if(_customObject==undefined||(_customObject.onclick==undefined||_customObject.onclick==null||(_customObject.eventTransparent!==true&&eventActivated==true)))continue;
                    if(_customObject.display!=true)continue; /* Skip Unplaced Object's Event */
                    if(_customObject.isObjectIn(mouse_x,mouse_y,10,10)==true){
                        if(_customObject.eventTransparent!==true)eventActivated=true;
                        _customObject.onmousemove(event);
                    }
                }
            }
            /* logic definition of CustomScreen's mousedown Event Function for CustomObjectList */
            this.onmousedown=function(event){
                var mouse_x=event.offsetX;
                var mouse_y=event.offsetY;
                var mouse_pointer=findCustomObjectByName("MOUSE_POINTER");
                if(mouse_pointer!==undefined){
                    mouse_pointer.x=event.offsetX;
                    mouse_pointer.y=event.offsetY;
                }
                var idx=0;/* index value for CustomObjectList Array */
                var eventActivated=false;/* checking CustomObject's Activation variable which is Activated with CustomObject's eventTransparent value is false */
                for(idx=CustomObjectList.length-1;idx>=0;idx--){
                    if(_customObject==undefined||(_customObject.onclick==undefined||_customObject.onclick==null||(_customObject.eventTransparent!==true&&eventActivated==true)))continue;
                    if(_customObject.display!=true)continue; /* Skip Unplaced Object's Event */
                    if(_customObject.isObjectIn(mouse_x,mouse_y,10,10)==true){
                        if(_customObject.eventTransparent!==true)eventActivated=true;
                        _customObject.onmousedown(event);
                    }
                }
            }
            /* logic definition of CustomScreen's mouseup Event Function for CustomObjectList */
            this.onmouseup=function(event){
                var mouse_x=event.offsetX;
                var mouse_y=event.offsetY;
                var mouse_pointer=findCustomObjectByName("MOUSE_POINTER");
                if(mouse_pointer!==undefined){
                    mouse_pointer.x=event.offsetX;
                    mouse_pointer.y=event.offsetY;
                }
                var idx=0;/* index value for CustomObjectList Array */
                var eventActivated=false;/* checking CustomObject's Activation variable which is Activated with CustomObject's eventTransparent value is false */
                for(idx=CustomObjectList.length-1;idx>=0;idx--){
                    if(_customObject==undefined||(_customObject.onclick==undefined||_customObject.onclick==null||(_customObject.eventTransparent!==true&&eventActivated==true)))continue;
                    if(_customObject.display!=true)continue; /* Skip Unplaced Object's Event */
                    if(_customObject.isObjectIn(mouse_x,mouse_y,10,10)==true){
                        if(_customObject.eventTransparent!==true)eventActivated=true;
                        _customObject.onmouseup(event);
                    }
                }
            }
        }

        /* Important : Draw CustomObjectList's Drawing Logic Definition, Called By StartLoadScreen Function */
        /* CustomScreen : an Object What is Displayed, Run One Program , logical Partition. */
        CustomWM_PAINT()
        {
            context.clearRect(0,0,canvas.width,canvas.height);/* Erase the Canvas's Drawings */
            context.beginPath();
            context.globalComopsiteOperation="source-over";//set Deafault GlobalCompositeOperation
            var idx;
            /* check all CustomObjectList array value */
            for(idx=0;idx<CustomObjectList.length;idx++)
            {
                /* if CustomObject[idx]'s value has CustomObject(Exist) And Setted Displaying And Visibling Both */
                if(_customObject!=undefined && _customObject.display==true && _customObject.visibility ==true ){
                    /* set CustomObject's context State */
                    context.globalAlpha=_customObject.globalAlpha;
                    context.shadowOffsetX=_customObject.shadowOffsetX;
                    context.shadowOffsetY=_customObject.shadowOffsetY;
                    context.shadowBlur=_customObject.shadowBlur;
                    context.shadowColor=_customObject.shadowColor;
                    context.font=_customObject.font; /* Added Code At 2015-11-11 Wed. */
                    context.textAlign=_customObject.textAlign; /* Added Code At 2015-11-17 */
                    context.textBaseline=_customObject.textBaseline; /* Added Code At 2015-11-17 */
                    context.strokeStyle=_customObject.strokeStyle;/* Added Code At 2015-11-17 */
                    context.fillStyle=_customObject.fillStyle;/* Added Code At 2015-11-17 */
                    _customObject.draw(context,"image");/* draw CustomObject using CustomObject[idx].draw Method */
                    //                       _customObject.displayName(context);/* draw CustomObject's State(id, name, position, name) */
                }
            }
        }
        /* Important : Move CustomObjectList's Moving Logic Definition, Called By StartLoadScreen Function */
        /* Notice : Move Part */
        CustomObjectMove(){
            var temp_obj;
            var idx;
            /* check all CustomObjectList array value */
            for(idx=0;idx<CustomObjectList.length;idx++)
            { /* if CustomObject[idx]'s value has CustomObject(Exist) */
                if(_customObject!=undefined){
                    _customObject.move(time);/* Move CustomObject's Position */
                }
            }
        }
        /* Important : Initialization of Starting CustomScreen's Drawing, CustomObject's Moving Handler!! */
        StartLoadScreen(){
            if(screenLoad==null) {
                screenLoad = setInterval(CustomWM_PAINT, time);
                timerLoad = setInterval(CustomObjectMove, time);
            }
            else console.log("Display Already Loaded!!");
        }
        /* Important : Initialization of Removing CustomScreen's Drawing, CustomObject's Moving Handler!! */
        CloseLoadScreen(){
            if(screenLoad==null)console.log("Don't Have to Close this Screen!!");
            else{
                clearInterval(screenLoad);
                clearInterval(timerLoad);
                screenLoad=null;
            }
        }
        /* Important : Adding CustomScreen's EventListener Which is Used For Running All CustomObject's Events Only At This Code */
        /* Warning : This Method is NOT EVENT ENROLLMENT FUNCTION!! */
        addCustomScreenEventListener(){
            /* Warning : canvas variable should be intialized */
            var canvas=document.getElementById(CanvasName);
            canvas.addEventListener("click",this.onclick);
            canvas.addEventListener("mousemove",this.onmousemove);
            canvas.addEventListener("mousedown",this.onmousedown);
            canvas.addEventListener("mouseup",this.onmouseup);
        }
        /* Important : Removing CustomScreen's EventListener Which is Used For Running All CustomObject's Events Only At This Code */
        /* Warning : This Method is NOT EVENT REMOVEMENT FUNCTION!! */
        removeCustomScreenEventListener(){
            /* Warning : canvas variable should be intialized */
            var canvas=document.getElementById(CanvasName);
            canvas.removeEventListener("click",this.onclick);
            canvas.removeEventListener("mousemove",this.onmousemove);
            canvas.removeEventListener("mousedown",this.onmousedown);
            canvas.removeEventListener("mouseup",this.onmouseup);
        }
        
        click(e){
            this.onclick(e);
        }
        mousedown(e){
            this.onmousedown(e);
        }
        mouseup(e){
            this.onmouseup(e);
        }
        mousemove(e){
            this.onmousemove(e);
        }
        /* Important : Definiton Of Decreasing CustomObject's attackcool variable, managing Animation, restricting attack, ETC... */
        /* Notice : This Function is Managed By Handler Called From */
        AttackCool(){
            for(idx=CustomObjectList.length-1;idx>=0;idx--)
            {
                /* If CustomObject is NOT exist In the _customObject or CustomObject's attackcool is less equal 0 , Not Activated Below Code */
                if(_customObject<=0||_customObject==undefined)continue;
                else {
                    if(_customObject.attackcool-time<0)/* setting gap part */
                        _customObject.attackcool=0;
                    else
                        _customObject.attackcool-=time;
                }
            }
        }
        /* Important : Object Definition in CustomScreen Object Only Can declare In the CustomScreen Object */
        /* Important : It is Important to managing setInterval Handler Easily */
        /* This Object Definition is Used At this.addCustomScreenTimerFunction(myFunc,mytime) method */
        CustomWM_TIMER(name,myFunc,time){
            this.time=time;//per miliseconds
            this.myFunc=myFunc;
            this.name=name;//CustomWM_TIMER's Name, Usually Attached index of Timer Array
            this.handle=undefined;
        }
        /* Important : Sets of Removing CustomObject Objects In the CustomObjectList Array And CustomWM_TIMER Objects in the TimerFunctionList */
        /* Usage : reset All Objects And Timers For Creating New Activity(Screen) */
        /* Notice : this function is called at Activity_Xxx in front of their inner Function */
        resetCustomScreenState(){
            FlushCustomObject(CustomObjectList);
            this.removeCustomScreenTimerFunctionAll();
        }
        /* Important : Definition of Adding Timer(setInterval Handler) At the CustomScreen Object */
        /* Important : Added Handler's Position is Never Varied(Because of File Structure And Javascript Grammer's Call by Reference initialization) */
        addCustomScreenTimerFunction(myFunc,mytime){
            var idx;
            if(mytime==undefined)mytime=time;//Screen's Time;
            idx=TimerFunctionList.length;
            TimerFunctionList.push();
            TimerFunctionList[idx]=new CustomWM_TIMER(idx,myFunc,mytime);
            TimerFunctionList[idx].handle=setInterval(TimerFunctionList[idx].myFunc,TimerFunctionList[idx].time);
        }
        /* Notice : Rarely Used Except Clearing TimerFunctionList Array */
        /* idx : value of (Private)CustomScreen.TimerFunctionList's Array Index */
        /* Important : Added Handler's Position is Varied(Because of File Structure of TimerFunctionList Variable(Queue Structure)) */
        removeCustomScreenTimerFunction(idx){
            if(TimerFunctionList.length<=0) {
                console.log("Failed : Nothing to Remove TimerFunctionList Function!!");
                return;
            }
            else if(TimerFunctionList.length-1>idx||idx<0){
                console.log("Failed : Please Input Correct Index!!");
                return;
            }
            clearInterval(TimerFunctionList[idx].handle);
            TimerFunctionList[idx].handle=undefined;
            removeArrayIndex(TimerFunctionList,idx);
        }
        /* Important : Definition of Removing All CustomWM_TIMER at TimerFunctionList Array Variable */
        removeCustomScreenTimerFunctionAll(){
            for(i=TimerFunctionList.length-1;i>=0;i--){
                this.removeCustomScreenTimerFunction(i);
            }
        }
        /* Notice : Another Version of removeCustomScreenTimerFuncionAll, considered Data Structure like CustomObjectList's Data Structure(using list array, indexs are never vary) */
        /* Notice : Never Used Method */
        FlushCustomScreenTimerFunction(){
            for(var i=TimerFunctionList.length-1;i>=0;i--){
                clearInterval(TimerFunctionList[i].handle);
                TimerFunctionList.pop();
            }
            for(var i=TimerFunctionList_Wait.length;i>0;i--)
                TimerFunctionList_Wait.pop();
            console.log("FlushCustomScreenTimerFunction Function Occured!!");
        }
    }
    
   
}

/* CustomObject Manipulation Function */
{
    /* Very Important : Add CustomObject at the CustomObjectList, Should Be Enrolled CustomObject By Only This Function */
    /* Important : AddCustomObject Function Returns Created CustomObject[idx] value (Call By Reference)*/
    function AddCustomObject(CustomObjectList,CustomObjectList_Wait,x,y,width,height,name,imgSrc,display,zIndex,eventTransparent){
        /*****************************************
          Parameter Info
          CustomObjectList : Array Of List which is Stored CustomObject Objects, (Important)Just Input Variable CustomObjectList.
          CustomObjectList_Wait : Array Of List which index is removed at (parameter)CustomObjectList Array, (Important)Just Input Variable CustomObjectList_Wait.
          x : middle of CustomObject's Position of x-dimension
          y : middle of CustomObject's Position of y-dimension
          width : CustomObject's Width, Image's width, this variable is related with CustomObject.isObjectIn(x,y,width,height) function
          height : CustomObject's Height, Image's height, this variable is related with CustomObject.isObjectIn(x,y,width,height) function
          name : CustomObject's name, (Important)It's Key To Find This One CustomObject Using findCustomObjectByName(objName) function, Duplicativable But You Can Find Only One If you Use That Function.
          imgSrc : CustomObject's image Src (used for drawing images using CustomObject's position information, size don't care)
          display : CustomObject's drawable Information (What If this parameter's value isn't true, this CustomObject.draw is Not Activated(drawing))
          (optional)zIndex : (Never Used)priority of locating , showing, eventListener Running Sequence. but, this variable's function isn't implemented.(Because of CustomObjectList's Data Structure)
          (optional)eventTransparent : ability of Activating EventListener, If Another CustomObject EventListener is Activated, If this value is True, This EventListener is Also Activated. (Default : false)
         ******************************************/
        var idx;
        /* Create New CustomObject Object */
        if(!(CustomObjectList_Wait==undefined||CustomObjectList_Wait.length<1)){
            idx=CustomObjectList_Wait[0];
            CustomObjectList_Wait.shift();
            _customObject=new CustomObject();
        }
        else {
            idx = CustomObjectList.length;
            CustomObjectList.push(new CustomObject());
        }
        /* CustomObject's Property's Value Mapping */
        {
            _customObject.allocatedCustomObjectList = CustomObjectList;
            _customObject.allocatedCustomObjectList_Wait = CustomObjectList_Wait;
            _customObject.x=x;
            _customObject.y=y;
            /* Code Appended Assigning First Created Position (Modifiable Property)*/
            _customObject.originX=x;
            _customObject.originY=y;
            _customObject.width=width;
            _customObject.height=height;
            _customObject.name=name;
            _customObject.imgSrc=imgSrc;
            _customObject.id=idx;
            _customObject.zIndex=zIndex;
            _customObject.eventTransparent=eventTransparent;
            if(display==true)_customObject.display=_customObject.visibility=display;
            /*              if(onclickFunction!==undefined)
                      _customObject.addCustomObjectEventListener("click",onclickFunction);*/
        }
        /* Return newly Created CustomObject. */
        return _customObject;

    }
    /* Important : Delete CustomObject using index */
    function DeleteCustomObject(CustomObjectList,CustomObjectList_Wait,idx){
        if(idx>CustomObjectList.length-1&&idx<0){
            console.log("Cannot Delete this index : "+idx);
            return;
        }
        /* If index is Top of CustomObject's Array index */
        if(idx==CustomObjectList.length-1){
            /* Remove PatternHandler Timer */
            if(_customObject.movePatternHandler!==undefined)_customObject.removeMovePatternHandler();
            /* Remove This Array[idx]'s value, Decrase -1 At This Array.length */
            CustomObjectList.pop();
        }
        else{
            /* Save Deleting index At CustomObjectList Index Array */
            CustomObjectList_Wait.push(idx);
            /* Remove PatternHandler Timer */
            if(_customObject.movePatternHandler!==undefined)_customObject.removeMovePatternHandler();
            /* Initialize Array[idx]'s value at undefined */
            _customObject=undefined;
        }
    }
    /* Remove All CustomObjects Stored in CustomObjectList */
    function FlushCustomObject(CustomObjectList){
        console.log("CustomObjectList Array Flush Function Occured!!\n");
        var idx;
        for(idx=CustomObjectList.length-1;idx>=0;idx--)
            CustomObjectList.pop();
    }
    /* Important : It Returns Only One CustomObject in the CustomObjectList equals to objName and _customObject.name */
    /* Important : Return value is Searched first to top value */
    /* Important : Because of This Method, This Program Cannot Change Data Structure To Queue Data Structure, index Variable Array */
    /* Important : Except value of undefined, Number, String, NaN, and Boolean, Return Value is Variable according to Call By Reference(saved that Object's Address, equals to that Object's access) */
    function findCustomObjectByName(objName){
        var idx;
        for(idx=CustomObjectList.length-1;idx>=0;idx--) {
            if(_customObject==undefined)continue;
            /* Found CustomObject's name is objName */
            if (_customObject.name == objName) {
                return _customObject;
            }
        }
        /* Found Failed CustomObject's name is objName */
    }
}

/* Custom Object Manager */
{
    class CustomObjectManager{
        
        constructor(){
            this.CustomObjectList=[];
        }
        append(...target_customObjects){
            /* Sort by zIndex Parameter*/
            let _sort_data=[];
            

            let _results=[];
            target_customObjects.foreach((function(target_customObject){
                if(!(typeof(target_customObject)==CustomObject)) _results.push(null);
                else{
                    this.customObjectList=(function insert_element_by_zIndex(arr,target_element){
                        let lng_arr=arr.length;
                        let idx_arr=lng_arr/2;
                        
                    })(this.customObjectList);
                    let arr_lng=this.customObjectList.length;
                    let idx=0;
                    
                    
                    
                }
            }).bind(this));
            
        }
        /* Very Important : Add CustomObject at the CustomObjectList, Should Be Enrolled CustomObject By Only This Function */
        /* Important : AddCustomObject Function Returns Created CustomObject[idx] value (Call By Reference)*/
        createCustomObject(x,y,width,height,name,imgSrc,display,zIndex,eventTransparent=false){
            /*****************************************
              Parameter Info
                 (obsoleted)CustomObjectList : Array Of List which is Stored CustomObject Objects, (Important)Just Input Variable CustomObjectList.
                 (obsoleted)CustomObjectList_Wait : Array Of List which index is removed at (parameter)CustomObjectList Array, (Important)Just Input Variable CustomObjectList_Wait.
                 x : middle of CustomObject's Position of x-dimension
                 y : middle of CustomObject's Position of y-dimension
                 width : CustomObject's Width, Image's width, this variable is related with CustomObject.isObjectIn(x,y,width,height) function
                 height : CustomObject's Height, Image's height, this variable is related with CustomObject.isObjectIn(x,y,width,height) function
                 name : CustomObject's name, (Important)It's Key To Find This One CustomObject Using findCustomObjectByName(objName) function, Duplicativable But You Can Find Only One If you Use That Function.
                 imgSrc : CustomObject's image Src (used for drawing images using CustomObject's position information, size don't care)
                 display : CustomObject's drawable Information (What If this parameter's value isn't true, this CustomObject.draw is Not Activated(drawing))
                 (optional)zIndex : (Never Used)priority of locating , showing, eventListener Running Sequence. but, this variable's function isn't implemented.(Because of CustomObjectList's Data Structure)
                 (optional)eventTransparent : ability of Activating EventListener, If Another CustomObject EventListener is Activated, If this value is True, This EventListener is Also Activated. (Default : false)
                ******************************************/
            var idx;
            /* Create New CustomObject Object */
            let _customObject = new CustomObject();
            /* CustomObject's Property's Value Mapping */
            {
                _customObject.allocatedCustomObjectList = CustomObjectList;
                _customObject.allocatedCustomObjectList_Wait = CustomObjectList_Wait;
                _customObject.x=x;
                _customObject.y=y;
                /* Code Appended Assigning First Created Position (Modifiable Property)*/
                _customObject.originX=x;
                _customObject.originY=y;
                _customObject.width=width;
                _customObject.height=height;
                _customObject.name=name;
                _customObject.imgSrc=imgSrc;
                _customObject.id=idx;
                _customObject.zIndex=zIndex;
                _customObject.eventTransparent=eventTransparent;
                if(display==true)_customObject.display=_customObject.visibility=display;
                /*              if(onclickFunction!==undefined)
                             _customObject.addCustomObjectEventListener("click",onclickFunction);*/
            }
            /* Return newly Created CustomObject. */
            
            return append(_customObject);

        }
        /* Important : Delete CustomObject using index */
        deleteCustomObject(CustomObjectList,CustomObjectList_Wait,idx){
            if(idx>CustomObjectList.length-1&&idx<0){
                console.log("Cannot Delete this index : "+idx);
                return;
            }
            /* If index is Top of CustomObject's Array index */
            if(idx==CustomObjectList.length-1){
                /* Remove PatternHandler Timer */
                if(_customObject.movePatternHandler!==undefined)_customObject.removeMovePatternHandler();
                /* Remove This Array[idx]'s value, Decrase -1 At This Array.length */
                CustomObjectList.pop();
            }
            else{
                /* Save Deleting index At CustomObjectList Index Array */
                CustomObjectList_Wait.push(idx);
                /* Remove PatternHandler Timer */
                if(_customObject.movePatternHandler!==undefined)_customObject.removeMovePatternHandler();
                /* Initialize Array[idx]'s value at undefined */
                _customObject=undefined;
            }
        }
    }

}


/*Custom Program Manager */
{
    class CustomProgramManager{
        constructor(canvas){
            this.customObjectManager=null;
            this.customScreen=new CustomScreen(canvas);
            this.customResourceManager=null;
        }
    }
}


/* Custom Music Manage Player*/
{
    class CustomMusic{
        constructor(){
            this.storedMusics=[];
            this.loadingResources=[];
        }

        appendMusic(URL){
            if(this.storedMusics[URL] == undefined){
                (function(){
                    this.storedMusics[URL]=new Audio(URL);
                    this.storedMusics[URL].onload=function(){
                        console.log("loading music complete");
                    }
                    this.storedMusics[URL].onloadstart=function(){
                        console.log("loding music start " + URL);
                        this.loadingResources.push(this.storedMusics[URL]);
                        console.log("loading resources : " + this.loadingResources);
                    }.bind(this);
                    this.storedMusics[URL].onloadedmetadata=function(){
                        console.log("loading complete " + URL);
                        this.loadingResources.pop(this.loadingResources);
                        console.log("loading resources : " + this.loadingResources);
                    }.bind(this);
                    this.storedMusics[URL].load();
                    console.log("CustomMusic :: new music " + URL + " Load Completed.");
                }).bind(this)();
            }
            return this.storedMusics[URL];
        }

        removeMusic(URL){
            if(this.storedMusics[URL]!= undefined){
                try{
                    this.stop(URL);
                }
                catch(e){
                    console.log("exception");
                }
                delete this.storedMusics[URL];
            }
        }

        clear(){
            console.log(this.storedMusics);
            var st = this;
            console.log(Object.keys(this.storedMusics));
            Object.keys(this.storedMusics).map((function(arg){
                console.log("deleting music file " + arg);
                this.removeMusic(arg);
            }).bind(st));
            delete this.storedMusics;
            this.storedMusics=[];
        }
        play(URL){
            try{
                this.stop(URL);
                this.storedMusics[URL].play();
            }
            catch(e){
                console.log("CustomMusic :: file \""+ URL+" play failed.");
            }
        }
        stop(URL){
            try{
                this.storedMusics[URL].pause();
                this.storesMusics[URL].currentTime=0;
            }
            catch(e){
                console.log("CustomMusic :: file \""+ URL+" stop failed.");
            }
        }
    }
    
}


/* Stuff Functions */
{
    /* appendArrayIndex : used For AddCustomObjectList_new Function, is Formed From Queue Structure*/
    function appendArrayIndex(arr,index,value){
        if(index==undefined||(index==arr.length-1&&index>=0)){
            arr[arr.length]=value;
            arr.length++;
        }
        else{
            for(var i=arr.length;i>index;i--){arr[i]=arr[i-1];}
            arr.length++;
            arr[i]=value;
        }
    }
    /* removeArrayIndex : is Formed From Queue Structure */
    function removeArrayIndex(arr, index){
        for(var i=index;i<arr.length;i++)
            arr[i]=arr[i+1];
        arr.length-=1;
    }
    function MOUSE_POINTER_onclick(e){
        var x=e.offsetX;
        var y= e.offsetY;
    }
    function MOUSE_POINTER_onmove(e){
        var x=e.offsetX;
        var y= e.offsetY;
    }
}

/*
  function Activity_Xxx(){...} means Seperate Game Default Settings.(reset Objects, Placing New Objects, ETC...)
  Activity_Xxx Writings Are Origined By Android Programing(ex : ActivityMain(){})
  */


/* main of Activity_Title */
/*
function Activity_Title(){
    MySrc.resetCustomScreenState();
}*/


/*
MySrc=new CustomScreen("canvas");
MySrc.StartLoadScreen();
MySrc.addCustomScreenEventListener();
*/
/* Default Initializing Part End*/
//Activity_Title();

