namespace Darkworld.Entities.Mobiles.Humanoids{
    export class Player extends Darkworld.Entities.Mobiles.Humanoids.Humanoid {   
        private anglePreviousFrame:number;
        
        angleToPointer:number;
        inputHandler:Darkworld.Engines.InputHandler;
        timeOfLastTween:number;


        constructor(game:Darkworld.DGame,x:number,y:number){
            super(game,x,y,'playerImg',null);            
            this.inputHandler = new Darkworld.Engines.InputHandler(game);
            this.timeOfLastTween = 0;
            
        }

        update(){                        
            if(this.game.time.elapsedSecondsSince(this.timeOfLastTween)>=0.1){            
                this.game.add.tween(this).to( { angle: this.anglePreviousFrame }, 500, Phaser.Easing.Sinusoidal.Out, true);
                this.anglePreviousFrame = this.inputHandler.getAngleFrom(this);
                this.timeOfLastTween = this.game.time.time;
            }  
        }
    }
}