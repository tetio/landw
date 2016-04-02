/// <reference path="../lib/phaser.d.ts" />
/// <reference path="Board.ts" />

module states {
    export class Tile extends Phaser.Sprite {
        character: string;
        index: number;
        board: Board;
        originalPosition: Phaser.Point;
        normalStyle: Phaser.PhaserTextStyle;
        rackIndex: number;
        rackX: number;
        text: Phaser.Text;
        scaleFactor: number;



        constructor(game: Phaser.Game, x: number, y: number, character: string,
            font: string, index: number, board: Board) {
            super(game, x, y, 'blackDot');//, { font: font, fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 450 });
            this.scaleFactor = board.scaleFactor;
            this.scale = new Phaser.Point(this.scaleFactor, this.scaleFactor);
            this.normalStyle = { font: font, fill: "white", wordWrap: true, wordWrapWidth: this.width, align: "center", backgroundColor: "black" };
            //{ font: font, fontSize: 64, fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: this.width, backgroundColor: '#cccccc' };
            this.text = new Phaser.Text(game, 0, 0, character, this.normalStyle);
            this.text.anchor.set(0.5);
            this.character = character;
            //this.setStyle(this.normalStyle);
            //this.font = font;
            this.scaleFactor = board.scaleFactor;
            this.text.fontSize = board.fontSize;
            this.index = index;
            this.board = board;
            this.inputEnabled = true;
            this.input.enableDrag(true);
            this.events.onDragStart.add(this.onDragStart);
            this.events.onDragStop.add(this.onDragStop);
            this.game.add.existing(this);
            this.game.add.existing(this.text);
            this.originalPosition = new Phaser.Point(x, y);
            this.rackIndex = -1;
        }


        update() {
            this.text.x = Math.floor(this.x + this.width / 2);
            this.text.y = Math.floor(this.y + this.height / 2);
        }


        onDragStart(tile: Tile, point: Phaser.Point) {
            tile.text.bringToTop();
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
            // if (this.isOnTheBoard) {
            //     this.setStyle(this.normalStyle);
            // } else {
            //     this.setStyle(this.rackStyle);
            // }
        }

        moveToBoard() {
            this.text.fontSize = this.board.fontSize;
            this.scaleFactor = this.board.scaleFactor;
            this.scale = new Phaser.Point( this.scaleFactor,  this.scaleFactor);
            this.position = this.originalPosition.clone();
            this.rackIndex = -1;
        }

        moveToRack() {
            // this.setStyle(this.rackStyle);
        }
    }
}