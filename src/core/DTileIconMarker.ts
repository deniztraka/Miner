namespace Darkworld.Core {
    export class DTileIconMarker extends Phaser.Sprite{
        game:DGame;
        constructor(game: Darkworld.DGame, x?: number, y?: number) {
            super(game, x, y,"picaxeIcon");
            this.game = game;
            this.anchor.setTo(0.5,0.5);
           
            game.add.existing(this);      

        }

        update(){
            
        }
    }
}