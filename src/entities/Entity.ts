namespace Darkworld.Entities {
    export class Entity extends Phaser.Sprite {
        constructor(game:Darkworld.DGame,x:number,y:number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number){
            super(game,x,y,key,frame);
            
            
        }
    }
}