namespace Darkworld.States {
    export class Running extends Phaser.State {
        map: Darkworld.Core.DTileMap = null;
        floorLayer: Phaser.TilemapLayer = null;
        mapHeight: number;
        mapWidth: number;
        player:Darkworld.Entities.Mobiles.Humanoids.Player;

        preload() {

        }

        create() {
            this.mapHeight = 100;//38
            this.mapWidth = 100;//60
            this.game.physics.startSystem(Phaser.Physics.P2JS);

            this.map = this.game.add.tilemap(null, 16, 16, this.mapWidth, this.mapHeight) as Darkworld.Core.DTileMap;
            //this.map.addTilesetImage("tile_floor_forest");
            this.map.addTilesetImage("tile_10");
            this.floorLayer = this.map.create('floor', this.mapWidth, this.mapHeight, 16, 16);
            this.floorLayer.resizeWorld();

            //fill map random
            //let randomTileMapData = new Darkworld.Data.RandomTileMapData(this.game, 4, 13, 50, 38);
            let cellularAutomataGenerator = new Darkworld.Data.CellularAutomata(this.game, this.mapWidth, this.mapHeight, 0.4, 3, 4);
            let randomTileMapData = cellularAutomataGenerator.generateMap(2, true);
            for (var i = 0; i < randomTileMapData.length; i++) {
                for (var j = 0; j < randomTileMapData[i].length; j++) {
                    this.map.putTile(randomTileMapData[i][j], i, j);
                }
            }

            this.map.enableTileMarker();
            this.map.setCollision([1]);


            this.player = new Darkworld.Entities.Mobiles.Humanoids.Player(this.game, 30, 40);

            this.game.physics.p2.convertTilemap(this.map, this.floorLayer);

        }

        update(){
            
        }
    }
}