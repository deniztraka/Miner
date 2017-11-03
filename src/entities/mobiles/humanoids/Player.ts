namespace Darkworld.Entities.Mobiles.Humanoids{
    export class Player extends Darkworld.Entities.Mobiles.Humanoids.Humanoid {                
        constructor(game:Darkworld.DGame,x:number,y:number){
            super(game,x,y,'playerImg',null);                        

            //Add components here
            this.addComponents([
                new Darkworld.Components.LookAtMouse(game,this)
            ]);          
        }

        update(){     
            super.update();   
            
        }
    }
}