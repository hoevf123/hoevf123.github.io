/*MyObject Class (Button Object) Declaration.*/
{
    var MyObject = function(name,x,y,width,height,isdraggable){
        this.prototype = AddCustomObject(CustomObjectList,CustomObjectList_Wait,x,y,width,height,name,undefined,true,undefined,false);
        this.prototype.draw=draw;
        //this.prototype.onclick=onclick;
        this.prototype.onmousemove=onmove;
        this.prototype.onmousedown=onmousedown;
        this.prototype.onmouseup=onmouseup;
        this.prototype.selected=false;
        this.prototype.isdraggable=isdraggable||false;
        this.constructor=MyObject;
        this.ancestor=undefined;
        this.decendent=undefined;
        /* Object Drawing Method */
        function draw(context,image){
            context.beginPath();
            context.strokeStyle=this.strokeStyle;
            if(this.imgSrc !== undefined && typeof(this.imgSrc) == "string"){
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
            //Draw Content's name.
            {
                //Drawing Text
                if(this.value!==undefined){
                    var temp_fontSize = (this.width/this.value.toString().length);
                    temp_fontSize=(temp_fontSize>this.height)?this.height:temp_fontSize;
                    context.font= temp_fontSize+"px Arial";
                    context.textAlign="center";
                    context.textBaseline="middle";
                    context.fillText(this.value,this.x,this.y);
                }
            }

            //Draw Surrounded Line Rectangle.
            context.strokeRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        }
        function onclick(event){
            //this.strokeStyle  = (this.strokeStyle == "red" ? "black" : "red");
        }
        function onmousedown(event){
            this.selected=true;
            this.strokeStyle="red";
            this.eventTransparent=true;
        }
        function onmove(event){
            if(this.isdraggable&&this.selected){
                this.x=event.offsetX;
                this.y=event.offsetY;
            }
        }
        function onmouseup(event){
            this.selected=false;
            this.strokeStyle="black";
            this.eventTransparent=false;
        }
        return this.prototype;
    }
}