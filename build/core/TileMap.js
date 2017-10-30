var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Darkworld;
(function (Darkworld) {
    var Core;
    (function (Core) {
        var DTileMap = /** @class */ (function (_super) {
            __extends(DTileMap, _super);
            function DTileMap(game, key, tileWidth, tileHeight, width, height) {
                return _super.call(this, game, key, tileWidth, tileHeight, width, height) || this;
            }
            DTileMap.prototype._updateMarker = function () {
                var currentTile = this.getTileWorldXY(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, 16, 16);
                if (currentTile != null) {
                    this.marker.x = currentTile.x * 16;
                    this.marker.y = currentTile.y * 16;
                }
            };
            DTileMap.prototype.enableTileMarker = function () {
                this.marker = new Core.DTileMarker(this.game);
                this.game.input.addMoveCallback(this._updateMarker, this);
            };
            DTileMap.prototype.putTile = function (tile, x, y, layer) {
                if (tile === null) {
                    return this.removeTile(x, y, layer);
                }
                layer = this.getLayer(layer);
                if (x >= 0 && x < this.layers[layer].width && y >= 0 && y < this.layers[layer].height) {
                    var index;
                    if (tile instanceof Darkworld.Core.DTile) {
                        index = tile.index;
                        if (this.hasTile(x, y, layer)) {
                            this.layers[layer].data[y][x].copy(tile);
                        }
                        else {
                            this.layers[layer].data[y][x] = new Darkworld.Core.DTile(layer, index, x, y, tile.width, tile.height);
                        }
                    }
                    else {
                        index = tile;
                        if (this.hasTile(x, y, layer)) {
                            this.layers[layer].data[y][x].index = index;
                        }
                        else {
                            this.layers[layer].data[y][x] = new Darkworld.Core.DTile(this.layers[layer], index, x, y, this.tileWidth, this.tileHeight);
                        }
                    }
                    if (this.collideIndexes.indexOf(index) > -1) {
                        this.layers[layer].data[y][x].setCollision(true, true, true, true);
                    }
                    else {
                        this.layers[layer].data[y][x].resetCollision();
                    }
                    this.layers[layer].dirty = true;
                    this.calculateFaces(layer);
                    return this.layers[layer].data[y][x];
                }
                return null;
            };
            return DTileMap;
        }(Phaser.Tilemap));
        Core.DTileMap = DTileMap;
    })(Core = Darkworld.Core || (Darkworld.Core = {}));
})(Darkworld || (Darkworld = {}));
//# sourceMappingURL=TileMap.js.map