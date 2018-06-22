namespace Darkworld.Core {
    export class MouseIcon extends Phaser.Sprite {
        game: DGame;
        constructor(game: Darkworld.DGame, x?: number, y?: number) {
            super(game, x, y, "defaultIcon");
            this.game = game;
            this.anchor.setTo(0.5, 0.5);

            game.add.existing(this);

        }

        update() {
            if (this.game.dWorld == null || this.game.dWorld.tileMap == null) {
                return;
            }
            
            var currentTile = this.game.dWorld.tileMap.getTileWorldXY(
                this.game.input.activePointer.worldX,
                this.game.input.activePointer.worldY,
                this.game.dWorld.tileMap.tileWidth,
                this.game.dWorld.tileMap.tileHeight,
                this.game.dWorld.tileMap.blockingLayer) as Darkworld.Core.DTile;

            if (currentTile != null && this.game.dWorld.tileMap.destructableIndexes.indexOf(currentTile.index) > -1) {

                if (currentTile.isItCloseEnoughToPlayer()) {


                    //you can destruct it 
                    this.loadTexture("picaxeIcon");
                    this.alpha = 1;
                }
            } else {
                //this.alpha = 0;
                this.loadTexture("defaultIcon");
            }

        }
    }
}