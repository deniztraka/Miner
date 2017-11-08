namespace Darkworld.Components {
    export abstract class BaseComponent implements IComponent {
        isEnabled: boolean;  
        name:string;      
        constructor(name:string) {
            this.isEnabled = true;
            this.name = name;
        }
        update() {

        };
        debugRender(){
           
        };
    }
}