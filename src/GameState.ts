/// <reference path="../lib/phaser.d.ts" />
/// <reference path="Board.ts" />
/// <reference path="BoardTimer.ts" />
/// <reference path="Game.ts" />
/// <reference path="ApiDelegate.ts" />
/// <reference path="Word.ts" />

module states {

    export class GameState extends Phaser.State {
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
            this.game.stage.backgroundColor = 'black'
            this.music = this.add.audio("vso", 1, false);
            //            this.music.play();
            this.api = new ApiDelegate();
            this.board = new BoardTimer(this.game, this.api);
            this.joinGame("tetio", "CA", this);
        }

        update() {
            this.board.update();
        }

        joinGame(username: string, language: string, tgs: GameState) {
            this.api.joinGame(username, 2, language, (aGame: Game) => {
                if (game) {
                    tgs.lwGame = aGame;
                    tgs.api.gameId = aGame._id;
                    tgs.board.setTiles(aGame.board);
                } else {
                    this.api.createNewGame(username, 2, language, (aGame: Game) => {
                        tgs.lwGame = aGame;
                        tgs.api.gameId = aGame._id;
                        tgs.board.setTiles(aGame.board);

                        // TODO NOW TIMER FOR WAITING TO SOMEONE TO JOIN IN
                    });
                }
            });
        }

    }
}
