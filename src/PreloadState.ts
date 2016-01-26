/// <reference path="../lib/phaser.d.ts" />
module states {

    export class PreloadState extends Phaser.State {
        preloadBar: Phaser.Sprite;

        preload() {
            this.preloadBar = this.add.sprite(200, 250, "preloadbar");
            this.load.setPreloadSprite(this.preloadBar);

            this.load.image("titlepage", "assets/titlepage.jpg");

            this.load.spritesheet("hero", "assets/dude.png", 32, 48);
            this.load.spritesheet("baddie", "assets/baddie.png", 32, 48);
            this.load.image("diamond", "assets/diamond.png");
            this.load.image("star", "assets/star.png");
            this.load.image("ground", "assets/platform.png");
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
