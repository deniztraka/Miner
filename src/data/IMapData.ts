namespace Darkworld.Data {
    export interface IMapDataGenerator {
        generateMap(fillSides:boolean):number[][];
    }
}