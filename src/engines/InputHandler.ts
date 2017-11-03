namespace Darkworld.Engines {
    export class InputHandler {
        game:DGame;     
        isEnabled:boolean;
        actionButton:Phaser.DeviceButton;
        selectButton:Phaser.DeviceButton;
        keyboard:Phaser.Keyboard;
        constructor(game:DGame) {
            this.game = game;
            this.isEnabled = true;
            this.actionButton = this.game.input.activePointer.leftButton;
            this.selectButton = this.game.input.activePointer.rightButton;
            this.keyboard = this.game.input.keyboard;
        } 
        update(){
            if(this.isEnabled){
                                
            }
        }

        getAngleFrom(entity:Darkworld.Entities.Entity){
            return Math.atan2(this.game.input.activePointer.y - entity.worldPosition.y, this.game.input.activePointer.x - entity.worldPosition.x ) * (180/Math.PI);
        }
    }
}