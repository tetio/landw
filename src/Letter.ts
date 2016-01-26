/// <reference path="../lib/phaser.d.ts" />
module states {
    export class Letter extends Phaser.Text {

        letter: string;


        constructor(game: Phaser.Game, x: number, y: number, letter: string, font: string) {
            super(game, x, y, letter, { font: font, fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 450 });

            this.letter = letter;
            this.font = font;

            this.inputEnabled = true;
            this.input.enableDrag(true);
            this.events.onDragStop.add(this.onDragStop);

            this.game.add.existing(this);

        }

        onDragStop(letter: Letter) {
            console.log("Pos: " + letter.letter + " (" + letter.position.x + ", " + letter.position.y + ")");
            console.log("dim: " + letter.letter + " (" + letter.width + ", " + letter.height + ")");
        }
    }
}