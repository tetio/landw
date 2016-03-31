/// <reference path="../lib/phaser.d.ts" />
module states {

    export class TitleState extends Phaser.State {
        background: Phaser.Sprite;
        logo: Phaser.Sprite;
        buttonPlay: Phaser.Button;
        trainingbuttonPlay: Phaser.Button;
        kidsbuttonPlay: Phaser.Button;
        setUpButton: Phaser.Button;

        create() {
            // this.background = this.add.sprite(0, 0, "titlepage");
            // this.background.alpha = 0;
            // this.add.tween(this.background).to({ alpha: 1}, 2000, Phaser.Easing.Elastic.InOut, true);
            // this.input.onDown.addOnce(this.fadeOut, this);
            this.buttonPlay = this.game.add.button(-10000, -10000, 'buttonPlay', this.buttonPlayCallback, this, 2, 1, 0);
            // this.trainingbuttonPlay = this.game.add.button(-10000, -10000, 'trainingbuttonPlay', this.trainingbuttonPlayCallback, this, 2, 1, 0);
            // this.kidsbuttonPlay = this.game.add.button(-10000, -10000, 'kidsbuttonPlay', this.kidsbuttonPlayCallback, this, 2, 1, 0);
            // this.setUpButton = this.game.add.button(-10000, -10000, 'setUpButton', this.setUpButtonCallback, this, 2, 1, 0);
            this.buttonPlay.position.y = this.game.height/5 ;
            this.buttonPlay.position.x = (this.game.width - this.buttonPlay.width) / 2;

        }

        // fadeOut() {
        //     this.game.state.start("play", true, false);
        // }

        buttonPlayCallback() {
            this.game.state.start("play", true, false);
        }

        trainingbuttonPlayCallback() {
            // TODO
        }

        kidsbuttonPlayCallback() {
            // TODO
        }

        setUpButtonCallback() {
            // TODO
        }
    }
}
