namespace Darkworld.Entities.Mobiles.Humanoids{
    export class Player extends Darkworld.Entities.Mobiles.Humanoids.Humanoid {                
        constructor(game:Darkworld.DGame,x:number,y:number){
            super(game,x,y,'playerImg',null);
            game.physics.p2.enable(this);  
            this.speed = 100;
            this.body.setZeroDamping();
            this.body.fixedRotation = true;

            //Add components here
            this.addComponents([
                new Darkworld.Components.LookAtMouse(game,this),
                new Darkworld.Components.KeyboardMovement(game,this),
                // new Darkworld.Components.Fov(game,this,15,0,'rgba(252, 233, 106, 1.0)','rgba(255, 255, 255, 0.0)',350,false,60),
                // new Darkworld.Components.Fov(game,this,0,15,'rgba(252, 233, 106, 1.0)','rgba(255, 255, 255, 0.0)',350,false,60),
                // new Darkworld.Components.Fov(game,this,15,15,'rgba(252, 233, 106, 1.0)','rgba(255, 255, 255, 0.0)',350,false,60),
                //new Darkworld.Components.Fov(game,this,0,0,'rgba(252, 233, 106, 1.0)','rgba(255, 255, 255, 0.0)',350,false,60),
                new Darkworld.Components.Fov(game,this,0,0,'rgba(252, 233, 106, 0.4)','rgba(255, 255, 255, 0.0)',50,true)
            ]); 


            for (let i = 0; i < 10; i++) {
                this.addComponent(new Darkworld.Components.Fov(game,this,25 * Math.cos(360/10*i),25 * Math.sin(360/10*i),'rgba(252, 233, 106, 1.0)','rgba(255, 255, 255, 0.0)',350,false,60));
                
            }
            
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