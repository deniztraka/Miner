namespace Darkworld.States {
    export class Running extends Phaser.State {
        map: Darkworld.Core.DTileMap = null;
        floorLayer: Phaser.TilemapLayer = null;

        preload() {

        }

        create() {
            this.map = this.game.add.tilemap(null,16,16,40,30) as Darkworld.Core.DTileMap;
            this.map.addTilesetImage("tile_floor_forest");
            this.floorLayer = this.map.create('floor', 40, 30, 16, 16);
            this.floorLayer.resizeWorld();

            //fill map random
            let randomTileMapData = new Darkworld.Data.RandomTileMapData(this.game, 4, 13, 40, 30);
            for (var i = 0; i < randomTileMapData.data.length; i++) {
                for (var j = 0; j < randomTileMapData.data[i].length; j++) {
                    this.map.putTile(randomTileMapData.data[i][j], i, j);
                }
            }

            this.map.enableTileMarker();


            var player = new Darkworld.Entities.Mobiles.Humanoids.Player(this.game,30,40);
        }
    }
}