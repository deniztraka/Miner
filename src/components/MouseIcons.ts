namespace Darkworld.Components {
    export class MouseIcons extends BaseComponent implements IComponent {
        private game: DGame;
        private entity: Darkworld.Entities.Entity;
        private inputHandler: Darkworld.Engines.InputHandler;
        private mouseIcon: Darkworld.Core.MouseIcon;

        isEnabled: boolean;
        angleToPointer: number;

        constructor(game: Darkworld.DGame, entity: Darkworld.Entities.Entity) {
            super("MouseIcons");
            this.game = game;
            this.entity = entity;
            this.inputHandler = new Darkworld.Engines.InputHandler(game);

            this.mouseIcon = new Darkworld.Core.MouseIcon(game, this.game.input.activePointer.worldX, this.game.input.activePointer.worldY);
        }

        update() {
            super.update();

            this.mouseIcon.position.x = this.game.input.activePointer.worldX;
            this.mouseIcon.position.y = this.game.input.activePointer.worldY;
            
        }

        debugRender() {
            super.debugRender();
        };
    }
}