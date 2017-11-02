namespace Darkworld.Entities {
    export class Entity extends Phaser.Sprite {
        private customComponents:[Darkworld.Components.IComponent];
        constructor(game:Darkworld.DGame,x:number,y:number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number){
            super(game,x,y,key,frame);
            this.anchor.setTo(0.5,0.5);
            this.game.add.existing(this);
               
        }
        
        addComponent(component:Darkworld.Components.IComponent){
            this.customComponents.push(component);
        }

        update(){
            this.customComponents.forEach(component => {
                if(component.isEnabled){
                    component.update();
                }
            });
        }
    }
}