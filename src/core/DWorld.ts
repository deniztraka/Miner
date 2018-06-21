namespace Darkworld.Core {
    export class DWorld {
        private customComponents: Array<Darkworld.Components.BaseComponent>;

        tileResolution: number;
        heightOfTheMapInTiles: number;
        tileMap: Darkworld.Core.DTileMap;
        game: Darkworld.DGame;
        mapHeight: number;
        mapWidth: number;
        player: Darkworld.Entities.Mobiles.Humanoids.Player;
        treasureHiddenLimit: number;
        treasureCount:number;

        constructor(game: Darkworld.DGame) {
            this.mapHeight = 50;//38
            this.mapWidth = 50;//60
            this.tileResolution = 64;
            this.customComponents = [];
            this.game = game;
            this.tileMap = new DTileMap(this.game, null, this.tileResolution, this.tileResolution, this.mapWidth, this.mapHeight);
            this.treasureHiddenLimit = 6;
            this.treasureCount = 0;
        }

        placeTreasures() {
            //How hidden does a spot need to be for treasure?
            //I find 5 or 6 is good. 6 for very rare treasure.
            for (var x = 0; x < this.tileMap.width; x++) {
                for (var y = 0; y < this.tileMap.height; y++) {
                    var tile = this.tileMap.getTile(x, y, this.tileMap.blockingLayer);
                    if (this.tileMap.collideIndexes.indexOf(tile.index) == -1) {
                        var nbs = this.tileMap.countBlockingNeighbours(x, y);
                        if (nbs >= this.treasureHiddenLimit) {
                            this.placeTreasure(tile.worldX, tile.worldY);
                        }
                    }
                }
            }     
            
            console.log(this.treasureCount);
        }

        placeTreasure(x: number, y: number) {
            //this.tileMap.putTile(Darkworld.Utils.TileSetIndex.Cave.BloodRock, x, y, this.tileMap.blockingLayer);
            //let torch = new Darkworld.Entities.Items.Torch(this.game, x+this.tileMap.tileWidth/2, y+this.tileMap.tileHeight/2);
            var chest = new Darkworld.Entities.Items.Chest(this.game,x+this.tileMap.tileWidth/2,y+this.tileMap.tileHeight/2);
            
            this.treasureCount++;
        }


        addPlayer(isRandom: boolean, x?: number, y?: number) {
            let playerSpawnPoint: Phaser.Point;

            if (isRandom) {
                playerSpawnPoint = this.tileMap.getOpenCellPoint();
            } else if (x != null && y != null) {
                playerSpawnPoint = new Phaser.Point(x, y);
            } else {
                playerSpawnPoint = this.tileMap.getOpenCellPoint();
            }
            return this.player = new Darkworld.Entities.Mobiles.Humanoids.Player(this.game, playerSpawnPoint.x, playerSpawnPoint.y);
        }

        addComponent(component: Darkworld.Components.BaseComponent) {
            if (this.customComponents == null) {
                this.customComponents = [];
            }
            this.customComponents.push(component);
        }

        addComponents(components: Array<Darkworld.Components.BaseComponent>) {
            components.forEach(component => {
                this.addComponent(component);
            });
        }

        getComponent(givenComponentName: string): Darkworld.Components.BaseComponent {
            let foundComponent: Darkworld.Components.BaseComponent;
            this.customComponents.forEach(component => {
                if (component.name === givenComponentName) {
                    foundComponent = component;
                }
            });
            return foundComponent;
        }

        update() {
            this.customComponents.forEach(component => {
                if (component.isEnabled) {
                    component.update();
                }
            });


            this.tileMap.update();

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