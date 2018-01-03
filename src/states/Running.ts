namespace Darkworld.States {
    export class Running extends Phaser.State {
        game: DGame;
        player: Darkworld.Entities.Mobiles.Humanoids.Player;
        preloadBar: Phaser.Sprite;

        preload() {

        }

        create() {
            this.game.physics.startSystem(Phaser.Physics.P2JS);

            this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
            this.load.setPreloadSprite(this.preloadBar);

            this.game.dWorld = new Darkworld.Core.DWorld(this.game);
            this.game.dWorld.addComponent(new Darkworld.Components.DayNightSystem(this.game));

            //start day night cycle
            let dayNightCycleComponent = this.game.dWorld.getComponent("DayNightSystem") as Darkworld.Components.DayNightSystem;
            if (dayNightCycleComponent != null) {
                //dayNightCycleComponent.startCycle();
            }

            this.player = this.game.dWorld.addPlayer(true);

            // let torch = new Darkworld.Entities.Items.Torch(this.game, 200, 200);

            // let torch1 = new Darkworld.Entities.Items.Torch(this.game,500,450);

            //this.player = new Darkworld.Entities.Mobiles.Humanoids.Player(this.game, 10, 20);
        }

        update() {
            if (this.game.dWorld) {
                this.game.dWorld.update();
                this.game.dWorld.debugRender();
            }
        }

        render() {
            this.game.debug.text(this.game.time.fps.toString() || '--', 2, 14, "#00ff00");
        }


    }
}