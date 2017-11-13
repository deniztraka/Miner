namespace Darkworld.Core {
    export class DTileMarker extends Phaser.Graphics{
        constructor(game: Phaser.Game, x?: number, y?: number) {
            super(game, x, y);

            this.lineStyle(2, 0x000000, 1);
            this.drawRect(0, 0, 32, 32);  
            game.add.existing(this);      

        }
    }
}