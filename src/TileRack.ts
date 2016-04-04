/// <reference path="../lib/phaser.d.ts" />
/// <reference path="../lib/lodash.d.ts" />
/// <reference path="Tile.ts" />

module states {
    export class TileRack {
        static SCALE_FACTOR: number = 0.60;
        game: Phaser.Game;
        dim: Phaser.Rectangle;
        tiles: Tile[];
        currentWidth: number;
        buttonSend: Phaser.Button;
        parent: Board;

        constructor(game: Phaser.Game, parent: Board) {
            this.parent = parent;
            this.game = game;
            this.tiles = [];
        }

        setDim(dim: Phaser.Rectangle) {
            this.dim = dim;
            this.buttonSend = this.game.add.button(-1000, this.dim.y, 'buttonSend', this.sendButtonCallback, this, 2, 1, 0);
            this.buttonSend.position.y = this.dim.y + (this.dim.height - this.buttonSend.height) / 2;
            this.buttonSend.position.x = this.dim.width - this.buttonSend.width;
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
            var previousTile: Tile;
            let x = point.x;
            var tileOnRack: Tile = _.find(this.tiles, function(tile: Tile): Tile {
                if ((previousTile && (x <= tile.rackX && x >= previousTile.rackX + previousTile.width / 2) || (x <= tile.rackX + tile.width / 2 && x >= tile.rackX))
                    || (x <= tile.rackX + tile.width / 2)) {
                    return tile;
                }
                previousTile = tile;
            });
            if (tileOnRack == undefined && this.tiles.length == 0) {
                return 0;
            } else if (tileOnRack == undefined && this.tiles.length > 0) {
                return this.tiles.length;
            } else if (point.x >= this.currentWidth) {
                return this.tiles.length;
            } else {
                return tileOnRack.rackIndex;
            }
        }

        recalculateTileRack(recalculateWith: number = 0) {
            var x = 0;
            let tr = this;
            var scaleFactor = 0;
            if (recalculateWith != 0) {
                this.parent.fontSmallSize += 12 * recalculateWith;
                if (recalculateWith == -1) {
                    scaleFactor = this.tiles[0].scaleFactor * TileRack.SCALE_FACTOR;
                } else {
                    scaleFactor = this.tiles[0].scaleFactor * TileRack.SCALE_FACTOR * 2;
                }
            }
            _.each(this.tiles, function(tile: Tile, idx: number) {
                if (scaleFactor != 0) {
                    tile.scaleFactor = scaleFactor;
                    tile.scale = new Phaser.Point(scaleFactor, scaleFactor);
                }
                tile.text.fontSize = tr.parent.fontSmallSize;
                tile.rackX = x;
                tile.position = new Phaser.Point(x, tr.dim.y + (tr.dim.height - tr.buttonSend.height) / 2);
                tile.rackIndex = idx;
                x += tile.width;
            });
            this.currentWidth = x;
        }

        addTile(tile: Tile, point: Phaser.Point): number {
            var recalculateWith = 0;
            if (this.tiles.length != 0) {
                tile.scaleFactor = this.tiles[0].scaleFactor;
                tile.scale = new Phaser.Point(tile.scaleFactor, tile.scaleFactor);
            }

            if (this.currentWidth + tile.width > this.dim.width - this.buttonSend.width) {
                recalculateWith = -1;
            }
            let idx = this.findCharPosition(point);
            tile.rackIndex = idx;
            this.tiles.splice(idx, 0, tile);
            this.recalculateTileRack(recalculateWith);
            return this.tiles.length;
        }

        removeTile(tile: Tile) {
            var idx = this.removeChar(tile);
            this.currentWidth -= tile.width;
            tile.moveToBoard();
            var recalculateWith = 0;
            if (this.currentWidth < this.dim.width - this.buttonSend.width && this.parent.fontSize > this.parent.fontSmallSize) {
                recalculateWith = 1;
            }
            this.recalculateTileRack(recalculateWith)
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

        sendButtonCallback() {
            if (!this.parent.onGoingGame) {
                return;
            }
            let tr = this;
            this.parent.api.addWord(this.parent.api.username, this.parent.api.gameId, this.rack2word(), function(isValid: number) {
                if (isValid == 1) {
                    tr.parent.words++;
                    tr.parent.points += tr.tiles.length;
                    _.each(tr.tiles, function(tile: Tile) {
                        tile.moveToBoard();
                    });
                    tr.tiles = [];
                    tr.parent.scoreTableText.text = tr.parent.scoreTableContents();
                }
            });

        }

        rack2word(): string {
            return _.reduce(this.tiles, function(result: string, tile: Tile): string {
                return result + tile.character;
            }, '');
        }
    }
}