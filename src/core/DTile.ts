namespace Darkworld.Core {

    export class DTile extends Phaser.Tile implements Darkworld.Components.IComponentBehaviour {

        public customComponents: Array<Darkworld.Components.IComponent>;
        name: string;
        lastAlphaCheckTime: number = 0;
        checked = false;
        show = true;
        isVisible = true;
        isTweening = false;
        game: DGame;

        constructor(layer: any, index: number, x: number, y: number, width: number, height: number, game: DGame) {

            super(layer, index, x, y, width, height);
            this.game = game;
            this.customComponents = [];

            this.addComponents([

            ]);
        }

        isItCloseEnoughToPlayer(): boolean {

            var distanceFromPlayer = Phaser.Math.distance(this.game.player.position.x, this.game.player.position.y, this.worldX + this.width / 2, this.worldY + this.height / 2); // 103.07764064044152
            return distanceFromPlayer <= 50;
        }

        clicked(): any {

            //if it is a destructable index
            if (this.game.dWorld.tileMap.destructableIndexes.indexOf(this.index) == -1) {
                return;
            }

            debugger;
            if (!this.isItCloseEnoughToPlayer()) {
                return;
            }



            this.game.dWorld.tileMap.removeTile(this.x, this.y, this.game.dWorld.tileMap.blockingLayer);
            this.game.dWorld.tileMap.putTile(this.game.rnd.integerInRange(Darkworld.Utils.TileSetIndex.Dungeon.FloorStart, Darkworld.Utils.TileSetIndex.Dungeon.FloorEnd), this.x, this.y, this.game.dWorld.tileMap.floorLayer);//.alpha = 0;;
            this.game.dWorld.tileMap.updateCollisions();

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