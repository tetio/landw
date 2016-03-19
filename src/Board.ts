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
        font = 'montserratregular';//'60px Montserrat';
        font2 = '32pt montserratregular';
        boardDim: Phaser.Rectangle;
        rack: TileRack;
        test = false;

        constructor(game: Phaser.Game) {
            this.game = game;
            this.rack = new TileRack(this.game);
            this.calculateDims();
            this.chars = [];
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
            this.rack.setDim(new Phaser.Rectangle(0, height, width, this.game.height / 3));
        }

        setTiles(chars: string[]) {
            for (var i = 0; i < chars.length; i++) {
                var x = (this.boardDim.width / this.TILES_PER_ROW) * (i % this.TILES_PER_ROW) + (this.boardDim.width / this.TILES_PER_ROW) / 2;
                var y = (this.boardDim.height / this.TILES_PER_ROW) * Math.floor((i / this.TILES_PER_ROW));// - (this.width / this.TILES_PER_ROW) / 2;
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
            if (this.isTileInsideBoard(point)) {
                var idx = this.rack.removeChar(tile);
                tile.moveToBoard();
                this.rack.recalculateTileRack()
            } else if (this.isTileInsideTileRack(point)) {
                var idx: number;
                if (tile.isOnTheRack()) {
                    idx = this.rack.moveTile(tile, point);
                } else {
                    idx = this.rack.addTile(tile, point);
                    tile.moveToRack();
                }
            }
        }
    }
}
