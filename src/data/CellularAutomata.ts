namespace Darkworld.Data {
    export class CellularAutomata implements Darkworld.Data.IMapDataGenerator {
        width: number;
        height: number;
        cellmap: number[][];
        chanceToStartAlive: number;
        deathLimit: number;
        birthLimit: number;
        numberOfSteps: number;
        game: DGame;

        constructor(game: DGame, width: number, height: number, chanceToStartAlive: number, deathLimit: number, birthLimit: number) {
            this.game = game;
            this.width = width;
            this.height = height;
            this.cellmap = [];
            this.chanceToStartAlive = chanceToStartAlive ? chanceToStartAlive : 0.45;
            this.deathLimit = deathLimit;
            this.birthLimit = birthLimit;
            this.numberOfSteps =  2;           

            //map constructor
            for (var i: number = 0; i < width; i++) {
                this.cellmap[i] = [];
                for (var j: number = 0; j < height; j++) {
                    this.cellmap[i][j] = 0;
                }
            }

            //initialize it with random values
            this.initialiseMap();
        }

        generateMap( fillSides: boolean): number[][] {
            //And now run the simulation for a set number of steps
            for (let i = 0; i < this.numberOfSteps; i++) {
                this.cellmap = this.doSimulationStep();
            }

            if (fillSides) {
                //filling sides
                for (var x = 0; x < this.width; x++) {
                    for (var y = 0; y < this.height; y++) {
                        if (x == 0 || y == 0 || x == this.width - 1 || y == this.height - 1) {
                            this.cellmap[x][y] = 1;
                        }
                    }
                }
            }

            //random map is generated
            //now trying to shutdown closed areas            
            var openCellFound = false;
            while (!openCellFound) {
                var closedCellCount = 0;
                var randomX = this.game.rnd.integerInRange(0, this.width);
                var randomY = this.game.rnd.integerInRange(0, this.height);
                if (this.cellmap[randomX][randomY] == 0) {
                    openCellFound = true; //we found an open cell

                    //set flood areas to index 2
                    // this.floodFill(randomX, randomY, 0, 2);

                    
                    // //set wall other open areas
                    // for (var x = 0; x < this.width; x++) {
                    //     for (var y = 0; y < this.height; y++) {
                    //         if (this.cellmap[x][y] == 0) {
                    //             this.cellmap[x][y] = 1;
                    //         }
                    //     }
                    // }

                    // //set open flooded areas
                    // for (var x = 0; x < this.width; x++) {
                    //     for (var y = 0; y < this.height; y++) {
                    //         if (this.cellmap[x][y] == 2) {
                    //             this.cellmap[x][y] = 0;
                    //         }
                    //     }
                    // }
                }
            }

            return this.cellmap;
        }

        floodFill(x: number, y: number, oldVal: number, newVal: number) {
            var mapWidth = this.cellmap.length,
                mapHeight = this.cellmap[0].length;

            if (oldVal == null) {
                oldVal = this.cellmap[x][y];
            }

            if (this.cellmap[x][y] !== oldVal) {
                return true;
            }

            this.cellmap[x][y] = newVal;

            if (x > 0) {
                this.floodFill(x - 1, y, oldVal, newVal);
            }

            if (y > 0) {
                this.floodFill(x, y - 1, oldVal, newVal);
            }

            if (x < mapWidth - 1) {
                this.floodFill(x + 1, y, oldVal, newVal);
            }

            if (y < mapHeight - 1) {
                this.floodFill(x, y + 1, oldVal, newVal);
            }
        }

        private initialiseMap() {
            for (var x = 0; x < this.width; x++) {
                for (var y = 0; y < this.height; y++) {
                    if (this.game.rnd.frac() < this.chanceToStartAlive) {
                        this.cellmap[x][y] = 1;
                    }
                }
            }
        }

        //Returns the number of cells in a ring around (x,y) that are alive.
        private countAliveNeighbours(map: number[][], x: number, y: number): number {
            let count = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    let neighbour_x = x + i;
                    let neighbour_y = y + j;
                    //If we're looking at the middle point
                    if (i == 0 && j == 0) {
                        //Do nothing, we don't want to add ourselves in!
                    }
                    //In case the index we're looking at it off the edge of the map
                    else if (neighbour_x < 0 || neighbour_y < 0 || neighbour_x >= map.length || neighbour_y >= map[0].length) {
                        count = count + 1;
                    }
                    //Otherwise, a normal check of the neighbour
                    else if (map[neighbour_x][neighbour_y] == 1) {
                        count = count + 1;
                    }
                }
            }
            return count;
        }

        private doSimulationStep(): number[][] {
            let newMap: number[][] = [];
            //map constructor
            for (var i: number = 0; i < this.width; i++) {
                newMap[i] = [];
                for (var j: number = 0; j < this.height; j++) {
                    newMap[i][j] = 1;
                }
            }

            //Loop over each row and column of the map
            for (let x = 0; x < this.cellmap.length; x++) {
                for (let y = 0; y < this.cellmap[0].length; y++) {
                    let nbs = this.countAliveNeighbours(this.cellmap, x, y);
                    //The new value is based on our simulation rules
                    //First, if a cell is alive but has too few neighbours, kill it.
                    if (this.cellmap[x][y] == 1) {
                        if (nbs < this.deathLimit) {
                            newMap[x][y] = 0;
                        }
                        else {
                            newMap[x][y] = 1;
                        }
                    } //Otherwise, if the cell is dead now, check if it has the right number of neighbours to be 'born'
                    else {
                        if (nbs > this.birthLimit) {
                            newMap[x][y] = 1;
                        }
                        else {
                            newMap[x][y] = 0;
                        }
                    }
                }
            }
            return newMap;
        }


    }
}