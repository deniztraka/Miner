namespace Darkworld.States {
    export class Running extends Phaser.State {                
        game:DGame;        
        player:Darkworld.Entities.Mobiles.Humanoids.Player;

        preload() {

        }

        create() {                        
            this.game.physics.startSystem(Phaser.Physics.P2JS);

            this.game.dWorld = new Darkworld.Core.DWorld(this.game);                        
            this.game.dWorld.addComponent(new Darkworld.Components.DayNightSystem(this.game)); 

            this.player = this.game.dWorld.addPlayer(true);

            let torch = new Darkworld.Entities.Items.Torch(this.game,200,200);

            let torch1 = new Darkworld.Entities.Items.Torch(this.game,500,450);

                       
        }

        update() {
            this.game.dWorld.update();            
            this.game.dWorld.debugRender();
        }

        render() {
            
        }


    }
}