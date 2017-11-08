namespace Darkworld.States {

    export class Preloader extends Phaser.State {
        preloadBar: Phaser.Sprite = null;

        preload() {            
            this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
            this.load.setPreloadSprite(this.preloadBar);

            this.load.spritesheet('tile_floor_forest', './../img/tiles/EasyTiles.png', 16, 16);
            this.load.spritesheet('tile_10', './../img/tiles/10.png', 16, 16);
            this.load.spritesheet('tile_floor_dungeon', './../img/tiles/floor_broken.png', 16, 16);
            this.load.image('playerImg', './../img/player.png');
        }

        create() {
            this.game.state.start("Main");
        }
    }
}
