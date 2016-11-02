/// <reference path="../lib/phaser.d.ts" />


module states {

    //     import webfontloader = require("webfontloader");


    export class PreloadState extends Phaser.State {
        preloadBar: Phaser.Sprite;


        preload() {
            this.preloadBar = this.add.sprite(100, 400, "preloadbar");
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image("titlepage", "assets/titlepage.jpg");
            this.load.image("sky", "assets/sky.png");
            this.load.image("blackDot", "assets/blackDot.png");
            this.load.spritesheet("buttonSend", "assets/buttonSend.png", 72, 72);
            this.load.spritesheet("buttonGame", "assets/buttonGame.png", 128, 72);
            this.load.spritesheet("buttonTrainingGame", "assets/buttonTrainingGame.png", 128, 72);
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
