namespace Darkworld.Data {
    export class RandomTileMapData {
        data: number[][];

        constructor(game: DGame, min: number, max: number, width: number, height: number) {
            this.data = [];
            
            for (var i: number = 0; i < width; i++) {
                this.data[i] = [];
                for (var j: number = 0; j < height; j++) {                    
                    this.data[i][j] = game.rnd.integerInRange(min, max);
                }
            }
        }
    }
}