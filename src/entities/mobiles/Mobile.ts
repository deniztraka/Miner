namespace Darkworld.Entities.Mobiles{
    export class Mobile extends Darkworld.Entities.Entity {
        constructor(game:Darkworld.DGame,x:number,y:number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number){
            super(game,x,y,key,frame);
            
            
            
        }

        update(){
            super.update();
        };
    }
}