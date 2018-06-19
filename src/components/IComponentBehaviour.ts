namespace Darkworld.Components {
    export interface IComponentBehaviour {
        addComponent(component: Darkworld.Components.IComponent): void;
        addComponents(components: Array<Darkworld.Components.IComponent>): void;
        update(): void;
        debugRender(): void;
    }
}