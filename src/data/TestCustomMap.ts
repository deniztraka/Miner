namespace Darkworld.Data {
    export class TestCustomMap implements Darkworld.Data.IMapDataGenerator {


        generateMap(fillSides: boolean): number[][] {
            var data: number[][] =
                [
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 1, 1, 0, 0, 1, 0, 1],
                    [1, 0, 0, 1, 1, 0, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                ];

            return data;
        }

    }
}