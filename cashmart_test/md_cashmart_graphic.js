class loc_counter extends MyObject{
    constructor(x,y,width,height){
        super("a",x,y,0,width,height,1);
    }
}

class Lane{
    constructor(entrance,loc_waiting,loc_prod_placearea,loc_greeting){
        this.entrance=entrance;
        this.loc_waiting=loc_waiting;
        this.loc_prod_placearea=loc_prod_placearea;
        this.loc_greeting=loc_greeting;
    }
}

class CashaMart_g extends Maple2CashMart{
    constructor(){
        super();
        this.lanes=[
            
        ];
    }
    
    
}