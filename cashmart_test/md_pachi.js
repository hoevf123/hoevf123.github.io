class CTexture{
    constructor(ondraw,duration){
        this.ondraw=null;
        this.duration=0;
    }
}

class CObject{
    constructor(name,posX,posY,posZ,width,height,depth,zIndex,eventTransparent=false){
        this.name=name;
        this.posX=posX;
        this.posY=posY;
        this.posZ=posZ;
        this.width=width;
        this.height=height;
        this.depth=depth;
        this.zIndex=zIndex;
        this.eventTransparent=eventTransparent;
        this.cTextures=[];
    }
}
class CResource{
    constructor(tagObject){
        this.tagObject=tagObject;
        this.isLoad=false;
    }
    play(){
        if(this.tagObject !== undefined){
            this.stop();
            this.tagObject.play();
        }     
    }
    stop(){
        this.pause();
        this.setCurrentTime(0);
    }
    pause(){
        this.tagObject.pause();
    }
    getDuration(){
        if(this.tagObject !== undefined){
            return this.tagObject.duration;
        }
        return null;
    }
    setDuration(_val_t){
        if(this.tagObject !== undefined){
            this.tagObject.duration=_val_t;
        }
    }
    setVolume(_val_vol){
        if(this.tagObject !== undefined){
            this.tagObject.volume=_val_vol;
        }
    }
    getVolume(){
        if(this.tagObject !== undefined){
            return this.tagObject.volume;
        }
        return null;
    }
    setMute(_val_f){
        if(this.tagObject !== undefined){
            this.tagObject.loop = (_val_f == false ? false : true);
            return this.tagObject.loop;
        }
    }
    getMute(){
        if(this.tagObject !== undefined){
            return this.tagObject.muted;
        }
        return null;
    }
    setLoop(_val_f){
        if(this.tagObject !== undefined){
            this.tagObject.loop = (_val_f == false ? false : true);
            return this.tagObject.loop;
        }
    }
    getLoop(){
        if(this.tagObject !== undefined){
            return this.tagObject.loop;
        }
        return null;
    }
}

class Scene{
    constructor(_tag_canvas){
        this.canvas=_tag_canvas;
        this.items={};
        this.resources={};
        this.name=name;
        this.cObjects=[];
        this.onload=null;
    }
    addObject(cObject){
        (function _insert(_cObject){
            if(_cObject.zIndex==undefined){
                this.cObjects.push(_cobject);
            }
            else{
                /* Use Binary Sort */
                let _t_arr=this.cObjects;
                let _idx_cObjects=_t_arr.length/2;
                let _left_cObjects=0;
                let _right_cObjects=_t_arr.length;
                /* find inserting index (using binary search algo.) */
                for(;!(_left_cObjects==_right_cObjects);_idx_cObjects=Math.round((_left_cObjects + _right_cObjects)/2)){
                    if(_t_arr[_idx_cObjects].zIndex<=_cObject.zIndex){
                        /* if cObject's zIndex is bigger or equal then current index */
                        _left_cObjects=_idx_cObjects + 1;
                    }
                    else{
                        /* if cObject's zIndex is less then current index */
                        _right_cObjects=_idx_cObjects;
                    }
                }
                /* insert element at index position, replace to joined new array */
                this.cObjects = [..._t_arr.slice(0,_idx_cObjects),cObject,..._t_arr.slice(_idx_cObjects)];
                //delete _t_arr; //free obsoleted array;
            }
        }).bind(this)(cObject);
        return cObject;
    }
    createObject(name,posX,posY,posZ,width,height,depth,zIndex,eventTransparent=false){
        let _cObject=new CObject(name,posX,posY,posZ,width,height,depth,zIndex,eventTransparent);
        console.log("CObject :: " + name +" Created");
        return this.addObject(_cObject);
    }
    deleteObject(cObject){
        delete this.removeObject(cObject);
    }
    removeObject(cObject){
        this.cObjects = this.cObjects.filter(e => e != cObject);
        return cObject;
    }
}