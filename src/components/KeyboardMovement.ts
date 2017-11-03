namespace Darkworld.Components{
    export class KeyboardMovement extends BaseComponent implements IComponent {
        private game: DGame;
        private entity:Darkworld.Entities.Entity;
        private keyboard:Phaser.Keyboard;        

        constructor(game: Darkworld.DGame,entity: Darkworld.Entities.Mobiles.Mobile) {
            super();            
            this.game = game;
            this.entity = entity;

            this.keyboard = new Darkworld.Engines.InputHandler(game).keyboard;                           
        }

        update() {
            super.update();   
            debugger;
            if(this.keyboard.isDown(Phaser.KeyCode.W)) {
                this.entity.moveUp();
            }                               
        }
    }
}