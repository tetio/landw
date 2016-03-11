/// <reference path="../lib/phaser.d.ts" />
/// <reference path="../lib/underscore.d.ts" />
/// <reference path="Tile.ts" />

module states {
    export class TileRack {
        game: Phaser.Game;
        dim: Phaser.Rectangle;
        tiles: Tile[];
        width: number;
        sendButton: Phaser.Button;

        constructor(game: Phaser.Game) {
            this.game = game;
            this.tiles = [];
        }

        setDim(dim: Phaser.Rectangle) {
            this.dim = dim;
        }

        removeChar(tile: Tile): number {
            if (tile.rackIndex < 0) {
                return -1;
            } else {
                this.tiles.splice(tile.rackIndex, 1);
            }
            return this.tiles.length;
        }

        findCharPosition(point: Phaser.Point): number {
            // var tileOnRack = _.find(this.tiles, function(tile: Tile): Tile {
            //     if (point.x <= tile.position.x  + tile.width / 2) {
            //         return tile;
            //     }
            // });
            var tileOnRack: Tile;
            for (var i = 0; i < this.tiles.length; i++) {
                if (i > 0 && point.x <= this.tiles[i].rackX
                    && point.x >= this.tiles[i - 1].rackX + this.tiles[i-1].width / 2) {
                    tileOnRack = this.tiles[i];
                    break;
                } else if (point.x <= this.tiles[i].rackX + this.tiles[i].width / 2
                    && point.x >= this.tiles[i].rackX) {
                    tileOnRack = this.tiles[i];
                    break;
                }
            }
            if (tileOnRack == undefined && this.tiles.length == 0) {
                return 0;
            } else if (tileOnRack == undefined && this.tiles.length > 0) {
                return this.tiles.length;
            } else if (point.x >= this.width) {
                return this.tiles.length;
            } else {
                return tileOnRack.rackIndex;
            }
        }

        recalculateTileRack() {
            var x = 0;
            // var i = 0;
            // var rack = this;
            // _.forEach(this.tiles, function(tile) {
            //     tile.position = new Phaser.Point(x, rack.dim.y);
            //     tile.rackIndex = i;
            //     x += tile.width;
            //     i++;
            // });
            for (var i = 0; i < this.tiles.length; i++) {
                this.tiles[i].rackX = x;
                this.tiles[i].position = new Phaser.Point(x, this.dim.y);
                this.tiles[i].rackIndex = i;
                x += this.tiles[i].width;
            }
            this.width = x;
        }

        addTile(tile: Tile, point: Phaser.Point): number {
            let idx = this.findCharPosition(point);
            tile.rackIndex = idx;
            this.tiles.splice(idx, 0, tile);
            this.recalculateTileRack();
            return this.tiles.length;
        }

        moveTile(tile: Tile, point: Phaser.Point): number {
            let idx: number = this.findCharPosition(point);

            if (idx >= tile.rackIndex) {
                this.tiles.splice(idx, 0, tile);
                this.tiles.splice(tile.rackIndex, 1);
            } else {
                this.tiles.splice(tile.rackIndex, 1);
                this.tiles.splice(idx, 0, tile);
            }
            this.recalculateTileRack();
            return this.tiles.length;
        }
    }
}