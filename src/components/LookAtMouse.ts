namespace Darkworld.Components {
    export class LookAtMouse extends BaseComponent implements IComponent {
        private anglePreviousFrame: number;
        private game: DGame;
        private entity:Darkworld.Entities.Entity;
        private inputHandler:Darkworld.Engines.InputHandler;

        isEnabled: boolean;
        angleToPointer: number;
        timeOfLastTween: number;

        constructor(game: Darkworld.DGame,entity: Darkworld.Entities.Entity) {
            super("LookAtMouse");            
            this.game = game;
            this.entity = entity;

            this.inputHandler = new Darkworld.Engines.InputHandler(game);
            this.timeOfLastTween = 0;
        }

        update() {
            super.update();
                
            this.entity.rotation = this.inputHandler.getAngleFrom(this.entity);

            // if (this.game.time.elapsedSecondsSince(this.timeOfLastTween) >= 0.1) {

            //     this.game.add.tween(this.entity).to({ rotation: this.anglePreviousFrame }, 250, Phaser.Easing.Sinusoidal.Out, true);
               
            //     this.anglePreviousFrame = this.inputHandler.getAngleFrom(this.entity);
            //     this.timeOfLastTween = this.game.time.time;                
            // }
        }

        debugRender(){
            super.debugRender();
        };
    }
}