namespace Darkworld.Components{
    export interface IComponent {
        isEnabled:boolean;        
        name:string;     
        update():void; 
        debugRender():void;       
    }
}