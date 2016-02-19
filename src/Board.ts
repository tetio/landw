/// <reference path="../lib/phaser.d.ts" />
/// <reference path="Letter.ts" />
/// <reference path="LetterRack.ts" />
module states {

    export class Board {
        TILES_PER_ROW = 4;
        game: Phaser.Game;
        row: number;
        column: number;
        letters: Letter[];
        font = 'bold 60pt Arial';
        font2letters = 'bold 42pt Arial';
        boardDim: Phaser.Rectangle;
        letterRack: LetterRack;
        test = false;

        constructor(game: Phaser.Game) {
            this.game = game;
            this.letterRack = new LetterRack(this.game);
            this.calculateDims();
            this.letters = [];
        }

        calculateDims() {
            var width: number;
            var height: number;
            if (this.game.width > this.game.height) {
                height = this.game.height;
            } else {
                height = this.game.height * 2 / 3;
            }
            width = height;
            this.boardDim = new Phaser.Rectangle(0, 0, width, height);
            this.letterRack.setDim(new Phaser.Rectangle(0, height, width, this.game.height / 3));
        }

        setLetters(letters: string[]) {
            for (var i = 0; i < letters.length; i++) {
                var x = (this.boardDim.width / this.TILES_PER_ROW) * (i % this.TILES_PER_ROW) + (this.boardDim.width / this.TILES_PER_ROW) / 2;
                var y = (this.boardDim.height / this.TILES_PER_ROW) * Math.floor((i / this.TILES_PER_ROW));// - (this.width / this.TILES_PER_ROW) / 2;
                this.letters.push(this.createLetter(letters[i].toLocaleUpperCase(), x, y, i));
            }
        }

        isSpecialLetter(letter: string): boolean {
            return (letter === 'NY' || letter === 'L·L');
        }

        createLetter(letter: string, x: number, y: number, index: number): Letter {
            if (this.isSpecialLetter(letter)) {
                return new Letter(this.game, x, y, letter, this.font2letters, index, this);
            } else {
                return new Letter(this.game, x, y, letter, this.font, index, this);
            }
        }

        isLetterInsideBoard(position: Phaser.Point): boolean {
            return this.boardDim.contains(position.x, position.y);
        }

        isLetterInsideLetterRack(position: Phaser.Point): boolean {
            return this.letterRack.dim.contains(position.x, position.y);
        }

        letterMoved(letter: Letter) {
            if (this.isLetterInsideBoard(letter.position)) {
                var idx = this.letterRack.removeLetter(letter);
                letter.moveToBoard();
            } else if (this.isLetterInsideLetterRack(letter.position)) {
                letter.moveToRack();
            }
        }
    }
}
