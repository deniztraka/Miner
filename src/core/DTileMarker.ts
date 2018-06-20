namespace Darkworld.Core {
    export class DTileMarker extends Phaser.Graphics{
        game:DGame;
        constructor(game: Darkworld.DGame, x?: number, y?: number) {
            super(game, x, y);
            this.game = game;
            this.lineStyle(2, 0x000000, 1);
            this.drawRect(0, 0, this.game.dWorld.tileMap.tileWidth, this.game.dWorld.tileMap.tileHeight);  
            game.add.existing(this);      

        }

        update(){
            
        }
    }
}