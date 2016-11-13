/// <reference path="../lib/phaser.d.ts" />
/// <reference path="Board.ts" />
/// <reference path="BoardTimer.ts" />
/// <reference path="Game.ts" />
/// <reference path="ApiDelegate.ts" />
/// <reference path="Word.ts" />
/// <reference path="WaitingForSomeoneToJoinTimer.ts" />

module states {

    export class GameState extends Phaser.State {
        //background: Phaser.Sprite;
        music: Phaser.Sound;
        board: Board;
        api: ApiDelegate;
        lwGame: states.Game;
        gameTimer: WaitingForSomeoneToJoinTimer;

        constructor() {
            super();
        }

        create() {
            //this.background = this.add.sprite(0, 0, "sky");
            this.game.stage.backgroundColor = 'black'
            this.music = this.add.audio("vso", 1, false);
            //            this.music.play();
            this.api = new ApiDelegate();
            this.board = null;
            let d = new Date();
            this.joinGame("tetio"+d.getMilliseconds(), "CA", this);
        }

        update() {
            if (this.board !== null) {
                this.board.update();
            } else if (this.lwGame && this.lwGame.state === "KO" ) {
                // TODO no game partner found
            } else {
                // TODO SPINNIG BALL OF DEATH
            }
        }

        joinGame(username: string, language: string, tgs: GameState) {
            this.api.username = username;
            this.api.joinGame(username, 2, language, (aGame: Game, isOk: boolean) => {
                if (game !== null && isOk) {
                    tgs.lwGame = aGame;
                    tgs.api.gameId = aGame._id;
                    tgs.api.username = username;
                    tgs.board = new BoardTimer(this.game, this.api);
                    tgs.board.setTiles(aGame.board);
                } else {
                    this.api.createNewGame(username, 2, language, (newGame: Game) => {
                        tgs.lwGame = newGame;
                        tgs.api.gameId = newGame._id;
                    let self = this;
                        // TODO NOW TIMER FOR WAITING TO SOMEONE TO JOIN IN
                        this.gameTimer = new WaitingForSomeoneToJoinTimer(this.game, newGame._id, this.api, () => {
                            this.api.findGameById(newGame._id, (aGame: Game, isOk: boolean) => {
                                if (isOk && aGame.state === 'READY') {
                                    this.gameTimer.stop();
                                    tgs.lwGame.state = "READY";
                                    tgs.board = new BoardTimer(this.game, this.api);
                                    tgs.board.setTiles(newGame.board);
                                }
                            });            
                            
                        });
                    });
                }
            });
        }

    }
}
