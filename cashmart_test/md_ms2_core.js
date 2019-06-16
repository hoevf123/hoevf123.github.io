/* Consider Maplestory2 Module */

import "module_customobject";



// Data Repacking
class Maple2Object extends module_customobject.CustomObject{
    constructor(){
        super(x,y,z,width,height,length,0);
        this.interacts=[];
    }
}

// View and Control Module Repacking
class Maple2Scene extends module_customobject.CustomProgramManager{
    constructor(){
        super(...arguments);
    }
}