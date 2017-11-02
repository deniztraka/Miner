namespace Darkworld.States {

    export class Boot extends Phaser.State {

        preload() {

        }

        create() {
            this.load.image('preloaderBar', './../img/preloader-bar.png');

            // Disable multitouch
            this.input.maxPointers = 1;

            // Pause if browser tab loses focus
            this.stage.disableVisibilityChange = false;

            if (this.game.device.desktop) {
                // Desktop settings
            } else {
                // Mobile settings
            }
                        
            this.game.state.start("Preloader");
        }
    }
}
