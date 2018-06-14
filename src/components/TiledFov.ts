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
        fovHitTiles: Darkworld.Core.DTile[];
        fovTiles: Darkworld.Core.DTile[];
        tileLine: Phaser.Line[];
        visibleAlpha: number;
        dayInvisAlpha: number;
        nightInvisAlpha: number;
        invisAlpha: number;
        dayRaysLengthPlus: number;
        dayRaysLength: number;
        nightRaysLength: number;

        constructor(game: Darkworld.DGame, entity: Darkworld.Entities.Entity, distance: number, angle: number, isFullView: boolean) {
            super("TiledFov");
            this.game = game;
            this.entity = entity;
            this.distance = distance;
            this.debug = false;
            this.blockingLayer = this.game.dWorld.tileMap.blockingLayer;
            this.numberOfRays = 20;
            this.angle = angle ? angle : 360;
            this.distance = distance != null ? distance : 200;
            this.isFullView = isFullView;
            this.visibleAlpha = 0.99;
            this.dayInvisAlpha = 0;
            this.dayRaysLengthPlus = 50;
            this.invisAlpha = 0;
            this.nightInvisAlpha = 0.5;
            this.dayRaysLength = 250;
            this.nightRaysLength = 200;

            this.dayNightSystemComponent = this.game.dWorld.getComponent("DayNightSystem") as DayNightSystem;
            this.tiledFovLayer = this.game.dWorld.tileMap.create('tiledFov', this.game.dWorld.tileMap.width, this.game.dWorld.tileMap.height, this.game.dWorld.tileMap.tileWidth, this.game.dWorld.tileMap.tileHeight);
            this.tiledFovLayer.key = "tiledFovLayer";

            this.fovHitTiles = [];
            this.fovTiles = [];

            this.tileLine = [];

            if (this.dayNightSystemComponent) {
                // create blocking layer
                for (var i = 0; i < this.game.dWorld.tileMap.width; i++) {
                    for (var j = 0; j < this.game.dWorld.tileMap.height; j++) {
                        var tile = this.game.dWorld.tileMap.putTile(79, i, j, this.tiledFovLayer);
                        tile.alpha = this.visibleAlpha;
                        tile.isVisible = true;
                        this.fovTiles.push(tile);
                    }
                }

                this.game.dWorld.tileMap.setCollision([79]);
            }

        }

        protected rayCast() {
            var self = this;
            var BreakException = {};

            this.fovHitTiles = [];
            for (let i = 0; i < this.numberOfRays; i++) {
                var rotationInDegrees = (this.entity.rotation * 180 / Math.PI);
                rotationInDegrees = rotationInDegrees - this.angle / 2;

                var newRotationInDegrees = rotationInDegrees + i * this.angle / this.numberOfRays;

                let ray = new Phaser.Line(
                    this.entity.position.x,
                    this.entity.position.y,
                    this.entity.position.x + this.distance * Math.cos(newRotationInDegrees * (Math.PI / 180)),
                    this.entity.position.y + this.distance * Math.sin(newRotationInDegrees * (Math.PI / 180)));



                let tileHits = this.blockingLayer.getRayCastTiles(ray, 4, true, false) as Darkworld.Core.DTile[];




                if (tileHits.length > 0) {
                    try {

                        let linePoints: any[] = [];
                        linePoints = ray.coordinatesOnLine(1, linePoints);

                        //check wall tiles to set rays length
                        linePoints.forEach(point => {
                            tileHits.forEach(tile => {
                                if (tile.containsPoint(point[0], point[1])) {
                                    debugger;
                                    if (!this.isFullView) {
                                        ray.end.setTo(point[0], point[1]);
                                    }
                                    //add own tile to add hit tile list                          

                                    var fovTile = this.game.dWorld.tileMap.getTile(tile.x, tile.y, this.tiledFovLayer) as Darkworld.Core.DTile;


                                    self.fovHitTiles.push(fovTile);



                                    throw BreakException;
                                }
                            });
                        });




                    } catch (e) {
                        if (e !== BreakException) throw e;
                    }
                }

                this.rays.push(ray);

            }



            this.rays.forEach(function (ray) {
                //check hit tiles with the the updated ray length
                var hitTiles = self.tiledFovLayer.getRayCastTiles(ray) as Darkworld.Core.DTile[];
                //adding hit tiles to hit list
                hitTiles.forEach(function (fovHitTile) {
                    if (self.fovHitTiles.indexOf(fovHitTile) == -1) {
                        self.fovHitTiles.push(fovHitTile);
                    }
                });
            });

            //arrange visibility
            self.fovTiles.forEach(fovTile => {

                //check every fov tile and set visibility if hit tile 
                if (self.fovHitTiles.indexOf(fovTile) == -1) {
                    if (!fovTile.isVisible) {
                        var tween = self.game.add.tween(fovTile).to({ alpha: self.visibleAlpha }, 500, "Linear", true);
                        tween.onComplete.add(function () {
                            fovTile.isVisible = true;
                        });
                    }
                } else {
                    if (fovTile.isVisible) {
                        var tween = self.game.add.tween(fovTile).to({ alpha: self.invisAlpha }, 500, "Linear", true);
                        tween.onComplete.add(function () {
                            fovTile.isVisible = false;
                        });
                    }
                }
            });
        }

        update() {

            super.update();
            if (this.dayNightSystemComponent) {

                if (this.dayNightSystemComponent.isDay) {
                    this.invisAlpha = this.dayInvisAlpha;
                    this.distance = this.dayRaysLength;
                }
                else {
                    this.invisAlpha = this.nightInvisAlpha;
                    this.distance = this.nightRaysLength;
                }

                this.rays = [];

                this.rayCast();

                this.tiledFovLayer.dirty = true;
            }
        }

        debugRender() {
            var self = this;
            if (!this.debug) {
                return;
            }

            if (!this.rays) {
                return;
            }

            this.rays.forEach(ray => {
                self.game.debug.geom(ray);
            });

            this.tileLine = [];

        }
    }
}