module states {
    const MAX_NUM_CHECKS = 10;

    export class WaitingForSomeoneToJoinTimer {
        timer: Phaser.Timer;
        timerEvent: Phaser.TimerEvent;
        numChecks = 0;
        api: ApiDelegate;
        gameId: string;
        next: Function;


        constructor(game: Phaser.Game, gameId: string, api: ApiDelegate, next: Function) {
            this.gameId = gameId;
            this.api = api;
            this.timer = game.time.create();
            this.timerEvent = this.timer.loop(Phaser.Timer.SECOND, next);
            //this.timer.add(Phaser.Timer.SECOND, 10,  this.checkGameState, this);
            this.timer.start();
        }

        stop() {
            this.timer.stop();
        }

        checkGameState() {
            this.numChecks += 1;
            console.log("WaitingForSomeoneToJoinTimer count=" + this.numChecks)
            if (this.numChecks > MAX_NUM_CHECKS) {
                // TODO NO GAME TO JOIN FOUND, LETS CREATE ONE
                this.timer.stop();
                this.next("KO");
                // return !!!!
            }
            // get game data from server
            this.api.findGameById(this.gameId, (aGame: Game, isOk: boolean) => {
                if (isOk && aGame.state === 'READY') {
                    this.next("READY");
                }
            });
        }

    }
}