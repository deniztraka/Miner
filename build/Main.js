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
    var Main = /** @class */ (function (_super) {
        __extends(Main, _super);
        function Main() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Main.prototype.create = function () {
            var _this = this;
            var lines = [
                "click to enter",
                "",
                "we create worlds you don't want to live in",
                "dtworlds"
            ];
            var textStyle = {
                fill: "rgb(105, 105, 105)",
                font: "px437_ati_8x16regular",
                fontSize: 24
            };
            var y = this.game.height - textStyle.fontSize - 20; // - (lines.length * 20);
            for (var _i = 0, _a = lines.reverse(); _i < _a.length; _i++) {
                var line = _a[_i];
                this.game.add.text(20, y, line, textStyle);
                y -= textStyle.fontSize;
            }
            this.input.onTap.addOnce(function () {
                _this.state.start("Running");
            });
        };
        return Main;
    }(Phaser.State));
    Darkworld.Main = Main;
})(Darkworld || (Darkworld = {}));
//# sourceMappingURL=Main.js.map