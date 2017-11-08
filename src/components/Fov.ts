namespace Darkworld.Components {
    export class Fov extends BaseComponent implements IComponent {
        private game: DGame;
        private mobile: Darkworld.Entities.Mobiles.Mobile;

        private numberOfRays: number;
        private rays: Phaser.Line[];
        private points: Phaser.Point[];
        private shadowTexture: Phaser.BitmapData;
        private shadowSprite: Phaser.Sprite;
        private debug: boolean;

        blockingLayer: Phaser.TilemapLayer;
        distance: number;

        constructor(game: Darkworld.DGame, mobile: Darkworld.Entities.Mobiles.Mobile) {
            super();
            this.game = game;
            this.mobile = mobile;
            this.blockingLayer = this.game.worldMap.blockingLayer;
            this.debug = false;

            this.numberOfRays = 30;
            this.distance = 75;
            this.shadowTexture = this.game.make.bitmapData(this.game.width, this.game.height);
            //  Here the sprite uses the BitmapData as a texture
            this.shadowSprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, this.shadowTexture);
            this.shadowSprite.blendMode = Phaser.blendModes.MULTIPLY;

            this.shadowSprite.anchor.set(0.5);
        }

        private rayCast() {
            var BreakException = {};

            for (let i = 0; i < this.numberOfRays; i++) {

                var rotation = (this.mobile.rotation * Math.PI / 180) + i * 360 / this.numberOfRays;

                let ray = new Phaser.Line(
                    this.mobile.position.x,
                    this.mobile.position.y,
                    // this.mobile.position.x + this.distance * Math.cos(this.mobile.rotation - (0.2 + i * 0.15)),                    
                    // this.mobile.position.y + this.distance * Math.sin(this.mobile.rotation - (0.2 + i * 0.15)));
                    this.mobile.position.x + this.distance * Math.cos(rotation * (Math.PI / 180)),
                    this.mobile.position.y + this.distance * Math.sin(rotation * (Math.PI / 180)));

                this.rays.push(ray);

                let tileHits = this.blockingLayer.getRayCastTiles(ray, 4, true, false);

                if (tileHits.length > 0) {
                    try {
                        let results: any[] = [];
                        results = ray.coordinatesOnLine(1, results);
                        results.forEach(point => {
                            tileHits.forEach(tile => {
                                if (tile.containsPoint(point[0], point[1])) {
                                    ray.end.setTo(tile.worldX + 8, tile.worldY + 8);
                                    this.points.push(ray.end);
                                    throw BreakException;
                                }
                            });
                        });
                    } catch (e) {
                        if (e !== BreakException) throw e;
                    }
                }
                else {
                    this.points.push(ray.end);
                }
            }            
        }

        private drawShadow() {
            this.shadowTexture.context.clearRect(0, 0, this.game.width, this.game.height);
            this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
            this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

            this.shadowTexture.context.beginPath();
            for (var i = 0; i < this.points.length; i++) {
                var point = this.points[i];
                if (i == 0) {
                    this.shadowTexture.context.moveTo(point.x, point.y);
                } else {
                    this.shadowTexture.context.lineTo(point.x, point.y);
                }
            }
            this.shadowTexture.context.closePath();

            // Draw circle of light with a soft edge
            var circleGradient = this.shadowTexture.context.createRadialGradient(
                this.mobile.x, this.mobile.y, this.distance * 0.1,
                this.mobile.x, this.mobile.y, this.distance + this.game.rnd.integerInRange(-2, 1));
            circleGradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
            circleGradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');


            // var linearGradient = this.shadowTexture.context.createLinearGradient(
            //     this.mobile.x,
            //     this.mobile.y,
            //     this.mobile.position.x + this.distance * Math.cos(this.mobile.rotation),
            //     this.mobile.position.y + this.distance * Math.sin(this.mobile.rotation));
            // linearGradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
            // linearGradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

            this.shadowTexture.context.fillStyle = circleGradient;//'rgb(255, 255, 255)';
            this.shadowTexture.context.fill();

            this.shadowTexture.dirty = true;
        }

        update() {
            super.update();

            this.rays = [];
            this.points = [];

            this.rayCast();
            this.drawShadow();


        }



        debugRender() {
            if (this.debug) {
                this.rays.forEach(ray => {
                    this.game.debug.geom(ray);
                });
            }
        }
    }
}