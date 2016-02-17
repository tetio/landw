/// <reference path="../lib/phaser.d.ts" />
/// <reference path="../lib/SaveCPU.d.ts" />

module states {

    export class BootState extends Phaser.State {

        preload() {
            this.load.image("preloadbar", "assets/loader.png");
        }

        create() {
            var scpu = <Phaser.Plugin.SaveCPU>this.game.plugins.add(Phaser.Plugin.SaveCPU)
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.state.start("preload", true, false);
        }

    }

}
