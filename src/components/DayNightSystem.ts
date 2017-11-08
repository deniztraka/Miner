namespace Darkworld.Components {
    export class DayNightSystem extends BaseComponent implements IComponent {
        private game: DGame;        

        
        private debug: boolean;

        shadowTexture: Phaser.BitmapData;
        shadowSprite: Phaser.Sprite;
        blockingLayer: Phaser.TilemapLayer;
        distance: number;

        constructor(game: Darkworld.DGame) {
            super("DayNightSystem");
            
            this.game = game;                        
            this.debug = false;

            this.shadowTexture = this.game.make.bitmapData(this.game.width, this.game.height);
            //  Here the sprite uses the BitmapData as a texture
            this.shadowSprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, this.shadowTexture);
            this.shadowSprite.blendMode = Phaser.blendModes.MULTIPLY;

            this.shadowSprite.anchor.set(0.5);
        }

        

        private drawShadow() {
            this.shadowTexture.context.clearRect(0, 0, this.game.width, this.game.height);
            this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
            this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);


            this.shadowTexture.dirty = true;
        }

        update() {
            super.update();
            
            this.drawShadow();


        }



        debugRender() {
            if (this.debug) {
                
            }
        }
    }
}