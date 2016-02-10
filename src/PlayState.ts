/// <reference path="../lib/phaser.d.ts" />
/// <reference path="Board.ts" />
/// <reference path="Game.ts" />
/// <reference path="BusinessDelegate.ts" />
module states {

    export class PlayState extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        board: Board;
        bd: BusinessDelegate;
        lwGame: states.Game;
        boardWidth: number;
        boardHeight: number;

        constructor() {
            super();
        }

        create() {
            if (this.game.width > this.game.height) {
                this.boardHeight = this.game.height;
            } else {
                this.boardHeight = this.game.height * 2 / 3;
            }
            this.boardWidth = this.boardHeight;

            this.background = this.add.sprite(0, 0, "sky");
            this.music = this.add.audio("vso", 1, false);
            //            this.music.play();

            this.bd = new BusinessDelegate();
            this.board = new Board(this.game, this.boardWidth, this.boardHeight);

//            this.newTrainingGame("tetio", "CA", this.callbackNewGame);
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

        // newTrainingGame(username: string, langage: string, next: (aGame: Game) => void) {
        //     this.bd.createNewGame(username, 1, langage, function(aGame: Game) {
        //         next(aGame);
        //     });
        // }

        // callbackNewGame(aGame: Game) {
        //     this.lwGame = aGame;
        //     this.board.setLetters(aGame.board);
        // }
    }
}
