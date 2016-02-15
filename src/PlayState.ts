/// <reference path="../lib/phaser.d.ts" />
/// <reference path="Board.ts" />
/// <reference path="Game.ts" />
/// <reference path="BusinessDelegate.ts" />
/// <reference path="Word.ts" />

module states {

    export class PlayState extends Phaser.State {
        background: Phaser.Sprite;
        music: Phaser.Sound;
        board: Board;
        bd: BusinessDelegate;
        lwGame: states.Game;

        constructor() {
            super();
        }

        create() {
            this.background = this.add.sprite(0, 0, "sky");
            this.music = this.add.audio("vso", 1, false);
            //            this.music.play();
            this.bd = new BusinessDelegate();
            this.board = new Board(this.game);
            this.newTrainingGame("tetio", "CA", this);
        }

        update() {
            // if (this.hero.body.velocity.x != 0 || this.hero.body.velocity.y != 0) {
            //     console.log("Hero(" + this.hero.body.position.x + ", " + this.hero.body.position.y + ")");
            // }
        }

        checkWord(word: string, next: (Word) => void) {
            var result: boolean;
            this.bd.findWord(word, function(word: Word) {
                next(word);
            });
        }

        newTrainingGame(username: string, langage: string, ps: PlayState) {
            this.bd.createNewGame(username, 1, langage, function(aGame: Game) {
                ps.lwGame = aGame;
                ps.board.setLetters(aGame.board);
            });
        }

    }
}
