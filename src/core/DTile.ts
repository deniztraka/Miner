namespace Darkworld.Core {
    export class DTile extends Phaser.Tile {

        lastAlphaCheckTime: number = 0;
        checked = false;
        show = true;
        isVisible = true;
        isTweening = false;

    }
}