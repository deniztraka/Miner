namespace Darkworld.Core {
    export class DTileMarker extends Phaser.Graphics{
        constructor(game: Darkworld.DGame, x?: number, y?: number) {
            super(game, x, y);

            this.lineStyle(2, 0x000000, 1);
            this.drawRect(0, 0, 64, 64);  
            game.add.existing(this);      

        }

        update(){
            
        }
    }
}