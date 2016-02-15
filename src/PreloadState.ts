/// <reference path="../lib/phaser.d.ts" />
module states {

    export class PreloadState extends Phaser.State {
        preloadBar: Phaser.Sprite;

        preload() {
            this.preloadBar = this.add.sprite(100, 400, "preloadbar");
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image("titlepage", "assets/titlepage.jpg");
            this.load.image("sky", "assets/sky.png");
            this.load.audio("vso", "assets/demo-vso.mp3");

        }

        create() {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startTitleMenu, this);
        }

        startTitleMenu() {
            this.game.state.start("title", true, false);
        }

    }

}
