/// <reference path="../lib/phaser.d.ts" />
module states {

    export class TitleState extends Phaser.State {
        background: Phaser.Sprite;
        logo: Phaser.Sprite;

        create() {
            this.background = this.add.sprite(0, 0, "titlepage");
            this.background.alpha = 0;
            this.add.tween(this.background).to({ alpha: 1}, 2000, Phaser.Easing.Elastic.InOut, true);
            this.input.onDown.addOnce(this.fadeOut, this);
        }

        fadeOut() {
            this.game.state.start("play", true, false);
        }
    }
}
