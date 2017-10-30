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
    var Running = /** @class */ (function (_super) {
        __extends(Running, _super);
        function Running() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.map = null;
            return _this;
        }
        Running.prototype.preload = function () {
        };
        Running.prototype.create = function () {
            this.map = this.game.add.tilemap();
            console.log(this.game.add);
            console.log(this.game);
            console.log(this.map);
        };
        return Running;
    }(Phaser.State));
    Darkworld.Running = Running;
})(Darkworld || (Darkworld = {}));
//# sourceMappingURL=Running.js.map