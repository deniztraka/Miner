namespace Darkworld.Entities.Items{
    export class Chest extends Darkworld.Entities.Entity {
        level:number;
        fovDistance:number;
        constructor(game:Darkworld.DGame,x:number,y:number){
            super(game,x,y,"chests",null);            
            this.level = 0;
            this.fovDistance = 15;
            this.anchor.setTo(0.5,0.5);

            
            var fovComponent = new Darkworld.Components.Fov(game,this,0,0,'rgba(255, 191, 0, 1.0)','rgba(255, 191, 0, 0.0)',50);
            fovComponent.numberOfRays = 12;

            this.addComponents([fovComponent])
            
        }

        

        update(){
            super.update();
        };

        debugRender(){
            super.debugRender();
        };
    }
}