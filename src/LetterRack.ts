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

        findLetterPosition(letter: Letter) : number {
            var letterOnRack = _.find(this.letters, function(aLetter: Letter): number {
                if (aLetter.getBounds().contains(letter.position.x, letter.position.y)) {
                    return aLetter.rackIndex;
                }
            });
            if (letterOnRack == undefined) {
                return 0;
            } else {
                return letterOnRack.index;
            }
        }

        recalculateLetterPossitions() {
	       // TODO
        }

        addLetter(letter: Letter): number {
            // TODO find spot then insert letter
            var idx = this.findLetterPosition(letter);
            letter.rackIndex = idx;
            this.letters.splice(idx, 0, letter);
            this.recalculateLetterPossitions();
            return this.letters.length;
        }
    }
}