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
                new Darkworld.Components.ServerConnection(game,this)            
            ]); 
            this.addFov();
            
            this.game.camera.follow(this);
        }

        

        update(){     
            super.update();   
            
        }

        debugRender(){
            super.debugRender();
        };

        private addFov(){
            this.addComponents([
                new Darkworld.Components.Fov(this.game as DGame,this,-15,0,'rgba(252, 233, 106, 1.0)','rgba(255, 255, 255, 0.0)',350,false,60,true),
                new Darkworld.Components.Fov(this.game as DGame,this,15,0,'rgba(252, 233, 106, 1.0)','rgba(255, 255, 255, 0.0)',350,false,60,true),
                new Darkworld.Components.Fov(this.game as DGame,this,0,15,'rgba(252, 233, 106, 1.0)','rgba(255, 255, 255, 0.0)',350,false,60,true),
                new Darkworld.Components.Fov(this.game as DGame,this,0,-15,'rgba(252, 233, 106, 1.0)','rgba(255, 255, 255, 0.0)',350,false,60,true),
                new Darkworld.Components.Fov(this.game as DGame,this,15,15,'rgba(252, 233, 106, 1.0)','rgba(255, 255, 255, 0.0)',350,false,60,true),
                new Darkworld.Components.Fov(this.game as DGame,this,15,-15,'rgba(252, 233, 106, 1.0)','rgba(255, 255, 255, 0.0)',350,false,60,true),
                new Darkworld.Components.Fov(this.game as DGame,this,-15,-15,'rgba(252, 233, 106, 1.0)','rgba(255, 255, 255, 0.0)',350,false,60,true),
                new Darkworld.Components.Fov(this.game as DGame,this,-15,15,'rgba(252, 233, 106, 1.0)','rgba(255, 255, 255, 0.0)',350,false,60,true),
                new Darkworld.Components.Fov(this.game as DGame,this,0,0,'rgba(252, 233, 106, 1.0)','rgba(255, 255, 255, 0.0)',350,false,60,true),
                new Darkworld.Components.Fov(this.game as DGame,this,0,0,'rgba(252, 233, 106, 0.4)','rgba(255, 255, 255, 0.0)',50,true)
            ]);

        }
    }
}