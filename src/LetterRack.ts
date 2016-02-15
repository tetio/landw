/// <reference path="../lib/phaser.d.ts" />

module states {
    export class LetterRack {
        game: Phaser.Game;
        dim: Phaser.Rectangle;

        constructor(game: Phaser.Game) {
            this.game = game;
        }

        setDim(dim: Phaser.Rectangle) {
            this.dim = dim;
        }
    }
}