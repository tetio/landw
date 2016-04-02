/// <reference path="../lib/phaser.d.ts" />
/// <reference path="../lib/underscore.d.ts" />
/// <reference path="Tile.ts" />

module states {
    export class TileRack {
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
            // var tileOnRack = _.find(this.tiles, function(tile: Tile): Tile {
            //     if (point.x <= tile.position.x  + tile.width / 2) {
            //         return tile;
            //     }
            // });
            var tileOnRack: Tile;
            for (var i = 0; i < this.tiles.length; i++) {
                if (i > 0 && point.x <= this.tiles[i].rackX
                    && point.x >= this.tiles[i - 1].rackX + this.tiles[i - 1].width / 2) {
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
            } else if (point.x >= this.currentWidth) {
                return this.tiles.length;
            } else {
                return tileOnRack.rackIndex;
            }
        }

        recalculateTileRack(recalculateWith: number = 0) {
            var x = 0;
            // var i = 0;
            // var rack = this;
            // _.forEach(this.tiles, function(tile) {
            //     tile.position = new Phaser.Point(x, rack.dim.y);
            //     tile.rackIndex = i;
            //     x += tile.width;
            //     i++;
            // });
            var scaleFactor = 0;
            if (recalculateWith != 0) {
                this.parent.fontSmallSize += 12 * recalculateWith;
                if (recalculateWith == -1) {
                    scaleFactor = this.tiles[0].scaleFactor * 0.60;
                } else {
                    scaleFactor = this.tiles[0].scaleFactor * 1.20;
                }

            }
            for (var i = 0; i < this.tiles.length; i++) {
                if (scaleFactor != 0) {
                    this.tiles[i].scaleFactor = scaleFactor;
                    this.tiles[i].scale = new Phaser.Point(scaleFactor, scaleFactor);
                }
                this.tiles[i].text.fontSize = this.parent.fontSmallSize;
                this.tiles[i].rackX = x;
                this.tiles[i].position = new Phaser.Point(x, this.dim.y + (this.dim.height - this.buttonSend.height) / 2);
                this.tiles[i].rackIndex = i;
                x += this.tiles[i].width;

            }
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
            if (this.currentWidth  < this.dim.width - this.buttonSend.width && this.parent.fontSize > this.parent.fontSmallSize) {
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
            var tr = this;
            this.parent.api.addWord(this.parent.api.username, this.parent.api.gameId, this.rack2word(), function(isValid: number) {
                // todo
                if (isValid == 1) {
                    tr.parent.words++;
                    tr.parent.points += tr.tiles.length;
                    //for (var i = tr.tiles.length - 1; i >= 0; i--) {
                    _.each(tr.tiles, function(tile: Tile) {
                        tile.moveToBoard();
                        //};
                    });
                    tr.tiles = [];
                    tr.parent.scoreTableText.text = tr.parent.scoreTableContents();
                }
            });

        }

        rack2word(): string {
            var word = '';
            _.forEach(this.tiles, function(tile) {
                word = word + tile.character;
            });
            return word;
        }
    }
}