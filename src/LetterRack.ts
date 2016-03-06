/// <reference path="../lib/phaser.d.ts" />
/// <reference path="../lib/underscore.d.ts" />
/// <reference path="Letter.ts" />

module states {
    export class LetterRack {
        game: Phaser.Game;
        dim: Phaser.Rectangle;
        letters: Letter[];
        width: number;

        constructor(game: Phaser.Game) {
            this.game = game;
            this.letters = [];
        }

        setDim(dim: Phaser.Rectangle) {
            this.dim = dim;
        }

        removeLetter(letter: Letter): number {
            if (letter.rackIndex < 0) {
                return -1;
            } else {
                this.letters.splice(letter.rackIndex, 1);
            }
            return this.letters.length;
        }

        findLetterPosition(point: Phaser.Point): number {
            var letterOnRack = _.find(this.letters, function(letter: Letter): Letter {
                if (point.x <= letter.position.x + (letter.width / 2)) {
                    return letter;
                }
            });
            if (letterOnRack == undefined && this.letters.length == 0) {
                return 0;
            } else if (letterOnRack == undefined && this.letters.length > 0) {
                return this.letters.length;
            } else if (point.x >= this.width){
                return this.letters.length;
            } else {
                return letterOnRack.rackIndex;
            }
        }

        recalculateLetterPossitions() {
            var x = 0;
            var i = 0;
            var lb = this;
            _.forEach(this.letters, function(letter) {
                letter.position = new Phaser.Point(x, lb.dim.y);
                letter.rackIndex = i;
                x += letter.width;
                i++;
            });
            this.width = x;
        }

        addLetter(letter: Letter, point: Phaser.Point): number {
            let idx = this.findLetterPosition(point);
            this.letters.splice(idx, 0, letter);
            this.recalculateLetterPossitions();
            return this.letters.length;
        }

        moveLetter(letter: Letter, point: Phaser.Point): number {
            let idx: number = this.findLetterPosition(point);
            if (idx >= letter.rackIndex) {
                this.letters.splice(idx, 0, letter);
                this.letters.splice(letter.rackIndex, 1);
            } else {
                this.letters.splice(letter.rackIndex, 1);
                this.letters.splice(idx, 0, letter);
            }
            this.recalculateLetterPossitions();
            return this.letters.length;
        }
    }
}