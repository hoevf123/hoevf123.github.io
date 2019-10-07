/*
    
    Layer Relations.
    UGCPaint(Master)
    └ ProjectManager <-- Project <-- Layer <- (ARGB 2-DIM-ARR)
    

*/


class CanvasLayer{
    constructor(layer_name="new layer",ARGB_map_arr=[[]], layer_lock=false){
        this.data = ARGB_map_arr;
        this.name = layer_name;
        this.lock = layer_lock;
    }
}

class CanvasProject{
    constructor(project_name = "new project"){
        this.layers=[];
        this.focusedLayers = [];
        this.name=[];
    }
}

class CanvasProjectManager{
    constructor(){
        this.projects=[];
        this.focusedProjects=[];
    }
    
    addNewProject(project_name){
        let new_project = new CanvasProject(project_name);
        this.projects.push(new_project);
        this.focusedProjects.shift();
        this.focusedProjects[0]=new_project;
    }
}

//Master Class
class UGCPaint{
    constructor(tag_div){
        this.target_tag_div=tag_div;
        this.tag_canvas = document.createElement("canvas");
        this.tag_div.appendChild(this.tag_canvas);
        this.tag_canvas.style.width="100%";
        this.tag_canvas.style.height="100%";
        this.tag_canvas.getContext("2d").fillRect(0,0,this.tag_canvas.width, this.tag_canvas.height);
    }
}

var ugcPaint = new UGCPaint(document.getElementById("paint-program-area"));