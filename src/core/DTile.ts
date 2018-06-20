namespace Darkworld.Core {

    export class DTile extends Phaser.Tile implements Darkworld.Components.IComponentBehaviour {
        
        public customComponents: Array<Darkworld.Components.IComponent>;
        name: string;
        lastAlphaCheckTime: number = 0;
        checked = false;
        show = true;
        isVisible = true;
        isTweening = false;
        game:DGame;

        constructor(layer: any, index: number, x: number, y: number, width: number, height: number,game:DGame) {

            super(layer, index, x, y, width, height);
            this.game = game;
            this.customComponents = [];

            this.addComponents([
                
            ]);
        }

        clicked(): any {
            console.log("Method not implemented.");
        }

        addComponent(component: Darkworld.Components.IComponent) {
            this.customComponents.push(component);
        }

        addComponents(components: Array<Darkworld.Components.IComponent>) {
            components.forEach(component => {
                this.addComponent(component);
            });
        }

        getComponent(name: string): Darkworld.Components.IComponent {
            var component: Darkworld.Components.IComponent;
            this.customComponents.forEach(c => {
                if (c.name == name) {
                    component = c;
                }
            });
            return component;
        }

        update() {

            this.customComponents.forEach(component => {
                if (component.isEnabled) {
                    component.update();
                }
            });

            this.debugRender();
        }

        debugRender() {
            this.customComponents.forEach(component => {
                if (component.isEnabled) {
                    component.debugRender();
                }
            });
        }
    }
}