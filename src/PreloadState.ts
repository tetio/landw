/// <reference path="../lib/phaser.d.ts" />


module states {

  //     import webfontloader = require("webfontloader");


    export class PreloadState extends Phaser.State {
        preloadBar: Phaser.Sprite;
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    // active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['montserratregular']
    }

};


        preload() {
            this.preloadBar = this.add.sprite(100, 400, "preloadbar");
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image("titlepage", "assets/titlepage.jpg");
            this.load.image("sky", "assets/sky.png");
            this.load.spritesheet("buttonSend", "assets/buttonSend.png", 72, 72);
            this.load.audio("vso", "assets/demo-vso.mp3");
            this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

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
