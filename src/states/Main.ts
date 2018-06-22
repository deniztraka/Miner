namespace Darkworld.States {

    export class Main extends Phaser.State {
        mouseIcon:Darkworld.Core.MouseIcon;
        create() {
            const lines = [
                "click to enter",
                "",
                "we create worlds you don't want to live in",
                "dtworlds"
            ];

            const textStyle = {
                fill: "rgb(105, 105, 105)",
                font: "px437_ati_8x16regular",
                fontSize: 24
            };

            let y = this.game.height - textStyle.fontSize - 20;// - (lines.length * 20);
            for (const line of lines.reverse()) {
                this.game.add.text(20, y, line, textStyle );
                y -= textStyle.fontSize;
            }

            this.input.onTap.addOnce(()=>{
                this.state.start("Running");
            });

            this.mouseIcon = new Darkworld.Core.MouseIcon(this.game as Darkworld.DGame, this.game.input.activePointer.worldX, this.game.input.activePointer.worldY);
        }

        update(){
            this.mouseIcon.position.x = this.game.input.activePointer.worldX;
            this.mouseIcon.position.y = this.game.input.activePointer.worldY;
        }
    }
}
