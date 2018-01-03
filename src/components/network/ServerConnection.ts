/// <reference path="../../../node_modules/@types/socket.io-client/index.d.ts" />

namespace Darkworld.Components {
    export class ServerConnection extends Darkworld.Components.BaseComponent implements Darkworld.Components.IComponent {
        private game: Darkworld.DGame;
        private player: Darkworld.Entities.Mobiles.Humanoids.Player;
        private clientSocket : any;

        constructor(game: Darkworld.DGame, player: Darkworld.Entities.Mobiles.Humanoids.Player) {
            super("ServerConnection");
            this.game = game;
            this.player = player;

            this.clientSocket = io.connect("http://localhost:5000");
                        

        }

        update() {
            super.update();
        }
    }
}