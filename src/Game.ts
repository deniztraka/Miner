namespace Darkworld {

    export class DGame extends Phaser.Game { 
        dWorld:Darkworld.Core.DWorld;  
        player:Darkworld.Entities.Mobiles.Humanoids.Player;      
        
        constructor() {
            super(800, 608, Phaser.AUTO);            
            this.state.add("Boot", Darkworld.States.Boot);
            this.state.add("Preloader", Darkworld.States.Preloader);
            this.state.add("Main", Darkworld.States.Main);
            this.state.add("Running", Darkworld.States.Running);

            this.state.start("Boot");            
        }

        boot() {
            super.boot();
            this.add = new Darkworld.Core.DGameObjectFactory(this);
        }
        
    }
}
