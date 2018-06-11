namespace Darkworld.Components {
    export class TiledFov extends BaseComponent implements IComponent {
        protected game: DGame;
        protected entity: Darkworld.Entities.Entity;

        protected numberOfRays: number;
        protected rays: Phaser.Line[];
        protected points: Phaser.Point[];
        protected debug: boolean;

        private addEntityPoint: boolean;
        tiledFovLayer: Phaser.TilemapLayer;
        blockingLayer: Phaser.TilemapLayer;
        distance: number;
        dayNightSystemComponent: DayNightSystem;
        colorStop1: string;
        colorStop2: string;
        angle: number;
        flare: boolean;
        isFullView: boolean;
        fovTileHits: Darkworld.Core.DTile[];
        fovTileTrash: Darkworld.Core.DTile[];

        constructor(game: Darkworld.DGame, entity: Darkworld.Entities.Entity, distance: number, angle: number, isFullView: boolean) {
            super("TiledFov");
            this.game = game;
            this.entity = entity;
            this.distance = distance;
            this.debug = false;
            this.blockingLayer = this.game.dWorld.tileMap.blockingLayer;
            this.numberOfRays = 25;
            this.angle = angle ? angle : 360;
            this.distance = distance != null ? distance : 75;
            this.isFullView = isFullView;

            this.tiledFovLayer = this.game.dWorld.tileMap.create('tiledFov', this.game.dWorld.tileMap.width, this.game.dWorld.tileMap.height, this.game.dWorld.tileMap.tileWidth, this.game.dWorld.tileMap.tileHeight);
            this.tiledFovLayer.key = "tiledFovLayer";

            this.fovTileHits = [];
            this.fovTileTrash = [];

            // // create blocking layer
            for (var i = 0; i < this.game.dWorld.tileMap.width; i++) {
                for (var j = 0; j < this.game.dWorld.tileMap.height; j++) {
                    // for (var i = 0; i < 20; i++) {
                    //     for (var j = 0; j < 20; j++) {
                    var tile = this.game.dWorld.tileMap.putTile(79, i, j, this.tiledFovLayer);

                }
            }

            this.game.dWorld.tileMap.setCollision([79]);
            //this.game.physics.p2.convertTilemap(this, this.blockingLayer);

        }

        protected rayCast() {
            var BreakException = {};

            for (let i = 0; i < this.numberOfRays; i++) {
                var rotationInDegrees = (this.entity.rotation * 180 / Math.PI);
                rotationInDegrees = rotationInDegrees - this.angle / 2;

                var newRotationInDegrees = rotationInDegrees + i * this.angle / this.numberOfRays;

                let ray = new Phaser.Line(
                    this.entity.position.x,
                    this.entity.position.y,
                    this.entity.position.x + this.distance * Math.cos(newRotationInDegrees * (Math.PI / 180)),
                    this.entity.position.y + this.distance * Math.sin(newRotationInDegrees * (Math.PI / 180)));

                this.rays.push(ray);

                let tileHits = this.blockingLayer.getRayCastTiles(ray, 4, true, false);
                this.fovTileHits = [];


                if (tileHits.length > 0) {
                    try {

                        let linePoints: any[] = [];
                        linePoints = ray.coordinatesOnLine(1, linePoints);

                        //check wall tiles to set rays length
                        linePoints.forEach(point => {
                            tileHits.forEach(tile => {
                                if (tile.containsPoint(point[0], point[1])) {

                                    if (!this.isFullView) {
                                        ray.end.setTo(point[0], point[1]);
                                    }

                                    this.fovTileHits.push(this.game.dWorld.tileMap.getTile(tile.x, tile.y, this.tiledFovLayer) as Darkworld.Core.DTile);
                                    throw BreakException;
                                } else {
                                    //this.game.add.tween(tile).to({ alpha: 1 }, 250, "Linear", true);
                                }
                            });
                        });
                    } catch (e) {
                        if (e !== BreakException) throw e;
                    }
                }

                //get ray cast tiles
                var tilesFromRay = this.tiledFovLayer.getRayCastTiles(ray, 4, true, false) as Darkworld.Core.DTile[];
                tilesFromRay.forEach(fovTile => {
                    if (fovTile.alpha != 0) {
                        this.fovTileHits.push(fovTile);
                    }
                });
                this.fovTileHits.forEach(fovTile => {
                    if (fovTile.alpha != 0) {
                        this.game.add.tween(fovTile).to({ alpha: 0 }, 250, "Linear", true);
                        this.fovTileTrash.push(fovTile);
                    }
                    //var tilemapLayer = new Phaser.TilemapLayer(this.game,this.game.dWorld.tileMap,5,1,1);
                    //tilemapLayer.debug = true;


                });
            }
        }

        update() {

            super.update();

            this.rays = [];

            this.rayCast();

            //this.clearAlpha();
            this.tiledFovLayer.dirty = true;

            console.log(this.fovTileTrash.length);
            this.fovTileTrash = [];
            //console.log(this.fovTileHits.length);
            //this.clearAlpha();

            //this.tiledFovLayer.dirty = true;
        }

        clearAlpha() {
            var self = this;
            console.log(this.fovTileTrash.length);

            this.fovTileTrash.forEach(function (tile) {
                if (self.game.time.elapsedSecondsSince(tile.lastAlphaCheckTime) >= 0.5 && tile.alpha == 1) {
                    self.game.add.tween(tile).to({ alpha: 1 }, 250, "Linear", true);
                    tile.lastAlphaCheckTime = self.game.time.time;
                }
            });

            this.fovTileTrash = [];


            // this.fovTileHits.forEach(function (tile) {
            //     if (self.game.time.elapsedSecondsSince(tile.lastAlphaCheckTime) >= 1000) {
            //         //tile.debug = true;


            //         let linePoints: any[] = [];
            //         self.rays.forEach(ray => {
            //             ray.coordinatesOnLine(1, linePoints);

            //             linePoints.forEach(point => {
            //                 if (!tile.containsPoint(point[0], point[1])) {
            //                     //debugger;
            //                     //tile.alpha = 1; 
            //                     self.game.add.tween(tile).to({ alpha: 1 }, 250, "Linear", true);
            //                 }
            //             });
            //         });

            //         tile.lastAlphaCheckTime = self.game.time.time;

            //     }
            // });


        }

        debugRender() {
            if (!this.debug) {
                return;
            }

            if (!this.rays) {
                return;
            }

            this.rays.forEach(ray => {
                this.game.debug.geom(ray);
            });

        }
    }
}