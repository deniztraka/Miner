namespace Darkworld.Components {
    export class DayNightSystem extends BaseComponent implements IComponent {
        private game: DGame;
        private debug: boolean;
        private dayLengthInSeconds: number;
        private elapsedRealSeconds: number;
        private currentShadowAlphaValue: number;
        private changing:boolean;
        
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
            this.dayLengthInSeconds = 10;
            this.elapsedRealSeconds = 0;
            this.elapsedGameDays = 0;
            this.currentGameHour = 0;
            this.currentShadowAlphaValue = 1;
            this.changing = false;

            this.shadowTexture = this.game.make.bitmapData(this.game.width, this.game.height);
            //  Here the sprite uses the BitmapData as a texture
            this.shadowSprite = this.game.add.sprite(this.game.width/2, this.game.height/2, this.shadowTexture);
            this.shadowSprite.blendMode = Phaser.blendModes.MULTIPLY;

            this.shadowSprite.anchor.set(0.5);
        }

        private timerTick() {
            let dayTimeInfoHelper = this.elapsedRealSeconds % this.dayLengthInSeconds;

            if (dayTimeInfoHelper == 0) {

                this.elapsedGameDays++;
            }

            // console.log("RealSecondsElapsed:" + this.elapsedRealSeconds + "\n" +
            //     "Current Game Days:" + this.elapsedGameDays + "\n" +
            //     "Current Game Hours:" + this.currentGameHour + "\n" +
            //     "Current Shadow Alpha Value:" + this.currentShadowAlphaValue + "\n"
            // );
            
            if((!this.changing) && this.currentGameHour>6 && this.currentGameHour<18 && this.currentShadowAlphaValue != 0){
                this.game.time.events.add(0, this.changeToDay, this);
            } else if((!this.changing) && this.currentGameHour>18 && this.currentGameHour>6 && this.currentShadowAlphaValue != 1){
                this.game.time.events.add(0, this.changeToNight, this);
            }

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

        setToNotChanging(){
            //console.log("complete");
            this.changing=false;            
        }

        changeToDay(){            
            //console.log("change to day");
            let duration = this.dayLengthInSeconds*4/24*1000;            
            this.changing = true;
            let tween = this.game.add.tween(this).to({currentShadowAlphaValue:0},duration,Phaser.Easing.Linear.None);
            tween.onComplete.add(this.setToNotChanging,this);
            tween.start();
        }

        changeToNight(){            
            //console.log("change to night");
            let duration = this.dayLengthInSeconds*4/24*1000;            
            this.changing = true;
            let tween = this.game.add.tween(this).to({currentShadowAlphaValue:1},duration,Phaser.Easing.Linear.None);
            tween.onComplete.add(this.setToNotChanging,this);
            tween.start();
        }

        update() {
            super.update();
            this.currentGameHour = Math.floor((24 * this.elapsedRealSeconds / this.dayLengthInSeconds) % 24);
            // this.shadowSprite.x = this.game.dWorld.player.x;
            // this.shadowSprite.y = this.game.dWorld.player.y;



            // if (this.currentGameHour < 6) {
            //     this.currentShadowAlphaValue = 1;
            // } else if (this.currentGameHour > 6 && this.currentGameHour < 18) {
            //     this.currentShadowAlphaValue = 0;
            // } else if (this.currentGameHour > 18 && this.currentGameHour < 24) {
            //     this.currentShadowAlphaValue = 1;
            // } 

            // if (this.currentGameHour > 12) {
            //     this.currentShadowAlphaValue = (this.currentGameHour * (1 / 12)) % 1;
            // }else{
            //     this.currentShadowAlphaValue = 1-(this.currentGameHour * (1 / 12)) % 1;
            // }
            this.drawShadow();
        }



        debugRender() {
            if (this.debug) {

            }
        }
    }
}