namespace Darkworld.Components{
    export interface IComponent {
        isEnabled:boolean;        
        update():void; 
        debugRender():void;       
    }
}