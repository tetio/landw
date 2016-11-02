/// <reference path="../lib/phaser.d.ts" />
/// <reference path="BootState.ts" />
/// <reference path="PreloadState.ts" />
/// <reference path="TitleState.ts" />
/// <reference path="TrainingGameState.ts" />
/// <reference path="GameState.ts" />
/// <reference path="../lib/SaveCPU.d.ts" />

class Game extends Phaser.Game {

    constructor() {
        super(800, 800, Phaser.AUTO, "Letters and Words", null);
        this.state.add("boot", new states.BootState());
        this.state.add("preload", new states.PreloadState());
        this.state.add("title", new states.TitleState());
        this.state.add("trainingGame", new states.TrainingGameState());
        this.state.add("game", new states.GameState());
        this.state.start("boot");
    }
}

var game = new Game();