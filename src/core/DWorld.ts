namespace Darkworld.Core {
    export class DWorld {
        private customComponents:Array<Darkworld.Components.BaseComponent>;

        tileResolution:number;
        heightOfTheMapInTiles:number;
        tileMap: Darkworld.Core.DTileMap;
        game: Darkworld.DGame;
        mapHeight: number;
        mapWidth: number;
        player:Darkworld.Entities.Mobiles.Humanoids.Player;        

        constructor(game: Darkworld.DGame) {
            this.mapHeight = 38;//38
            this.mapWidth = 60;//60
            this.tileResolution = 64;
            this.game = game;            

            this.tileMap = new DTileMap(this.game, null, this.tileResolution, this.tileResolution, this.mapWidth, this.mapHeight);                       
        }

        

        addPlayer(isRandom: boolean, x?: number, y?: number) {
            let playerSpawnPoint: Phaser.Point;

            if (isRandom) {
                playerSpawnPoint = this.tileMap.getOpenCellPoint();
            } else if (x != null && y != null) {
                playerSpawnPoint = new Phaser.Point(x, y);
            } else{
                playerSpawnPoint = this.tileMap.getOpenCellPoint();
            }
            return this.player = new Darkworld.Entities.Mobiles.Humanoids.Player(this.game, playerSpawnPoint.x, playerSpawnPoint.y);
        }

        addComponent(component:Darkworld.Components.BaseComponent){
            if(this.customComponents == null){
                this.customComponents = [];
            }
            this.customComponents.push(component);
        }

        addComponents(components:Array<Darkworld.Components.BaseComponent>){
            components.forEach(component => {
                this.addComponent(component);
            });            
        }

        getComponent(givenComponentName:string):Darkworld.Components.BaseComponent{
            let foundComponent:Darkworld.Components.BaseComponent;
            this.customComponents.forEach(component => {
                if(component.name === givenComponentName){
                    foundComponent = component;
                }
            });
            return foundComponent;
        }

        update(){                      
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