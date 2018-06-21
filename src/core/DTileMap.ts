namespace Darkworld.Core {
    export class DTileMap extends Phaser.Tilemap {
        marker: DTileMarker;
        blockingLayer: Phaser.TilemapLayer;
        floorLayer: Phaser.TilemapLayer;
        game: DGame;
        collisionIndexes: number[] = [Darkworld.Utils.TileSetIndex.Cave.Stone, Darkworld.Utils.TileSetIndex.Cave.BadRock];
        destructableIndexes: number[] = [Darkworld.Utils.TileSetIndex.Cave.Stone];

        constructor(game: DGame, key?: string, tileWidth?: number, tileHeight?: number, width?: number, height?: number) {
            super(game, key, tileWidth, tileHeight, width, height);

            this.game = game;
            //this.map.addTilesetImage("tile_floor_forest");
            //this.addTilesetImage("tile_floor_dungeon");
            //this.addTilesetImage("tile_floor_dungeon_32x32");
            //this.addTilesetImage("tile_floor_dungeon_64x64_fov");
            this.addTilesetImage("cave");
            //this.game.worldMap.addTilesetImage("tile_10");
            this.floorLayer = this.createBlankLayer('floor', this.width, this.height, this.tileWidth, this.tileHeight);
            this.blockingLayer = this.createBlankLayer('blocking', this.width, this.height, this.tileWidth, this.tileHeight);
            this.blockingLayer.key = "blockingLayer";
            this.floorLayer.resizeWorld();

            //fill map random
            //let randomTileMapData = new Darkworld.Data.RandomTileMapData(this.game, 4, 13, 50, 38);
            let cellularAutomataGenerator = new Darkworld.Data.CellularAutomata(this.game, this.width, this.height, 0.45, 3, 4);
            let randomTileMapData = cellularAutomataGenerator.generateMap(true);
            console.log(randomTileMapData.join("\n "));



            // let customMapDataGenerator = new Darkworld.Data.TestCustomMap();
            // let randomTileMapData = customMapDataGenerator.generateMap(true);

            //fill with floor first
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    this.putTile(this.game.rnd.integerInRange(Darkworld.Utils.TileSetIndex.Cave.FloorStart, Darkworld.Utils.TileSetIndex.Cave.FloorEnd), i, j);//.alpha = 0;;
                }
            }



            // create blocking layer
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    if (randomTileMapData[i][j] == 1) {
                        this.putTile(Darkworld.Utils.TileSetIndex.Cave.Stone, i, j, this.blockingLayer);
                    }
                }
            }

            //filling sides with badrock
            for (var x = 0; x < this.width; x++) {
                for (var y = 0; y < this.height; y++) {
                    if (x == 0 || y == 0 || x == this.width - 1 || y == this.height - 1) {
                        this.putTile(Darkworld.Utils.TileSetIndex.Cave.BadRock, x, y, this.blockingLayer);
                    }
                }
            }




            this.setCollision(this.collisionIndexes);
            this.game.physics.p2.convertTilemap(this, this.blockingLayer);
        }

        countBlockingNeighbours(x: number, y: number): number {
            let count = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    let neighbour_x = x + i;
                    let neighbour_y = y + j;
                    //If we're looking at the middle point
                    if (i == 0 && j == 0) {
                        //Do nothing, we don't want to add ourselves in!
                    }
                    //In case the index we're looking at it off the edge of the map
                    else if (neighbour_x < 0 || neighbour_y < 0 || neighbour_x >= this.width || neighbour_y >= this.height) {
                        count = count + 1;
                    }
                    //Otherwise, a normal check of the neighbour
                    else {
                        var tile = this.getTile(neighbour_x, neighbour_y, this.blockingLayer);
                        if (this.collideIndexes.indexOf(tile.index) > -1) {
                            count = count + 1;
                        }
                    }
                }
            }
            return count;
        }

        /* Private Methods */
        private updateMarker() {

            var currentTile = this.getTileWorldXY(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, this.tileWidth, this.tileHeight, this.blockingLayer) as Darkworld.Core.DTile;
            if (currentTile != null && this.destructableIndexes.indexOf(currentTile.index) > -1) {
                this.marker.alpha = 1;
                this.marker.x = currentTile.x * this.tileWidth;
                this.marker.y = currentTile.y * this.tileHeight;

                if (this.game.input.activePointer.isDown) {
                    currentTile.clicked();
                }
            } else {
                this.marker.alpha = 0;
            }
        }

        updateCollisions() {
            this.game.physics.p2.convertTilemap(this, this.blockingLayer);
        }

        /* Public Methods */
        enableTileMarker() {

            this.marker = new DTileMarker(this.game);
            this.game.input.addMoveCallback(this.updateMarker, this);
        }

        putTile(tile: any, x: number, y: number, layer?: any): Darkworld.Core.DTile {
            if (tile === null) {
                return this.removeTile(x, y, layer) as DTile;
            }

            layer = this.getLayer(layer);

            if (x >= 0 && x < this.layers[layer].width && y >= 0 && y < this.layers[layer].height) {
                var index: any;

                if (tile instanceof Darkworld.Core.DTile) {
                    index = tile.index;

                    if (this.hasTile(x, y, layer)) {
                        this.layers[layer].data[y][x].copy(tile);
                    } else {
                        this.layers[layer].data[y][x] = new Darkworld.Core.DTile(layer, index, x, y, this.tileWidth, this.tileHeight, this.game);
                    }
                } else {
                    index = tile;

                    if (this.hasTile(x, y, layer)) {
                        this.layers[layer].data[y][x].index = index;
                    } else {
                        this.layers[layer].data[y][x] = new Darkworld.Core.DTile(this.layers[layer], index, x, y, this.tileWidth, this.tileHeight, this.game);
                    }
                }

                if (this.collideIndexes.indexOf(index) > -1) {
                    this.layers[layer].data[y][x].setCollision(true, true, true, true);
                } else {
                    this.layers[layer].data[y][x].resetCollision();
                }

                this.layers[layer].dirty = true;

                this.calculateFaces(layer);

                return this.layers[layer].data[y][x];
            }
            return null;
        }

        getOpenCellPoint(): Phaser.Point {
            let openCellPoint: Phaser.Point;
            let openCellFound = false;
            while (!openCellFound) {

                var randomX = this.game.rnd.integerInRange(0, this.width - 1);
                var randomY = this.game.rnd.integerInRange(0, this.height - 1);


                let randomTile = this.getTile(randomX, randomY);

                if (this.collisionIndexes.indexOf(randomTile.index) == -1) {

                    openCellFound = true; //we found an open cell
                    openCellPoint = new Phaser.Point(randomTile.worldX + randomTile.width / 2, randomTile.worldY + randomTile.height / 2);
                }
            }

            return openCellPoint;
        }

        getDTilesArray(layer: Phaser.TilemapLayer): Darkworld.Core.DTile[] {
            let tiles: Darkworld.Core.DTile[] = [];
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    var tile = this.getTile(i, j, layer.name) as Darkworld.Core.DTile;
                    if (tile != null) {
                        //debugger;
                        tiles.push(tile);
                    }

                }
            }

            return tiles;
        }

        update() {
            //Check tile show/hide
            // var self = this;
            // this.layers.forEach(function(layer){

            //     var tiles = self.getDTilesArray(layer) as Darkworld.Core.DTile[];
            //     tiles.forEach(tile => {
            //         //debugger;
            //         tile.update();


            //     });
            // });

        }
    }
}