namespace Darkworld.Entities.Items{
    export class Chest extends Darkworld.Entities.Entity {
        level:number;
        fovDistance:number;
        isOpened:boolean;
        game:DGame;

        constructor(game:Darkworld.DGame,x:number,y:number){
            super(game,x,y,"chests",null);            
            this.level = 0;
            this.fovDistance = 15;
            this.anchor.setTo(0.5,0.5);
            this.isOpened = false;
            this.game = game;
            
            var fovComponent = new Darkworld.Components.Fov(game,this,0,0,'rgba(255, 191, 0, 1.0)','rgba(255, 191, 0, 0.0)',50);
            fovComponent.numberOfRays = 12;

            this.addComponents([fovComponent]);
            this.inputEnabled = true;
            this.events.onInputDown.add(this.onClick, this);
        }

        onClick(){
            if(!this.isOpened && this.isItCloseEnoughToPlayer()){
                this.isOpened = true;
                this.frame = 1;
            }            
        }

        isItCloseEnoughToPlayer():boolean{
            
            var distanceFromPlayer = Phaser.Math.distance(this.game.player.worldPosition.x,this.game.player.worldPosition.y,this.worldPosition.x,this.worldPosition.y); // 103.07764064044152
            
            return distanceFromPlayer<=this.game.player.effectiveDistance;
        }

        update(){
            super.update();
        };

        debugRender(){
            super.debugRender();
        };
    }
}