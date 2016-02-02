/// <reference path="../lib/phaser.d.ts" />
/// <reference path="Board.ts" />
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
            // if (this.hero.body.velocity.x != 0 || this.hero.body.velocity.y != 0) {
            //     console.log("Hero(" + this.hero.body.position.x + ", " + this.hero.body.position.y + ")");
            // }

        }


    }
}
