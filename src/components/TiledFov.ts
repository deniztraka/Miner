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

            this.fovHitTiles = [];
            this.fovTiles = [];

            this.tileLine = [];

            // create blocking layer
            for (var i = 0; i < this.game.dWorld.tileMap.width; i++) {
                for (var j = 0; j < this.game.dWorld.tileMap.height; j++) {
                    var tile = this.game.dWorld.tileMap.putTile(79, i, j, this.tiledFovLayer);
                    tile.alpha = 0.75;
                    this.fovTiles.push(tile);
                }
            }

            this.game.dWorld.tileMap.setCollision([79]);

        }

        protected rayCast() {
            var self = this;
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



                let tileHits = this.blockingLayer.getRayCastTiles(ray, 4, true, false);

                this.fovHitTiles = [];


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
                                    //add own tile to add hit tile list                          
                                    //this.fovHitTiles.push(this.game.dWorld.tileMap.getTile(tile.x, tile.y, this.tiledFovLayer) as Darkworld.Core.DTile);
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

                //PROBLEM WAS HERE
                //ITS SET THE LAST RAY INFO ALWAYS.
                //WE NEED TO GATHER INFORMATION ABOUT TILES FIRST WITH ALL THE RAY HIT INFORMATION
                //AFTER THAT SET ALPHA VALUES.

                if (self.rays.indexOf(ray) == 0) {




                    //check hit tiles with the the updated ray length
                    var hitTiles = self.tiledFovLayer.getRayCastTiles(ray) as Darkworld.Core.DTile[];
                    //adding hit tiles to hit list
                    hitTiles.forEach(function (fovHitTile) {
                        self.fovHitTiles.push(fovHitTile);
                    });




                    // iterating each hit tile
                    self.fovHitTiles.forEach(fovHitTile => {
                        fovHitTile.alpha = 0;
                    });

                    var fovTilesFiltered = self.fovTiles.filter(function (tile) {
                        return tile.alpha == 0;
                    });



                    fovTilesFiltered.forEach(function (notShownFovTile) {

                        let rayCastTiles = self.tiledFovLayer.getRayCastTiles(ray) as Darkworld.Core.DTile[];

                        if (rayCastTiles.indexOf(notShownFovTile) == -1) {
                            notShownFovTile.alpha = 0.75;
                        }
                    });
                }
            });
        }

        update() {

            super.update();

            this.rays = [];

            this.rayCast();

            this.tiledFovLayer.dirty = true;
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