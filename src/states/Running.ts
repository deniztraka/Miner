namespace Darkworld.States {
    export class Running extends Phaser.State {
        game: DGame;
        player: Darkworld.Entities.Mobiles.Humanoids.Player;
        preloadBar: Phaser.Sprite;

        preload() {

        }

        create() {
            this.game.stage.disableVisibilityChange = true;
            this.game.physics.startSystem(Phaser.Physics.P2JS);

            this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
            this.load.setPreloadSprite(this.preloadBar);

            debugger;
            this.game.dWorld = new Darkworld.Core.DWorld(this.game);
            this.game.dWorld.tileMap.enableTileMarker();
            //this.game.dWorld.addComponent(new Darkworld.Components.DayNightSystem(this.game));

            //start day night cycle asdasd
            // let dayNightCycleComponent = this.game.dWorld.getComponent("DayNightSystem") as Darkworld.Components.DayNightSystem;
            // if (dayNightCycleComponent != null) {
            //     //dayNightCycleComponent.startCycle();
            // } 
  
            this.player = this.game.dWorld.addPlayer(true,96,96);

            //this.game.dWorld.tileMap.putDTile(this.player);

            // let torch = new Darkworld.Entities.Items.Torch(this.game, this.player.x+50, this.player.y+50);

            // let torch1 = new Darkworld.Entities.Items.Torch(this.game,500,450);


        }

        update() {
            this.game.dWorld.update();
            this.game.dWorld.debugRender();
        }

        render() {
            this.game.debug.text(this.game.time.fps.toString() || '--', 2, 14, "#00ff00");
        }


    }
}