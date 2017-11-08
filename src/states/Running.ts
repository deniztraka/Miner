namespace Darkworld.States {
    export class Running extends Phaser.State {        
        floorLayer: Phaser.TilemapLayer;        
        mapHeight: number;
        mapWidth: number;
        player: Darkworld.Entities.Mobiles.Humanoids.Player;
        game:DGame;        

        preload() {

        }

        create() {                        
            this.mapHeight = 38;//38
            this.mapWidth = 50;//60
            this.game.physics.startSystem(Phaser.Physics.P2JS);

            this.game.worldMap = this.game.add.tilemap(null, 16, 16, this.mapWidth, this.mapHeight) as Darkworld.Core.DTileMap;
            //this.map.addTilesetImage("tile_floor_forest");
            this.game.worldMap.addTilesetImage("tile_floor_dungeon");
            //this.game.worldMap.addTilesetImage("tile_10");
            this.floorLayer = this.game.worldMap.create('floor', this.mapWidth, this.mapHeight, 16, 16);
            this.game.worldMap.blockingLayer  = this.game.worldMap.create('blocking', this.mapWidth, this.mapHeight, 16, 16);            
            this.game.worldMap.blockingLayer.key = "blockingLayer";
            this.floorLayer.resizeWorld();
            
            

            //fill map random
            //let randomTileMapData = new Darkworld.Data.RandomTileMapData(this.game, 4, 13, 50, 38);
            let cellularAutomataGenerator = new Darkworld.Data.CellularAutomata(this.game, this.mapWidth, this.mapHeight, 0.4, 3, 4);
            let randomTileMapData = cellularAutomataGenerator.generateMap(2, true);

            //fill with grass first
            for (var i = 0; i < randomTileMapData.length; i++) {
                for (var j = 0; j < randomTileMapData[i].length; j++) {
                    this.game.worldMap.putTile(this.game.rnd.integerInRange(0,64), i, j);//.alpha = 0;;
                }
            }

            // create blocking layer
            for (var i = 0; i < randomTileMapData.length; i++) {
                for (var j = 0; j < randomTileMapData[i].length; j++) {
                    if (randomTileMapData[i][j] == 1) {
                        var tile = this.game.worldMap.putTile(64, i, j, this.game.worldMap.blockingLayer);
                    }
                }
            }

            this.game.worldMap.enableTileMarker();
            this.game.worldMap.setCollision([64]);
            this.game.physics.p2.convertTilemap(this.game.worldMap, this.game.worldMap.blockingLayer);

            let openCellPoint:Phaser.Point;
            let openCellFound = false;
            while (!openCellFound) {
               
                var randomX = this.game.rnd.integerInRange(0, this.game.worldMap.width-1);
                var randomY = this.game.rnd.integerInRange(0, this.game.worldMap.height-1);

                
                let randomTile = this.game.worldMap.getTile(randomX,randomY);
                
                if (randomTile.index == 0) {
                    
                    openCellFound = true; //we found an open cell
                    openCellPoint = new Phaser.Point(randomTile.worldX+randomTile.width/2,randomTile.worldY+randomTile.height/2);
                }
            }

            this.player = new Darkworld.Entities.Mobiles.Humanoids.Player(this.game, openCellPoint.x, openCellPoint.y);
        }

        update() {
            
            

        }

        render() {
        }


    }
}