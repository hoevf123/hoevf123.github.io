function isNullOrUndefined(t){
    if(t === undefined || t == null) return true;
    return false;
}

/*
    Note : this file is first created 2019-09-28

    Class Dependent hierarchy
    UCGPaint(Master, Data and Paint manager)
    └ CanvasProject <-- CanvasLayer
    └ CanvasManager <-- ㅜ CanvasDirectPaint
                        └  CanvasDirectInput
                        └  CanvasDirectSound
*/
class CanvasLayer{
    constructor(layer_name = "new_layer",ARGB_arr_data = [[]]){
        this.name = layer_name;
        this.data = ARGB_arr_data;
    }
}

class CanvasProject{
    constructor(project_name){
        this.name = project_name;
        this.layers = [];
        this.focusedCanvasLayer = null;
    }
    addLayer(layer_name,ARGB_arr_data= [[]]){
        let new_layer=new CanvasLayer(layer_name,ARGB_arr_data);
        this.layers.push(new_layer);
        this.focusedCanvasLayer = new_layer;
    }
    removeLayer(layer_name){
        let done_arr = [];
        let removed_arr = [];

        for(arg in this.layers){
            if(arg.name == layer_name){
                removed_arr.push(arg);
                if(this.focusedCanvasLayer == arg) this.focusedCanvasLayer=null;
            }
            else done_arr.push(arg);
        }
        this.layers = done_arr;
        return removed_arr;
    }
    focus(target_canvasLayer){
        this.focusedCanvasLayer = target_canvasLayer;
    }
}

class CanvasDirectInput{
    constructor(){

    }
}   

class CanvasDirectPaint{
    constructor(){
        
    }
}

class PaintLayerFrame{
    constructor(target_canvasLayer, posX, posY, width, height){
        this.target_canvasLayer = target_canvasLayer;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.onupdate = function (){
            this.paint();
        }
    }
    
    
}

class CanvasPainter{
    constructor(tag_canvas){
        this.canvas = tag_canvas;
        this.context = this.canvas.getContext("2d");
        this.paintRequests=[];
        this.inputRequests=[];
    }
    enrollEvent(){
        
    }
    click(){

    }
    mousedown(){

    }
    mouseup(){
        
    }
    mousemove(){

    }
    enrollRequestPaint(){
        window.requestAnimationFrame(paint);
    }
    requestPaint(paintLayerFrame){
        this.paintRequests.push(paintLayerFrame);
    }
    paint(){
        /*
            Drawing Direction
            (0,0) -- left top                  (3,0)
            [[A,R,G,B], [A,R,G,B],  [A,R,G,B], ...]],
            [[A,R,G,B], [A,R,G,B],  [A,R,G,B], ...]],
            [[A,R,G,B], [A,R,G,B],  [A,R,G,B], ...]],
            [[A,R,G,B], [A,R,G,B],  [A,R,G,B], ...]],
            (4,0) -- left bottom

            Paint Color Direction -> context.fillStyle = "rgba(R,G,B,A)";
         */
        if(this.paintRequests===undefined || this.paintRequests == null) return;
        for(arg in this.paintRequests){
            //Note : argument "arg" is CanvasLayerFrame Object.
            if(arg === undefined || arg == null)continue;
            let target_layer = arg.target_canvasLayer;
            let target_data = target_layer.target_canvasLayer;
            let frame_translateX = target_layer.posX;
            let frame_translateY = target_layer.posY;
            let frame_scaleX = target_layer.width;
            let frame_scaleY = target_layer.height;
            
            //paint whole cell in the Layer data
            for(let cursor_y = 0; cursor_y < target_data.length; cursor_y++){
                for(let cursor_x = 0; cursor_x < target_data[cursor_y].length; cursor_y++){
                    let current_cell = target_layer[cursor_x][cursor_y];
                    this.context.fillStyle="rgba("+ current_cell[1] +", " + current_cell[2]+", " +current_cell[3]+", " + current_cell[0]+")";
                    this.fillRect(
                        frame_translateX, 
                        frame_translateY,
                        frame_scaleX/target_data[cursor_y].length, 
                        frame_scaleY/target_data.length
                    );
                }
            }
        }
    }
    update(){

    }
}

/*
    NOTE : THIS IS MAIN CLASS OF PAINT PROGRAM.
*/
class UGCPaint{
    constructor(target_tag_div){
        this.attatchToCanvas(target_tag_div);
        this.CanvasProjects = [];
        this.focusedCanvasProject = null;
    }
    attatchToCanvas(target_tag_div){
        this.target_tag_div=target_tag_div;
        this.canvas = document.createElement("canvas");
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.target_tag_div.appendChild(this.canvas);
        if(this.target_tag_div.width <= 0 || this.target_tag_div.height <= 0){
            this.canvas.width = 800;
            this.canvas.height = 600;
        }
        
        //paint black empty screen to initialized canvas.
        let canvas_ctx = this.canvas.getContext("2d");
        canvas_ctx.fillStyle="darkgrey";
        canvas_ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
    }
    addProject(project_name){
        let new_project = new CanvasProject(project_name);
        this.CanvasProjects.push(new_project);
        this.focus(new_project);
        new_project.addLayer("New Layer",[
            [[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255]],
            [[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255]],
            [[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255]],
            [[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255]]
        ]); //create new 4x4 white layer
    }
    removeProject(project_name){
        let done_arr = [];
        let removed_arr = [];

        for(arg in this.CanvasProjects){
            if(arg.name == project_name){
                removed_arr.push(arg);
                if(this.focusedCanvasProject == arg) this.focusedCanvasProject=null;
            }
            else done_arr.push(arg);
        }
        this.CanvasProjects = done_arr;
        return removed_arr;
    }
    addLayer(layer_name,ARGB_arr_data= [
        [[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255]],
        [[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255]],
        [[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255]],
        [[255,255,255,255],[255,255,255,255],[255,255,255,255],[255,255,255,255]]
    ]){
        if(isNullOrUndefined(this.focusedCanvasProject)) this.addProject("New Project");
        return this.focusedCanvasProject.addLayer(layer_name,ARGB_arr_data);
    }
    removeLayer(layer_name){
        if(isNullOrUndefined(this.focusedCanvasProject)) return null;
        else return this.focusedCanvasProject.removeLayer(layer_name);
    }
    focus(target_canvasProject){
        this.focusedCanvasProject = target_canvasProject;
    }
}

var ugcPaint = new UGCPaint(document.getElementById("paint-program-area"));