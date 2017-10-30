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
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
        };
        Boot.prototype.create = function () {
            // Disable multitouch
            this.input.maxPointers = 1;
            // Pause if browser tab loses focus
            this.stage.disableVisibilityChange = false;
            if (this.game.device.desktop) {
                // Desktop settings
            }
            else {
                // Mobile settings
            }
            this.game.state.start("Preloader");
        };
        return Boot;
    }(Phaser.State));
    Darkworld.Boot = Boot;
})(Darkworld || (Darkworld = {}));
//# sourceMappingURL=Boot.js.map