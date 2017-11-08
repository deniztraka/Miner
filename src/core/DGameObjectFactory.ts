namespace Darkworld.Core {

    export class DGameObjectFactory extends Phaser.GameObjectFactory {
        tilemap(key?: string, tileWidth?: number, tileHeight?: number, width?: number, height?: number): Phaser.Tilemap {
            return new Darkworld.Core.DTileMap(this.game as DGame, key, tileWidth, tileHeight, width, height);
        };

    }
}