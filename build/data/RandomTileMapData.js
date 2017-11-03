var Darkworld;
(function (Darkworld) {
    var Data;
    (function (Data) {
        var RandomTileMapData = /** @class */ (function () {
            function RandomTileMapData(game, min, max, width, height) {
                this.data = [];
                for (var i = 0; i < width; i++) {
                    this.data[i] = [];
                    for (var j = 0; j < height; j++) {
                        this.data[i][j] = game.rnd.integerInRange(min, max);
                    }
                }
            }
            return RandomTileMapData;
        }());
        Data.RandomTileMapData = RandomTileMapData;
    })(Data = Darkworld.Data || (Darkworld.Data = {}));
})(Darkworld || (Darkworld = {}));
//# sourceMappingURL=RandomTileMapData.js.map