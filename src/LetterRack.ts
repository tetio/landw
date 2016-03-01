/// <reference path="../lib/phaser.d.ts" />
/// <reference path="../lib/underscore.d.ts" />
/// <reference path="Letter.ts" />

module states {
    export class LetterRack {
        game: Phaser.Game;
        dim: Phaser.Rectangle;
        letters: Letter[];

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

        findLetterPosition(letter: Letter): number {
            // var letterOnRack = _.find(this.letters, function(aLetter: Letter): number {
            //     if (aLetter.getBounds().contains(letter.position.x, letter.position.y)) {
            //         return aLetter.rackIndex;
            //     }
            // });
            var letterOnRack: number;
            for (var i = 0; i < this.letters.length; i++) {
                // if (this.letters[i].getBounds().contains(letter.position.x, letter.position.y)) {
                    if (letter.position.x <= this.letters[i].position.x + this.letters[i].width/2) {
                        letterOnRack = i;
                        break;
                    }
                // }
            }
            if (letterOnRack == undefined) {
                return this.letters.length;
            }
        }

        recalculateLetterPossitions() {
            var x = 0;
            var lb = this;
            _.forEach(this.letters, function(letter) {
                letter.position = new Phaser.Point(x, lb.dim.y);
                x += letter.width;
            });
        }

        addLetter(letter: Letter): number {
            // TODO find spot then insert letter
            var idx = this.findLetterPosition(letter);
            letter.rackIndex = idx;
            this.letters.splice(idx, 0, letter);
            this.recalculateLetterPossitions();
            return this.letters.length;
        }

        moveLetter(letter: Letter): number {
            // TODO find spot then insert letter
            let idx = this.findLetterPosition(letter);
            this.letters.splice(letter.rackIndex, 1);
            letter.rackIndex = idx;
            this.letters.splice(idx, 0, letter);
            this.recalculateLetterPossitions();
            return this.letters.length;
        }
    }
}