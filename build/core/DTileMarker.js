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
        var DTileMarker = /** @class */ (function (_super) {
            __extends(DTileMarker, _super);
            function DTileMarker(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.lineStyle(2, 0x000000, 1);
                _this.drawRect(0, 0, 16, 16);
                game.add.existing(_this);
                return _this;
            }
            return DTileMarker;
        }(Phaser.Graphics));
        Core.DTileMarker = DTileMarker;
    })(Core = Darkworld.Core || (Darkworld.Core = {}));
})(Darkworld || (Darkworld = {}));
//# sourceMappingURL=DTileMarker.js.map