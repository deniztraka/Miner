namespace Darkworld.Components{
    export class KeyboardMovement extends BaseComponent implements IComponent {
        private game: DGame;
        private mobile:Darkworld.Entities.Mobiles.Mobile;
        private keyboard:Phaser.Keyboard;        

        constructor(game: Darkworld.DGame,mobile: Darkworld.Entities.Mobiles.Mobile) {
            super("KeyboardMovement");            
            this.game = game;
            this.mobile = mobile;

            this.keyboard = new Darkworld.Engines.InputHandler(game).keyboard;                           
        }

        update() {
            super.update();   
            
            this.mobile.body.setZeroVelocity();

            if(this.keyboard.isDown(Phaser.KeyCode.W)) {
                this.mobile.body.moveUp(this.mobile.speed);
            }
            if(this.keyboard.isDown(Phaser.KeyCode.S)) {
                this.mobile.body.moveDown(this.mobile.speed);
            } 
            if(this.keyboard.isDown(Phaser.KeyCode.A)) {
                this.mobile.body.moveLeft(this.mobile.speed);
            }
            if(this.keyboard.isDown(Phaser.KeyCode.D)) {
                this.mobile.body.moveRight(this.mobile.speed);
            }                               
        }
    }
}