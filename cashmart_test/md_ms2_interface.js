
class MS2Object extends MyObject{
    constructor(){
        super(...arguments);
    }
}

class MS2ProgramManager{
    constructor(){
        this.com= new CustomObjectManager();
        this.csm = new CustomScreenManager();
        this.cmm= new CustomResourceManager();
    }
}

class MS2Frame extends MS2Object{
    constructor(x,y,width,height){
        super("MS2Frame",x,y,width,height);
        this.bg_color="#F6E8CA00";
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
    }
    draw(ctx,drawtype){
        context.beginPath();
        context.strokeStyle=this.strokeStyle;
        context.fillStyle = this.fillStyle = this.bg_color;
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
}

class MS2OptionsWindow extends MS2Object{
    constructor(){
        super(...arguments);

        class MS2SoundOptions{
            constructor(){
                this.ismute=false;
                this.isAlwaysSoundDisplay=false;
                this.volume_overall=100;
                this.volume_bgm = 100;
                this.volume_effects = 100;
                this.volume_system_effects = 100;
                this.volume_instruments_play = 100;
            }
        }

        class MS2WindowOptions{
            constructor(){
                this.isFullScreen=false;
                this.resolutionWidth=window.innerWidth;
                this.resolutionHeight=window.innerHeight;
            }
        }
    }
}

class MS2Button extends MS2Object{
    constructor(){

    }
}