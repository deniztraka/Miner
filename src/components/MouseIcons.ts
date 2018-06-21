namespace Darkworld.Components {
    export class MouseIcons extends BaseComponent implements IComponent {        
        private game: DGame;
        private entity:Darkworld.Entities.Entity;
        private inputHandler:Darkworld.Engines.InputHandler;

        isEnabled: boolean;
        angleToPointer: number;
        timeOfLastTween: number;

        constructor(game: Darkworld.DGame,entity: Darkworld.Entities.Entity) {
            super("MouseIcons");            
            this.game = game;
            this.entity = entity;

            this.inputHandler = new Darkworld.Engines.InputHandler(game);
            this.timeOfLastTween = 0;
        }

        update() {
            super.update();
                
            
        }

        debugRender(){
            super.debugRender();
        };
    }
}