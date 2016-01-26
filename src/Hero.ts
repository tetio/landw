/// <reference path="../lib/phaser.d.ts" />
module states {
    export class Hero extends Phaser.Sprite {

        //cursors: Phaser.CursorKeys;


        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, "hero");

            this.inputEnabled = true;
            this.input.enableDrag(true);
            this.events.onDragStop.add(this.onDragStop);

            this.game.physics.enable(this, Phaser.Physics.ARCADE);

            this.body.bounce.y = 0.2;
            this.body.gravity.y = 300;
            this.body.collideWorldBounds = true;

            this.game.add.existing(this);

            this.animations.add('left', [0, 1, 2, 3], 10, true);
            this.animations.add('right', [5, 6, 7, 8], 10, true);

        }

        onDragStop(currentSprite: Phaser.Sprite) {
            console.log("Hero D&D(" + currentSprite.position.x + ", " + currentSprite.position.y + ")");
        }
    }
}