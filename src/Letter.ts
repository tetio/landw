/// <reference path="../lib/phaser.d.ts" />
/// <reference path="Board.ts" />

module states {
    export class Letter extends Phaser.Text {
        letter: string;
        index: number;
        board: Board;
        dim: Phaser.Rectangle;

        constructor(game: Phaser.Game, x: number, y: number, letter: string, font: string, index: number, board: Board) {
            super(game, x, y, letter, { font: font, fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 450 });
            this.letter = letter;
            this.font = font;
            this.index = index;
            this.board = board;
            this.inputEnabled = true;
            this.input.enableDrag(true);
            this.events.onDragStop.add(this.onDragStop);
            this.game.add.existing(this);
            this.dim = new Phaser.Rectangle(x, y, this.width, this.height);
            console.log('letter dim: '+letter+' ('+this.dim.x+", "+this.dim.y+", "+this.dim.width+", "+this.dim.height+")");
        }

        moveInsideLetter(position: Phaser.Point): boolean {
            return this.board.boardDim.contains(position.x, position.y);
        }

        onDragStop(letter: Letter) {
            if (letter.moveInsideLetter(letter.position)) {
                letter.position = new Phaser.Point(letter.dim.x, letter.dim.y);
            }
        }
    }
}