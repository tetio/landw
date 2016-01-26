/// <reference path="../lib/phaser.d.ts" />
/// <reference path="Board.ts"/>
module states {

    export class PlayState extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        board: Board;


        constructor() {
            super();
        }

        create() {
            this.background = this.add.sprite(0, 0, "sky");
            this.board = new Board(this.game, ['A', 'B', 'C', 'L·L', 'E', 'F', 'G', 'H',
                'A', 'B', 'C', 'NY', 'E', 'F', 'G', 'H',]);
            this.music = this.add.audio("vso", 1, false);

            this.music.play();
        }

        update() {
<<<<<<< HEAD
=======
            this.game.physics.arcade.collide(this.hero, this.platforms.platforms);
            this.hero.body.velocity.x = 0;

            if (this.cursors.up.isDown && this.hero.body.touching.down) {
                this.hero.body.velocity.y = -350;
            } else if (this.cursors.left.isDown) {
                this.hero.body.velocity.x = -150;
                this.hero.animations.play('left');
            } else if (this.cursors.right.isDown) {
                this.hero.body.velocity.x = 150;
                this.hero.animations.play('right');
            } else {
                this.hero.frame = 4;
            }

            // if (this.hero.body.velocity.x != 0 || this.hero.body.velocity.y != 0) {
            //     console.log("Hero(" + this.hero.body.position.x + ", " + this.hero.body.position.y + ")");
            // }

>>>>>>> d1efbdb1f1f0afe9b4dd2d80290e93f1a0252532
        }


    }
}
