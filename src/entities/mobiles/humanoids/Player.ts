namespace Darkworld.Entities.Mobiles.Humanoids{
    export class Player extends Darkworld.Entities.Mobiles.Humanoids.Humanoid {                
        constructor(game:Darkworld.DGame,x:number,y:number){
            super(game,x,y,'playerImg',null);
            game.physics.p2.enable(this);  
            
            this.body.setZeroDamping();
            this.body.fixedRotation = true;

            //Add components here
            this.addComponents([
                new Darkworld.Components.LookAtMouse(game,this),
                new Darkworld.Components.KeyboardMovement(game,this)
            ]);          
        }

        update(){     
            super.update();   
            
        }
    }
}