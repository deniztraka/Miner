namespace Darkworld.Components {
    export abstract class BaseComponent implements IComponent {
        isEnabled: boolean;
        constructor() {
            this.isEnabled = true;
        }
        update() {

        };
        debugRender(){
           
        };
    }
}