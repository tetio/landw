/// <reference path="../lib/phaser.d.ts" />
/// <reference path="Board.ts" />
/// <reference path="Game.ts" />
/// <reference path="ApiDelegate.ts" />
/// <reference path="Word.ts" />

module states {

    export class PlayState extends Phaser.State {
        //background: Phaser.Sprite;
        music: Phaser.Sound;
        board: Board;
        api: ApiDelegate;
        lwGame: states.Game;

        constructor() {
            super();
        }

        create() {
            //this.background = this.add.sprite(0, 0, "sky");
            this.game.stage.backgroundColor = '#000000'
            this.music = this.add.audio("vso", 1, false);
            //            this.music.play();
            this.api = new ApiDelegate();
            this.board = new Board(this.game, this.api);
            this.newTrainingGame("tetio", "CA", this);
        }

        update() {
            // if (this.hero.body.velocity.x != 0 || this.hero.body.velocity.y != 0) {
            //     console.log("Hero(" + this.hero.body.position.x + ", " + this.hero.body.position.y + ")");
            // }
        }

        checkWord(word: string, next: (Word) => void) {
            var result: boolean;
            this.api.findWord(word, function(word: Word) {
                next(word);
            });
        }

        newTrainingGame(username: string, langage: string, ps: PlayState) {
            this.api.createNewGame(username, 1, langage, function(aGame: Game) {
                ps.lwGame = aGame;
                ps.api.gameId = aGame._id;
                ps.board.setTiles(aGame.board);
            });
        }

    }
}
