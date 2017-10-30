namespace Darkworld {
    export class Running extends Phaser.State {
        map: Darkworld.Core.DTileMap = null;
        floorLayer: Phaser.TilemapLayer = null;

        preload() {

        }

        create() {
            this.map = this.game.add.tilemap() as Darkworld.Core.DTileMap;
            this.map.addTilesetImage("tile_floor_forest");
            this.floorLayer = this.map.create('floor', 40, 30, 16, 16);
            this.floorLayer.resizeWorld();

            //fill map random
            let randomTileMapData = new Darkworld.Data.RandomTileMapData(this.game, 0, 0, 40, 30);
            for (var i = 0; i < randomTileMapData.data.length; i++) {
                for (var j = 0; j < randomTileMapData.data[i].length; j++) {
                    this.map.putTile(randomTileMapData.data[i][j], i, j);
                }
            }

            this.map.enableTileMarker();

            console.log(this.map);
        }
    }
}