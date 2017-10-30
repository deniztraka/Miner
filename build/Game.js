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
    var DGame = /** @class */ (function (_super) {
        __extends(DGame, _super);
        function DGame() {
            var _this = _super.call(this, 800, 600, Phaser.AUTO) || this;
            _this.state.add("Boot", Darkworld.Boot);
            _this.state.add("Preloader", Darkworld.Preloader);
            _this.state.add("Main", Darkworld.Main);
            _this.state.add("Running", Darkworld.Running);
            _this.state.start("Boot");
            return _this;
        }
        DGame.prototype.boot = function () {
            _super.prototype.boot.call(this);
            this.add = new Darkworld.Core.DGameObjectFactory(this);
        };
        return DGame;
    }(Phaser.Game));
    Darkworld.DGame = DGame;
})(Darkworld || (Darkworld = {}));
//# sourceMappingURL=Game.js.map