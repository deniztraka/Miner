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
            this.debug = true;
            this.blockingLayer = this.game.dWorld.tileMap.blockingLayer;
            this.numberOfRays = 2;
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
                    var tile = this.game.dWorld.tileMap.putTile(79, i, j, this.tiledFovLayer);
                }
            }

            this.game.dWorld.tileMap.setCollision([79]);

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
                        fovTile.show = false;
                    }
                });
            }
        }

        update() {

            super.update();

            this.rays = [];

            this.rayCast();

            //this.clearAlpha();

            this.checkShow();

        }

        checkShow() {
            var self = this;

            var tiles = self.game.dWorld.tileMap.getDTilesArray(self.tiledFovLayer) as Darkworld.Core.DTile[];

            
            tiles.forEach(tile => {



                if (tile.show && tile.alpha == 0) {
                    console.log("showing");
                    self.game.add.tween(tile).to({ alpha: 1 }, 250, "Linear", true);
                } else if (!tile.show && tile.alpha == 1) {
                    console.log("hiding" + "x:" + tile.x + ", y:" + tile.y);
                    self.game.add.tween(tile).to({ alpha: 0 }, 250, "Linear", true);
                }
            });
            self.tiledFovLayer.dirty = true;

        }

        clearAlpha() {
            var self = this;

            this.game.dWorld.tileMap.getDTilesArray(this.tiledFovLayer).forEach(function (tile) {
                tile.show = true;
                // var totalSince = self.game.time.totalElapsedSeconds() - tile.lastAlphaCheckTime;
                // if (totalSince >= 1 && !tile.show) {


                //     self.rays.forEach(function (ray) {
                //         var rayCastedTiles = self.tiledFovLayer.getRayCastTiles(ray) as Darkworld.Core.DTile[];
                       
                //         rayCastedTiles.forEach(function (tileHit) {
                //             if (!(tileHit.y == tile.y && tileHit.x == tileHit.x)) {
                //                 //console.log("x:"+tileHit.x+", y:"+tileHit.y + ", show:" + tileHit.show + ", alpha:" + tileHit.alpha); 
                //                 tile.show = true;
                //             }
                //         });

                //     });


                //     tile.lastAlphaCheckTime = self.game.time.totalElapsedSeconds();
                // }
            });


            


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