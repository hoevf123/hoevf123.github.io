class CustomObject{
    constructor(name,x,y,z,width,height,depth){
        
    }
}

class CustomObjectManager{
    constructor(){
        this.items=[];
    }
    add(...items){
        this.items.push(...items);
    }
    append(name,x,y,z,width,height,depth){
        var co = new CustomObject(...arguments);
        this.add(co);
        return co;
    }
}


class CustomInputManager{

}

class CustomScreen{
    constructor(canvas_renerTarget){
        this.canvas=document.createElement("canvas");
        this.canvas_renerTarget=canvas_renerTarget;
        this.context_renterTarget=canvas_renerTarget.getContext('2d');
        window.requestAnimationFrame(this.draw);
    }
    draw(){
        /* blah blah blah */
        this.canvas.renderTarget.get
        context_renterTarget.drawImage(this.canvas,0,0);
    }
    
}

class CustomResourceManager{
    constructor(){
        
    }
}

class CustomProgramManager{
    constructor(){
        this.csm = new CustomScreenManager();
        this.com = new CustomObjectManager();
        this.crm = new CustomResourceManager();
        this.cim = new CustomInputManager();
    }
}

