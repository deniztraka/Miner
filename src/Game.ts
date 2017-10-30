namespace Darkworld {

    export class DGame extends Phaser.Game {        
        constructor() {
            super(800, 600, Phaser.AUTO);            
            this.state.add("Boot", Darkworld.Boot);
            this.state.add("Preloader", Darkworld.Preloader);
            this.state.add("Main", Darkworld.Main);
            this.state.add("Running", Darkworld.Running);

            this.state.start("Boot");            
        }

        boot() {
            super.boot();
            this.add = new  Darkworld.Core.DGameObjectFactory(this);
        }
        
    }
}
