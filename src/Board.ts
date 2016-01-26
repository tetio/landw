/// <reference path="../lib/phaser.d.ts" />
/// <reference path="./letter.ts" />
module states {
    export class Board {
        TILES_PER_ROW = 4;
        game: Phaser.Game;
        row: number;
        column: number;
        letters: Letter[];
        font = 'bold 60pt Arial';
        font2letters = 'bold 42pt Arial';
        width: number;
        height: number;


        constructor(game: Phaser.Game, letters: string[]) {
            this.game = game;
            this.height = Math.min(game.width, game.height);
            this.width = this.height;
            this.letters = [];
            for (var i = 0; i < letters.length; i++) {
                var x = (this.width / this.TILES_PER_ROW) * (i % this.TILES_PER_ROW) + (this.width / this.TILES_PER_ROW) / 2;
                var y = (this.height / this.TILES_PER_ROW) * Math.floor((i / this.TILES_PER_ROW));// - (this.width / this.TILES_PER_ROW) / 2;
                this.letters.push(this.createLetter(letters[i].toLocaleUpperCase(), x, y));
            }
        }

        isSpecialLetter(letter: string): boolean {
            return (letter === 'NY' || letter === 'L·L');
        }

        createLetter(letter: string, x: number, y: number): Letter {
            if (this.isSpecialLetter(letter)) {
                return new Letter(this.game, x, y, letter, this.font2letters);
            } else {
                return new Letter(this.game, x, y, letter, this.font);
            }
        }
    }
}