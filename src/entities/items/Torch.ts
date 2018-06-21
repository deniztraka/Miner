namespace Darkworld.Entities.Items{
    export class Torch extends Darkworld.Entities.Entity {
        fovDistance:number;
        constructor(game:Darkworld.DGame,x:number,y:number){
            super(game,x,y,null,null);            
            this.fovDistance = 15;

            var fovComponent = new Darkworld.Components.Fov(game,this,0,0,'rgba(255, 191, 0, 1.0)','rgba(255, 191, 0, 0.0)',50);            

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