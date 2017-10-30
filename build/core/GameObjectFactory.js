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
        var DGameObjectFactory = /** @class */ (function (_super) {
            __extends(DGameObjectFactory, _super);
            function DGameObjectFactory() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            DGameObjectFactory.prototype.tilemap = function (key, tileWidth, tileHeight, width, height) {
                return new Darkworld.Core.DTileMap(this.game, key, tileWidth, tileHeight, width, height);
            };
            ;
            return DGameObjectFactory;
        }(Phaser.GameObjectFactory));
        Core.DGameObjectFactory = DGameObjectFactory;
    })(Core = Darkworld.Core || (Darkworld.Core = {}));
})(Darkworld || (Darkworld = {}));
//# sourceMappingURL=GameObjectFactory.js.map