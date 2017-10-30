namespace Darkworld {

    export class Main extends Phaser.State {

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
        }
    }
}
