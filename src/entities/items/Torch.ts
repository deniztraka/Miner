namespace Darkworld.Entities.Items{
    export class Torch extends Darkworld.Entities.Entity {
        fovDistance:number;
        constructor(game:Darkworld.DGame,x:number,y:number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number){
            super(game,x,y,key,frame);            
            this.fovDistance = 15;
            this.addComponents([new Darkworld.Components.Fov(game,this,0,0,'rgba(255, 191, 0, 1.0)','rgba(255, 191, 0, 0.0)',50)])
        }

        

        update(){
            super.update();
        };

        debugRender(){
            super.debugRender();
        };
    }
}