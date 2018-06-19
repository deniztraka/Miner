namespace Darkworld.Components {
    export class OnTileClick extends BaseComponent implements IComponent {
       
        private game: DGame;
        private dTile:Darkworld.Core.DTile;

        isEnabled: boolean;
        angleToPointer: number;
        timeOfLastTween: number;

        constructor(game: Darkworld.DGame,dTile: Darkworld.Core.DTile) {
            super("OnTileClick");            
            this.game = game;
            this.dTile = dTile;            
        }

        update() {
            super.update();
            //console.log(this.dTile);
            if (this.game.input.activePointer.isDown) {
                //console.log("x:"+currentTile.x+", y:"+currentTile.y + ", isVisible:" + currentTile.isVisible + ", alpha:" + currentTile.alpha + ", isTweening" + currentTile.isTweening);
                //console.log(this.dTile);
                // currentTile.
                // currentTile.onClick();
                // currentTile.
            }
        }

        debugRender(){
            super.debugRender();
        };
    }
}