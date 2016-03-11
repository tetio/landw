/// <reference path="../lib/phaser.d.ts" />
/// <reference path="Board.ts" />

module states {
    export class Tile extends Phaser.Text {
        character: string;
        index: number;
        board: Board;
        originalPosition: Phaser.Point;
        normalStyle: Phaser.PhaserTextStyle;
        rackStyle: Phaser.PhaserTextStyle;
        rackIndex: number;


        constructor(game: Phaser.Game, x: number, y: number, character: string, font: string, index: number, board: Board) {
            super(game, x, y, character);//, { font: font, fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 450 });
            this.normalStyle = { font: font, fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 450, backgroundColor: '#222222' };
            this.rackStyle = { font: font, fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 450, backgroundColor: '#22A022' };
            this.character = character;
            this.setStyle(this.normalStyle);
            this.font = font;
            this.index = index;
            this.board = board;
            this.inputEnabled = true;
            this.input.enableDrag(true);
            this.events.onDragStop.add(this.onDragStop);
            this.game.add.existing(this);
            this.originalPosition = new Phaser.Point(x, y);
            this.rackIndex = -1;
            console.log('letter position: ' + character + ' (' + this.originalPosition.x + ", " + this.originalPosition.y + ")");
        }

        onDragStop(tile: Tile, point: Phaser.Point) {
            tile.board.tileMoved(tile, point);
        }

        isOnTheRack(): boolean {
            return this.rackIndex >= 0;
        }

        isOnTheBoard(): boolean {
            return this.rackIndex == -1;
        }

        changeStyle() {
            if (this.isOnTheBoard) {
                this.setStyle(this.normalStyle);
            } else {
                this.setStyle(this.rackStyle);
            }
        }

        moveToBoard() {
            this.setStyle(this.normalStyle);
            this.position = this.originalPosition.clone();
            this.rackIndex = -1;
        }

        moveToRack() {
            this.setStyle(this.rackStyle);
        }
    }
}