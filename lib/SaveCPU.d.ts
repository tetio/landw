/// <reference path="../lib/phaser.d.ts" />

declare module Phaser {
    module Plugin {
        class SaveCPU extends Phaser.Plugin {
            constructor(game: Phaser.Game, parent: Phaser.PluginManager);
            init(): void;
            postUpdate(): void;
            postRender(): void;
        }
    }
}