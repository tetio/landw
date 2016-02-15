/// <reference path="../lib/phaser.d.ts" />
/// <reference path="Letter.ts" />
module states {
    export class TileRack {
        game: Phaser.Game;
        letters: Letter[];
        font = 'bold 60pt Arial';
        dim: Phaser.Rectangle;

        constructor(game: Phaser.Game, dim: Phaser.Rectangle) {
            this.game = game;
            this.dim = dim;
            this.letters = [];
        }

        addLetter(letter: Letter) {
        }

        removeLetter(letter: Letter) {
        }

    }
}
