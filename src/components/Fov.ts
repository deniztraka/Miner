namespace Darkworld.Components {
    export class Fov extends BaseComponent implements IComponent {
        private game: DGame;
        private mobile: Darkworld.Entities.Mobiles.Mobile;

        private numberOfRays: number;
        private rays: Phaser.Line[];
        private points: Phaser.Point[];

        blockingLayer: Phaser.TilemapLayer;
        distance: number;

        constructor(game: Darkworld.DGame, mobile: Darkworld.Entities.Mobiles.Mobile) {
            super();
            this.game = game;
            this.mobile = mobile;
            this.blockingLayer = this.game.worldMap.blockingLayer;

            this.numberOfRays = 10;
            this.distance = 75;

        }

        private rayCast() {
            var BreakException = {};

            for (let i = 0; i < this.numberOfRays / 2; i++) {

                let ray = new Phaser.Line(
                    this.mobile.position.x,
                    this.mobile.position.y,
                    this.mobile.position.x + this.distance * Math.cos(this.mobile.rotation - (0.2 + i * 0.15)),
                    this.mobile.position.y + this.distance * Math.sin(this.mobile.rotation - (0.2 + i * 0.15)));

                this.rays.push(ray);

                let tileHits = this.blockingLayer.getRayCastTiles(ray, 4, true, false);

                if (tileHits.length > 0) {
                    try {
                        let results: any[] = [];
                        results = ray.coordinatesOnLine(1, results);
                        results.forEach(point => {
                            tileHits.forEach(tile => {
                                if (tile.containsPoint(point[0], point[1])) {
                                    ray.end.setTo(point[0], point[1]);
                                    this.points.push(new Phaser.Point(point[0], point[1]));
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

        update() {
            super.update();

            this.rays = [];
            this.points = [];

            this.rayCast();




            // this.shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
            // this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

            // // var radius = 100 + this.game.rnd.integerInRange(1, 20),
            // //     heroX = this.player.x - this.game.camera.x,
            // //     heroY = this.player.y - this.game.camera.y;

            // // var gradient = this.shadowTexture.context.createRadialGradient(
            // //     heroX, heroY, 100 * 0.75,
            // //     heroX, heroY, radius);

            // // gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
            // // gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

            // this.shadowTexture.context.beginPath();
            // //this.shadowTexture.context.fillStyle = gradient;

            // // for (var i = 0; i < this.pointsLeft.length; i++) {
            // //     var point = this.pointsLeft[i];
            // //     if (i == 0) {
            // //         this.shadowTexture.context.moveTo(point.x, point.y);
            // //     } else {
            // //         this.shadowTexture.context.lineTo(point.x, point.y);
            // //     }
            // // }

            // // this.pointsLeft.forEach(point => {

            // //     this.shadowTexture.context.moveTo(point.x, point.y);
            // // });

            // // this.shadowTexture.context.moveTo(this.points[0].x, this.points[0].y);

            // // for (var i = 0; i < this.pointsRight.length; i++) {
            // //     var point = this.pointsRight[i];

            // //     this.shadowTexture.context.lineTo(point.x, point.y);

            // // }


            // // this.pointsRight.forEach(point => {
            // //     this.shadowTexture.context.moveTo(point.x, point.y);
            // // });

            // //this.shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI*2, false);
            // this.shadowTexture.context.fill();

            // this.shadowTexture.dirty = true;


            // //  You can also create an empty Polygon:
            // let poly = new Phaser.Polygon();




            // //  And then populate it via setTo, using any combination of values as above
            // poly.setTo(this.points);



            // let graphics = this.game.add.graphics(0, 0);

            // graphics.beginFill(0x000000);
            // graphics.drawPolygon(poly.points);
            // graphics.endFill();
            // graphics.alpha = 0.5;
            // graphics.lifespan = 100;
            // graphics.blendMode = Phaser.blendModes.MULTIPLY;

            // // this.blockingLayer.dirty = true;
            // console.log(this.points.length);


        }



        debugRender() {
            this.rays.forEach(ray => {
                this.game.debug.geom(ray);
            });
        }
    }
}