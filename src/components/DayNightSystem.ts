namespace Darkworld.Components {
    export class DayNightSystem extends BaseComponent implements IComponent {
        private game: DGame;
        private debug: boolean;
        private dayLengthInSeconds: number;
        private elapsedRealSeconds: number;
        private currentShadowAlphaValue: number;
        elapsedGameDays: number;
        currentGameHour: number;

        shadowTexture: Phaser.BitmapData;
        shadowSprite: Phaser.Sprite;
        blockingLayer: Phaser.TilemapLayer;
        distance: number;

        constructor(game: Darkworld.DGame) {
            super("DayNightSystem");

            this.game = game;
            this.debug = true;
            this.dayLengthInSeconds = 60;
            this.elapsedRealSeconds = 0;
            this.elapsedGameDays = 0;
            this.currentGameHour = 0;
            this.currentShadowAlphaValue = 0;

            this.shadowTexture = this.game.make.bitmapData(this.game.width, this.game.height);
            //  Here the sprite uses the BitmapData as a texture
            this.shadowSprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, this.shadowTexture);
            this.shadowSprite.blendMode = Phaser.blendModes.MULTIPLY;

            this.shadowSprite.anchor.set(0.5);
        }

        private timerTick() {
            let dayTimeInfoHelper = this.elapsedRealSeconds % this.dayLengthInSeconds;

            if (dayTimeInfoHelper == 0) {

                this.elapsedGameDays++;
            }

            

            console.log("RealSecondsElapsed:" + this.elapsedRealSeconds + "\n" +
                "Current Game Days:" + this.elapsedGameDays + "\n" +
                "Current Game Hours:" + this.currentGameHour + "\n" +
                "Current Shadow Alpha Value:" + this.currentShadowAlphaValue + "\n"
            );

            this.elapsedRealSeconds++;
            this.game.time.events.add(Phaser.Timer.SECOND * 1, this.timerTick, this);
        }

        private drawShadow() {

            

            this.shadowTexture.context.clearRect(0, 0, this.game.width, this.game.height);
            this.shadowTexture.context.fillStyle = `rgba(10, 10, 10,${this.currentShadowAlphaValue.toString()})`; // 'rgba(10, 10, 10,0.5)';
            this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

            this.shadowTexture.dirty = true;
        }

        startCycle() {
            this.game.time.events.add(Phaser.Timer.SECOND * 1, this.timerTick, this);
        }

        update() {
            super.update();
            this.currentGameHour = Math.floor((24 * this.elapsedRealSeconds / this.dayLengthInSeconds) % 24);
            this.currentShadowAlphaValue =(this.currentGameHour * (1 / 24))%1;
            this.drawShadow();
        }



        debugRender() {
            if (this.debug) {

            }
        }
    }
}