namespace Darkworld {

    export class Running extends Phaser.State {
        map: any = null;


        preload() {

        }

        create(){
            this.map = this.game.add.tilemap();
            console.log(this.game.add);
            console.log(this.game);
            console.log(this.map);
        }
    }

}