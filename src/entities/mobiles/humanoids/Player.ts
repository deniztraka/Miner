namespace Darkworld.Entities.Mobiles.Humanoids{
    export class Player extends Darkworld.Entities.Mobiles.Humanoids.Humanoid {                
        constructor(game:Darkworld.DGame,x:number,y:number){
            super(game,x,y,'playerImg',null);
            game.physics.p2.enable(this);  
            this.speed = 250;
            this.body.setZeroDamping();
            this.body.fixedRotation = true;

            //Add components here
            this.addComponents([
                new Darkworld.Components.LookAtMouse(game,this),
                new Darkworld.Components.KeyboardMovement(game,this),
                new Darkworld.Components.Fov(game,this,'rgba(255, 255, 255, 1.0)','rgba(255, 255, 255, 0.0)',150,false),
                new Darkworld.Components.Fov(game,this,'rgba(255, 255, 255, 0.4)','rgba(255, 255, 255, 0.0)',75,true)
            ]); 
            
            this.game.camera.follow(this);
        }

        

        update(){     
            super.update();   
            
        }

        debugRender(){
            super.debugRender();
        };
    }
}