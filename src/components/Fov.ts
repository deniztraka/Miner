namespace Darkworld.Components {
    export class Fov extends BaseComponent implements IComponent {
        private game: DGame;
        private entity: Darkworld.Entities.Entity;

        private numberOfRays: number;
        private rays: Phaser.Line[];
        private points: Phaser.Point[];
        private shadowTexture: Phaser.BitmapData;
        private shadowSprite: Phaser.Sprite;
        private debug: boolean;
        private isFullView: boolean;

        blockingLayer: Phaser.TilemapLayer;
        distance: number;
        dayNightSystemComponent: DayNightSystem;
        colorStop1: string;
        colorStop2: string;

        constructor(game: Darkworld.DGame, entity: Darkworld.Entities.Entity, colorStop1?: string, colorStop2?: string, distance?: number, isFullView?: boolean) {
            super("Fov");
            this.colorStop1 = colorStop1;
            this.colorStop2 = colorStop2;
            this.game = game;
            this.entity = entity;
            this.blockingLayer = this.game.dWorld.tileMap.blockingLayer;
            this.debug = false;
            this.isFullView = isFullView;

            this.dayNightSystemComponent = this.game.dWorld.getComponent("DayNightSystem") as DayNightSystem;
            this.numberOfRays = 250;
            this.distance = distance != null ? distance : 75;
            this.shadowTexture = this.dayNightSystemComponent.shadowTexture;
            //  Here the sprite uses the BitmapData as a texture
            this.shadowSprite = this.dayNightSystemComponent.shadowSprite;
            // this.shadowSprite.blendMode = Phaser.blendModes.MULTIPLY;

            //this.shadowSprite.anchor.set(0.5);
        }

        private rayCast() {
            var BreakException = {};

            for (let i = 0; i < this.numberOfRays; i++) {

                var rotation = (this.entity.rotation * Math.PI / 180) + i * 360 / this.numberOfRays;

                let ray = new Phaser.Line(
                    this.entity.position.x,
                    this.entity.position.y,
                    // this.mobile.position.x + this.distance * Math.cos(this.mobile.rotation - (0.2 + i * 0.15)),                    
                    // this.mobile.position.y + this.distance * Math.sin(this.mobile.rotation - (0.2 + i * 0.15)));
                    this.entity.position.x + this.distance * Math.cos(rotation * (Math.PI / 180)),
                    this.entity.position.y + this.distance * Math.sin(rotation * (Math.PI / 180)));

                this.rays.push(ray);

                let tileHits = this.blockingLayer.getRayCastTiles(ray, 4, true, false);

                if (tileHits.length > 0) {
                    try {
                        let results: any[] = [];
                        results = ray.coordinatesOnLine(1, results);
                        results.forEach(point => {
                            tileHits.forEach(tile => {                                
                                if (tile.containsPoint(point[0], point[1])) {


                                    //ray.end.setTo(tile.worldX + 8, tile.worldY + 8);
                                    if (!this.isFullView) {
                                        ray.end.setTo(point[0], point[1]);
                                    }
                                    // if (tile.worldY + tile.height / 2 < this.entity.y) {
                                    //     //console.log("asd");
                                    //     ray.end.setTo(tile.worldX + 8, tile.worldY + 8);
                                    // } else {
                                    //     //console.log("asd");
                                    //     ray.end.setTo(point[0], point[1]);
                                    // }

                                    
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
            this.shadowTexture.context.beginPath();
            for (var i = 0; i < this.points.length; i++) {
                //var point = this.points[i];
                
                var point = new Phaser.Point(this.points[i].x-this.game.camera.x,this.points[i].y-this.game.camera.y);                
                if (i == 0) {
                    this.shadowTexture.context.moveTo(point.x, point.y);
                } else {
                    this.shadowTexture.context.lineTo(point.x, point.y);
                }
            }
            this.shadowTexture.context.closePath();

            // Draw circle of light with a soft edge
            var circleGradient = this.shadowTexture.context.createRadialGradient(
                this.entity.x-this.game.camera.x, this.entity.y-this.game.camera.y, this.distance * 0.1,
                this.entity.x-this.game.camera.x, this.entity.y-this.game.camera.y, this.distance + this.game.rnd.integerInRange(-2, 1));
            circleGradient.addColorStop(0, this.colorStop1 != null ? this.colorStop1 : 'rgba(255, 255, 255, 1.0)');
            circleGradient.addColorStop(1, this.colorStop2 != null ? this.colorStop2 : 'rgba(255, 255, 255, 0.0)');

            

            this.shadowTexture.context.fillStyle = circleGradient;
            this.shadowTexture.context.fill();
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