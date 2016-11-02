module states {
    const MAX_NUM_CHECKS = 10;

    export class WaitingForSomeoneToJoinTimer {
        timer: Phaser.Timer;
        timerEvent: Phaser.TimerEvent;
        numChecks = 0;
        api: ApiDelegate;
        game: Phaser.Game;
        gameId: string;


        constructor(game: Phaser.Game, gameId: string, api: ApiDelegate) {
            this.game = game;
            this.gameId = gameId;
            this.api = api;
            this.timer = game.time.create();
            this.timerEvent = this.timer.add(Phaser.Timer.SECOND , this.checkGameState, this);
            this.timer.start();
        }

        checkGameState() {
            if (this.numChecks > MAX_NUM_CHECKS) {
                // TODO NO GAME TO JOIN FOUND, LETS CREATE ONE
                this.timer.stop();
                // return !!!!
            }
            // get game data from server
            this.api.findGameById(this.gameId, (aGame: Game) => {
                if (aGame.state == 'CREATED') {
                    // TODO LETS TRY TO FIND A GAME TO JOIN ONCE AGAIN
                } else {
                    // BINGO! GAME FOUND!!
                }
            });            
        }

    }
}