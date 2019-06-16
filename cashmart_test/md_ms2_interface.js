class MS2Object extends MyObject{

}

class MS2ProgramManager{
    constructor(){
        this.com= new CustomObjectManager();
        this.csm = new CustomScreenManager();
        this.cmm= new CustomResourceManager();
    }
}



class MS2OptionsWindow{
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

class MS2Button{
    constructor(){

    }
}