namespace Darkworld.Entities {
    export class Entity extends Phaser.Sprite {
        private customComponents:Array<Darkworld.Components.IComponent>;
        constructor(game:Darkworld.DGame,x:number,y:number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number){
            super(game,x,y,key,frame);
            this.anchor.setTo(0.5,0.5);
            this.game.add.existing(this);

            this.customComponents = new Array<Darkworld.Components.IComponent>();
               
        }
        
        addComponent(component:Darkworld.Components.IComponent){
            this.customComponents.push(component);
        }

        addComponents(components:Array<Darkworld.Components.IComponent>){
            components.forEach(component => {
                this.addComponent(component);
            });            
        }

        update(){
            super.update();            
            this.customComponents.forEach(component => {
                if(component.isEnabled){                    
                    component.update();
                }
            });

            this.debugRender();
        }

        debugRender(){                             
            this.customComponents.forEach(component => {
                if(component.isEnabled){                    
                    component.debugRender();
                }
            });
        }
    }
}