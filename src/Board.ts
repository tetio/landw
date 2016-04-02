/// <reference path="../lib/phaser.d.ts" />
/// <reference path="Tile.ts" />
/// <reference path="TileRack.ts" />
module states {

    export class Board {
        TILES_PER_ROW = 4;
        game: Phaser.Game;
        row: number;
        column: number;
        chars: Tile[];
        //font = 'bold 60pt Arial';
        font = 'Verdana';
        fontSize = 64;
        fontSmallSize = 64;
        font2 = 'Verdana';
        boardDim: Phaser.Rectangle;
        scoreTableDim: Phaser.Rectangle;
        rack: TileRack;
        test = false;
        api: ApiDelegate;
        points: number;
        words: number;
        scoreTableText: Phaser.Text;
        onGoingGame: boolean;
        scaleFactor: number;

        constructor(game: Phaser.Game, api: ApiDelegate) {
            this.api = api;
            this.game = game;
            this.rack = new TileRack(this.game, this);
            this.calculateDims();
            this.chars = [];
            this.points = 0;
            this.words = 0;

            this.scoreTableText = new Phaser.Text(game, 0, this.scoreTableDim.height/4, this.scoreTableContents());
            this.scoreTableText.setStyle({font: this.font, fontSize: 24, fill: 'white', align: 'center',
                wordWrap: true, wordWrapWidth: this.game.width, backgroundColor: '#000000' });
            this.scoreTableText.position.x = 0; //this.game.width / 2 - this.scoreTableText.width / 2;
            this.game.add.existing(this.scoreTableText);
            this.onGoingGame = true;
        }

        calculateDims() {
            var width: number;
            var height: number;
            if (this.game.width > this.game.height) {
                height = this.game.height;
            } else {
                height = this.game.width;
            }
            width = height;
            this.scoreTableDim = new Phaser.Rectangle(0, 0, width, height*0.1);
            this.boardDim = new Phaser.Rectangle(0, height*0.1, width, height*0.6);
            this.rack.setDim(new Phaser.Rectangle(0, height * 0.7, width, height * 0.3));

            this.scaleFactor = (this.boardDim.width / this.TILES_PER_ROW)*0.6;

        }

        setTiles(chars: string[]) {
            for (var i = 0; i < chars.length; i++) {
                var x = (this.boardDim.width / this.TILES_PER_ROW) * (i % this.TILES_PER_ROW);// + (this.boardDim.width / this.TILES_PER_ROW) / 2;
                var y = this.boardDim.y  + (this.boardDim.height / this.TILES_PER_ROW) * Math.floor((i / this.TILES_PER_ROW));// - (this.width / this.TILES_PER_ROW) / 2;
                this.chars.push(this.createTile(chars[i].toLocaleUpperCase(), x, y, i));
            }
        }

        isSpecialChar(char: string): boolean {
            return (char === 'NY' || char === 'L·L');
        }

        createTile(char: string, x: number, y: number, index: number): Tile {
            if (this.isSpecialChar(char)) {
                return new Tile(this.game, x, y, char, this.font2, index, this);
            } else {
                return new Tile(this.game, x, y, char, this.font, index, this);
            }
        }

        isTileInsideBoard(position: Phaser.Point): boolean {
            return this.boardDim.contains(position.x, position.y);
        }

        isTileInsideTileRack(position: Phaser.Point): boolean {
            return this.rack.dim.contains(position.x, position.y);
        }

        tileMoved(tile: Tile, point: Phaser.Point) {
            if (this.isTileInsideTileRack(point)) {
                var idx: number;
                if (tile.isOnTheRack()) {
                    idx = this.rack.moveTile(tile, point);
                } else {
                    idx = this.rack.addTile(tile, point);
                    tile.moveToRack();
                }
            } else {
                // var idx = this.rack.removeChar(tile);
                // tile.moveToBoard();
                // this.rack.recalculateTileRack()
                this.rack.removeTile(tile);
            }
        }

        scoreTableContents(): string {
            return 'Punts: ' + this.points +"\t Paraules: "+this.words;
        }

        update() {
            // Nothing to do
            _.forEach(this.chars, function(char) {
                char.update();
            });
        }
    }
}
