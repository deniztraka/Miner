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
        tileLine: Phaser.Line[];

        constructor(game: Darkworld.DGame, entity: Darkworld.Entities.Entity, distance: number, angle: number, isFullView: boolean) {
            super("TiledFov");
            this.game = game;
            this.entity = entity;
            this.distance = distance;
            this.debug = true;
            this.blockingLayer = this.game.dWorld.tileMap.blockingLayer;
            this.numberOfRays = 1;
            this.angle = angle ? angle : 360;
            this.distance = distance != null ? distance : 75;
            this.isFullView = isFullView;

            this.tiledFovLayer = this.game.dWorld.tileMap.create('tiledFov', this.game.dWorld.tileMap.width, this.game.dWorld.tileMap.height, this.game.dWorld.tileMap.tileWidth, this.game.dWorld.tileMap.tileHeight);
            this.tiledFovLayer.key = "tiledFovLayer";

            this.fovTileHits = [];
            this.fovTileTrash = [];

            this.tileLine = [];

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
                    if (fovTile.alpha != 0 && fovTile.show && !fovTile.isTweening) {

                        if (fovTile.x == 3 && fovTile.y == 1) {
                            fovTile.show = false;
                            console.log("hide from raycast");
                        }

                    }
                });
            }
        }

        update() {

            super.update();

            this.rays = [];

            this.rayCast();

            //this.checkShow();



            //this.clearAlpha();






        }

        checkShow() {
            var self = this;

            var tiles = self.game.dWorld.tileMap.getDTilesArray(self.tiledFovLayer) as Darkworld.Core.DTile[];

            tiles.forEach(tile => {

                if (tile.show && tile.alpha == 0 && !tile.isTweening) {
                    //console.log("showing");

                    tile.isTweening = true;
                    var tileTween = self.game.add.tween(tile).to({ alpha: 1 }, 250, "Linear", true);
                    tileTween.onComplete.add(function () {
                        tile.isTweening = false;
                    });
                } else if (!tile.show && tile.alpha == 1 && !tile.isTweening) {
                    //console.log("hiding" + "x:" + tile.x + ", y:" + tile.y);
                    tile.isTweening = true;
                    var tileTween = self.game.add.tween(tile).to({ alpha: 0 }, 250, "Linear", true);
                    tileTween.onComplete.add(function () {
                        tile.isTweening = false;
                    });
                }
            });
            self.tiledFovLayer.dirty = true;

        }

        clearAlpha() {
            var self = this;

            var hiddenTiles = this.game.dWorld.tileMap.getDTilesArray(this.tiledFovLayer).filter(function (tile) {
                return !tile.show;
            });

            hiddenTiles.forEach(function (tile) {
                //tile.show = true;


                //console.log("x:" + tile.x + ", y:" + tile.y + ", show:" + tile.show + ", alpha:" + tile.alpha);
                self.tileLine.push(
                    new Phaser.Line(tile.worldX, tile.worldY, tile.worldX + tile.width, tile.worldY),
                    new Phaser.Line(tile.worldX + tile.width, tile.worldY, tile.worldX + tile.width, tile.worldY + tile.height),
                    new Phaser.Line(tile.worldX + tile.width, tile.worldY + tile.height, tile.worldX, tile.worldY + tile.height),
                    
                    new Phaser.Line(tile.worldX, tile.worldY + tile.height, tile.worldX, tile.worldY)
                );

                //console.log("show from clearalpha");
                // if (tile.x == 3 && tile.y == 1) {
                //     console.log(totalSince);
                // }

                var totalSince = self.game.time.totalElapsedSeconds() - tile.lastAlphaCheckTime;
                if (totalSince >= 1) {
                    let intersects = false;
                    self.rays.forEach(ray => {


                        

                        var lines = self.tileLine;

                        for(var i = 0; i < lines.length; i++) {
                            var intersect = Phaser.Line.intersects(ray, lines[i]);
                            if (intersect) {
                                //console.log("intersects")
                                intersects = true;
                            }else{
                                //console.log("intermesects")
                            }
                        }
                    });

                    if(intersects){
                        tile.show = true;
                    }else{
                        //tile.show = false;
                    }

                    tile.lastAlphaCheckTime = self.game.time.totalElapsedSeconds();
                    //console.log("x:" + tile.x + ", y:" + tile.y + ", show:" + tile.show + ", alpha:" + tile.alpha);
                }

                //console.log("x:"+tile.x+", y:"+tile.y + ", show:" + tile.show + ", alpha:" + tile.alpha); 


                // self.rays.forEach(function (ray) {
                //     var rayCastedTiles = self.tiledFovLayer.getRayCastTiles(ray) as Darkworld.Core.DTile[];

                //     rayCastedTiles.forEach(function (tileHit) {
                //         if((tileHit.x == tile.x && tileHit.y == tile.y)){
                //             console.log("x:"+tile.x+", y:"+tile.y + ", show:" + tile.show + ", alpha:" + tile.alpha); 
                //         }








                //         // if (!(tileHit.y == tile.y && tileHit.x == tileHit.x) && !tileHit.isTweening && tileHit.x == 3 && tileHit.y == 1) {
                //         //     //console.log("x:"+tileHit.x+", y:"+tileHit.y + ", show:" + tileHit.show + ", alpha:" + tileHit.alpha); 
                //         //     tile.show = true;
                //         //     console.log("show from clearalpha");
                //         // }
                //     });


                // });



            });





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

            this.tileLine.forEach(line => {
                self.game.debug.geom(line);
            });
            this.tileLine = [];

        }
    }
}