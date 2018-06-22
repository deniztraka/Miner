namespace Darkworld.Core {
    export class DTileMarker extends Phaser.Graphics{
        game:DGame;
        icon:Phaser.Sprite;
        constructor(game: Darkworld.DGame, x?: number, y?: number) {
            super(game, x, y);
            this.game = game;
            this.beginFill
            this.lineStyle(2, 0x000000, 0.5);
            this.beginFill(0x000000, 0.1);
            this.drawRect(0, 0, this.game.dWorld.tileMap.tileWidth, this.game.dWorld.tileMap.tileHeight); 
            this.endFill();
            game.add.existing(this);     
            //this.icon =  new DTileIconMarker(game,x,y);

        }

        update(){
            
        }
    }
}