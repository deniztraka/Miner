namespace Darkworld.Entities.Mobiles.Humanoids{
    export class Humanoid extends Darkworld.Entities.Mobiles.Mobile {
        constructor(game:Darkworld.DGame,x:number,y:number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number){
            super(game,x,y,key,frame);
            
            
        }

        update(){
            super.update();
        };

        debugRender(){
            super.debugRender();
        };
    }
}