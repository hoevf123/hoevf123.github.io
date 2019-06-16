class CustomScreen{
    constructor(target_customScreenManager){
        this.csm=target_customScreenManager;
        this.canvas=document.createElement("canvas");
        this.requestDrawQueue=[];
        this.requestMoveQueue=[];
        // var width=1024;/* Unused, use canvas.width instead. size of CustomScreen(canvas Element)'s width */
        // var height=800;/* Unused, use canvas.height instead. size of CustomScreen(canvas Element)'s height */
        var lastTimestamp = 0;
        var time=30;/* Important : Call Image Per Miliseconds, Timer which is undefined call time value */
        var context=canvas.getContext("2d");/* Get Context */
        var screenLoad=null;/* Important : EventListener Handle Check Variable From Returning this.StartLoadScreen() Method */
        var timerLoad=null;/* Important : EventListener Handle Check Variable From Returning this.StartLoadScreen() Method */
        var TimerFunctionList=[];/* Timer(CustomTimer, Interval) Handle Stored Array, Linear Variant Queue */
        var handler_OnclickListener=null;/* unused */
        this.mouseEvent=undefined;/* unused */
        this.isFullScreen=true;

        //modifiable event functions
        //about painting request events.
        this.onpaint=(function ondraw(event){draw(...arguments)}).bind(this);
        this.onresize=(function onresize(event){resize(...arguments);}).bind(this);
        
        //about mouse events.
        this.onclick=(function onclick(event){click(...arguments)}).bind(this);
        this.onmousedown=(function onmousedown(event){mousedown(...arguments)}).bind(this);
        this.onmousemove=(function onmousemove(event){mousemove(...arguments)}).bind(this);
        this.onmouseup=(function onmouseup(event){mouseup(...arguments)}).bind(this);

        //about timing events.
        this.onmove=(function onmove(event){move(...arguments)}).bind(this);
        
    }

    paint(timestamp_mills)
    {
        //adjust buffer's canvas size
        if(csm!==undefined){
            canvas.width=csm.canvas.width;
            canvas.height=csm.canvas.height;
        }
        //clear buffer screen
        context.clearRect(0,0,canvas.width,canvas.height);/* Erase the Canvas's Drawings */
        //fill default color to white
        context.fillStyle="rgba(255,255,255,1)";
        context.beginPath();
        context.fillRect(0,0,buf_canvas.width,buf_canvas.height);
        context.globalComopsiteOperation="source-over";//set Deafault GlobalCompositeOperation
        var idx;
        /* check all CustomObjectList array value */
        for(var target_drawObject in requestDrawQueue)
        {
            /* if CustomObject[idx]'s value has CustomObject(Exist) And Setted Displaying And Visibling Both */
            if(target_drawObject!=undefined && target_drawObject.display==true && target_drawObject.visibility ==true ){
                /* set CustomObject's context State */
                context.globalAlpha=target_drawObject.globalAlpha;
                context.shadowOffsetX=target_drawObject.shadowOffsetX;
                context.shadowOffsetY=target_drawObject.shadowOffsetY;
                context.shadowBlur=target_drawObject.shadowBlur;
                context.shadowColor=target_drawObject.shadowColor;
                context.font=target_drawObject.font; /* Added Code At 2015-11-11 Wed. */
                context.textAlign=target_drawObject.textAlign; /* Added Code At 2015-11-17 */
                context.textBaseline=target_drawObject.textBaseline; /* Added Code At 2015-11-17 */
                context.strokeStyle=target_drawObject.strokeStyle;/* Added Code At 2015-11-17 */
                context.fillStyle=target_drawObject.fillStyle;/* Added Code At 2015-11-17 */
                target_drawObject.draw(context,"image");/* draw CustomObject using CustomObject[idx].draw Method */
                //                       target_drawObject.displayName(context);/* draw CustomObject's State(id, name, position, name) */
            }
        }
    }
        
    /* Important : Move CustomObjectList's Moving Logic Definition, Called By StartLoadScreen Function */
    /* Notice : Move Part */
    move(){
        var temp_obj;
        var idx;
        /* check all CustomObjectList array value */
        for(var target_requestObject in requestMoveQueue)
        { /* if CustomObject[idx]'s value has CustomObject(Exist) */
            if(target_requestObject!=undefined){
                target_requestObject.move(time);/* Move CustomObject's Position */
            }
        }
    }
    /* Important : Initialization of Starting CustomScreen's Drawing, CustomObject's Moving Handler!! */
    StartLoadScreen(){
        if(screenLoad==null) {
            if(window.requestAnimationFrame)
                window.requestAnimationFrame(this.ondraw);
            else
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
        window.addEventListener("keydown",this.onkeydown);
        window.addEventListener("keypress",this.onkeypress);
        window.addEventListener("keyup",this.onkeyup);
        window.addEventListener("resize",this.onresize);
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
        window.removeEventListener("keydown",this.onkeydown);
        window.removeEventListener("keypress",this.onkeypress);
        window.removeEventListener("keyup",this.onkeyup);
        window.removeEventListener("resize",this.onresize);
    }
    /* Important : this.onclick ~ this.onmouseup functions are Definitions of sending EventListener from CustomScreen to CustomObject */
    /* logic definition of CustomScreen's click Event Function for CustomObjectList */
    click=function(event){
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
            if(CustomObjectList[idx]==undefined||(CustomObjectList[idx].onclick==undefined||CustomObjectList[idx].onclick==null||(CustomObjectList[idx].eventTransparent!==true&&eventActivated==true)))continue;
            if(CustomObjectList[idx].display!=true)continue; /* Skip Unplaced Object's Event */
            if(CustomObjectList[idx].isObjectIn(mouse_x,mouse_y,10,10)==true){
                if(CustomObjectList[idx].eventTransparent!==true)eventActivated=true;
                CustomObjectList[idx].onclick(event);
            }
        }
    }
    /* logic definition of CustomScreen's mousemove Event Function for CustomObjectList */
    mousemove=function(event){
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
            if(CustomObjectList[idx]==undefined||(CustomObjectList[idx].onmousemove==undefined||CustomObjectList[idx].onmousemove==null||(CustomObjectList[idx].eventTransparent!==true&&eventActivated==true)))continue;
            if(CustomObjectList[idx].display!=true)continue; /* Skip Unplaced Object's Event */
            if(CustomObjectList[idx].isObjectIn(mouse_x,mouse_y,10,10)==true){
                if(CustomObjectList[idx].eventTransparent!==true)eventActivated=true;
                CustomObjectList[idx].onmousemove(event);
            }
        }
    }
    /* logic definition of CustomScreen's mousedown Event Function for CustomObjectList */
    mousedown(event){
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
            if(CustomObjectList[idx]==undefined||(CustomObjectList[idx].onmousedown==undefined||CustomObjectList[idx].onmousedown==null||(CustomObjectList[idx].eventTransparent!==true&&eventActivated==true)))continue;
            if(CustomObjectList[idx].display!=true)continue; /* Skip Unplaced Object's Event */
            if(CustomObjectList[idx].isObjectIn(mouse_x,mouse_y,10,10)==true){
                if(CustomObjectList[idx].eventTransparent!==true)eventActivated=true;
                CustomObjectList[idx].onmousedown(event);
            }
        }
    }
    /* logic definition of CustomScreen's mouseup Event Function for CustomObjectList */
    mouseup(event){
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
            if(CustomObjectList[idx]==undefined||(CustomObjectList[idx].onmouseup==undefined||CustomObjectList[idx].onmouseup==null||(CustomObjectList[idx].eventTransparent!==true&&eventActivated==true)))continue;
            if(CustomObjectList[idx].display!=true)continue; /* Skip Unplaced Object's Event */
            if(CustomObjectList[idx].isObjectIn(mouse_x,mouse_y,10,10)==true){
                if(CustomObjectList[idx].eventTransparent!==true)eventActivated=true;
                CustomObjectList[idx].onmouseup(event);
            }
        }
    }
    /* Global keydown event*/
    keydown(event){
        var eventActivated=false;/* checking CustomObject's Activation variable which is Activated with CustomObject's eventTransparent value is false */
        for(idx=CustomObjectList.length-1;idx>=0;idx--){
            if(CustomObjectList[idx]==undefined||(CustomObjectList[idx].onkeydown==undefined||CustomObjectList[idx].onkeydown==null||(CustomObjectList[idx].eventTransparent!==true&&eventActivated==true)))continue;
            if(CustomObjectList[idx].display!=true)continue; /* Skip Unplaced Object's Event */
            /* check if specific key is pressed */
            if(CustomObjectList[idx].keysPressed[event.keyCode]===true)continue;
            else{
                CustomObjectList[idx].keysPressed[event.keyCode]=true;//lock onkeydown event
                if(CustomObjectList[idx].eventTransparent!==true)eventActivated=true;
                CustomObjectList[idx].onkeydown(event);
            }
            
        }
    }
    /* Global keypress event */
    keypress(event){
        var eventActivated=false;/* checking CustomObject's Activation variable which is Activated with CustomObject's eventTransparent value is false */
        for(idx=CustomObjectList.length-1;idx>=0;idx--){
            if(CustomObjectList[idx]==undefined||(CustomObjectList[idx].onkeypress==undefined||CustomObjectList[idx].onkeypress==null||(CustomObjectList[idx].eventTransparent!==true&&eventActivated==true)))continue;
            if(CustomObjectList[idx].display!=true)continue; /* Skip Unplaced Object's Event */
            if(CustomObjectList[idx].eventTransparent!==true)eventActivated=true;
            CustomObjectList[idx].onkeypress(event);
        }
    }

    /* Global keyup event */
    keyup(event){
        var eventActivated=false;/* checking CustomObject's Activation variable which is Activated with CustomObject's eventTransparent value is false */
        for(idx=CustomObjectList.length-1;idx>=0;idx--){
            if(CustomObjectList[idx]==undefined||(CustomObjectList[idx].onkeyup==undefined||CustomObjectList[idx].onkeyup==null||(CustomObjectList[idx].eventTransparent!==true&&eventActivated==true)))continue;
            if(CustomObjectList[idx].display!=true)continue; /* Skip Unplaced Object's Event */
            if(CustomObjectList[idx].eventTransparent!==true)eventActivated=true;
            if(CustomObjectList[idx].keysPressed[event.keyCode]===true)delete CustomObjectList[idx].keysPressed[event.keyCode];
            CustomObjectList[idx].onkeyup(event);
        }
    }

    /* Global Window resize event */
    resize(){
        console.log("resize activated");
        console.log("isFullScreen : " + this.isFullScreen);
        if(this.isFullScreen == true){
            if(canvas!==undefined && canvas !== null){
                canvas.width=window.innerWidth;
                canvas.height=window.innerHeight;
            }
        }
    };

 
    /* Important : Definiton Of Decreasing CustomObject's attackcool variable, managing Animation, restricting attack, ETC... */
    /* Notice : This Function is Managed By Handler Called From */
    AttackCool(){
        for(idx=CustomObjectList.length-1;idx>=0;idx--)
        {
            /* If CustomObject is NOT exist In the CustomObjectList[idx] or CustomObject's attackcool is less equal 0 , Not Activated Below Code */
            if(CustomObjectList[idx]<=0||CustomObjectList[idx]==undefined)continue;
            else {
                if(CustomObjectList[idx].attackcool-time<0)/* setting gap part */
                    CustomObjectList[idx].attackcool=0;
                else
                    CustomObjectList[idx].attackcool-=time;
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
        this.onresize();
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

class CustomScreenManager{
    constructor(target_canvas){
        this.target_canvas=target_canvas;
        this.status = "none";
        this.drawQueue=[];
    }
}

class CustomObject{
    constructor(x,y,width,height,name,imgSrc,display,zIndex,eventTransparent){
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
        this.id=0;
        this.name="undefined";
        this.type="undefined";
        this.hp=1;
        this.lineWidth=0.5;
        this.x=0;/* middle of Object's x Position */
        this.y=0;/* middle of Object's y Position */
        this.z=0;/* middle of Object's y Position */
        this.speed_x=0;/* speed, pixel per second of Object's x Position */
        this.speed_y=0;/* speed, pixel per second of Object's y Position */
        this.speed_z=0;/* speed, pixel per second of Object's z Position */
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
        this.keysPressed={};/* Object Press State, if specific key is true, it is currently pressed.  */
        if(display==true)CustomObjectList[idx].display=CustomObjectList[idx].visibility=display;



        /* variant member function definition */


        /* function displayName : display imformation of CustomObject's id, CustomObject's name, CustomObject's hp , Used Only at Debugging */
        this.displayName=function(context) {
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
        this.objectPoint=new Array();/* Useless, CustomObject's drawLinePoint */
        this.onmove = function(){}; /* Act When Object Moves */
        /* Useless, Delete All objectPoint's Parameter */
        function objectPointClear()
        {
            console.log(this.name+" : objectPoint Clear Function Activated!!");
            var i=this.objectPoint.length;
            for(;i>0;i++)
                this.objectPoint.pop();
            console.log(this.name+" : objectPoint Clear Function Finished!!")
        }
        /* SetInterval Handler Function, determine How to move CustomObject's Position */
        this.move=function(time){
            time/=1000;
            this.x+=this.speed_x*time;
            this.y+=this.speed_y*time;
            if((this.speed_x != 0 || this.speed_y != 0) && this.onmove != undefined )
                this.onmove();
        }
        /* Distinguish another Object is in CustomObject's Area */
        this.isObjectIn=function(x,y,width,height,closePathTrue)
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
        this.draw=function(context,drawType,customScreen){
            if(this.display==false)return;
            if(drawType=="image"){
                context.beginPath();
                var direction=this.direction/Math.abs(this.direction);/* Makes Direction value only 1(left to right), -1(right to left). */
                var image=new Image();
                image.src=this.imgSrc;
                context.save();//must be written
                context.scale(direction,1);/* flip x using direction variable */
                context.drawImage(image,(this.x-relative_cam.x-this.width/2)*direction,
                    this.y-relative_cam.y-this.height/2,
                    this.width*direction,this.height);
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
                context.moveTo(this.objectPoint[0].x-relative_cam.x, this.objectPoint[0].y-relative_cam.y);
                context.lineTo(this.objectPoint[0].x-relative_cam.x, this.objectPoint[0].y-relative_cam.y);
                /* ..and Draw rest of objectPoint */
                for (idx = 1; idx < this.objectPoint.length; idx++) {
                    context.LineTo(this.objectPoint[idx].x-relative_cam.x, this.objectPoint[idx].y-relative_cam.y);
                }
                context.stroke();/* Draw The line(s) */
            }
        }
        /* Determine CustomObject's MovePattern, using setInterval Function */
        this.setMovePattern=function(myFunc,time){
            if(this.movePatternHandler!==undefined){/* if this.movePatternHandler value is Exist */
                console.log("Error : movePatternHandler Setting Failed(Already Exist!!)");
                return;/* exit function */
            }
            else {
                /* enroll movePatternHandler */
                this.movePatternHandler=setInterval(myFunc,time);
            }
        }
        this.removeMovePatternHandler=function(){
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
        /* Abstract event functions(about Objects), THESE EVENT FUNCTION ARE MUST BE OVERRIDDEN!!(replaced only one functi  on) */
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
        this.onkeydown=undefined;
        this.onkeypress=undefined;
        this.onkeyup=undefined;
        this.oninteract=undefined;
        /* this.addCustomObjectEventListener : enroll CustomObject's EventAction function, replaced at new function */
        this.addCustomObjectEventListener=function(eventType,enrollFunc)
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
                case "keydown":
                    this.onkeydown=enrollFunc;
                    break;
                case "keypress":
                    this.onkeypress=enrollFunc;
                    break;
                case "keyup":
                    this.onkeyup=enrollFunc;
                    break;
                case "interact":
                    this.oninteract=enrollFunc;
                    break;
                
            }
		}
        /* this.removeCustomObjectEventListener : initialize(remove) CustomObject's Event Clean */
        this.removeCustomObjectEventListener=function(eventType)
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
                case "keydown":
                    this.onkeydown=undefined;
                    break;
                case "keypress":
                    this.onkeypress=undefined;
                    break;
                case "keyup":
                    this.onkeyup=undefined;
                    break;
                case "interact":
                    this.oninteract=undefined;
                    break;
            }
        }
        /* Useless, this.removeCustomObject : remove this CustomObject. but, this function is never used. and causes some errors */
        this.removeCustomObject=function(){
            DeleteCustomObject(CustomObjectList,CustomObjectList_Wait,this.id);
        }
        /* Added Method At 2017-03-13 To Remove Object If This Object is Allocated To CustomObjectList*/
        this.remove=function(){
            if(this.allocatedCustomObjectList==undefined||this.allocatedCustomObjectList_Wait==undefined){
                console.log("Not Avaliable To Remove This Object Without Not Allocated CustomObject.");
                return this;
            }
            DeleteCustomObject(this.allocatedCustomObjectList,this.allocatedCustomObjectList_Wait,this.id);
            return undefined;
        }
    }
}

class CustomObjectManager{
    constructor(){

    }
}

class CustomResourceManger{
    constructor(){

    }
}