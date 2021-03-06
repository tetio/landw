/// <reference path="GameResult.ts" />

module states {
    export class BoardTimer extends Board {
        timer: Phaser.Timer;
        timerEvent: Phaser.TimerEvent;

        constructor(game: Phaser.Game, api: ApiDelegate) {
            super(game, api);
            this.timer = game.time.create();
            this.timerEvent = this.timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, this.endTimer, this);
            this.timer.start();
        }

        endTimer() {
            this.onGoingGame = false;
            this.timer.stop();
            this.endGameResult();
        }

        scoreTableContents(): string {
            var scoreText = super.scoreTableContents();
            if (this.timer && this.timer.running) {
                scoreText += "\t\t Temps: " + this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000));
            }
            return scoreText;
        }

        formatTime(s: number): string {
            // Convert seconds (s) to a nicely formatted and padded time string
            let m = Math.floor(s / 60);
            let minutes = "0" + m;
            let seconds = "0" + (s - m * 60);
            return minutes.substr(-2) + ":" + seconds.substr(-2);
        }

        update() {
            super.update();
            var scoreText = super.scoreTableContents();
            if (this.timer && this.timer.running) {
                scoreText += "\t\t Temps: " + this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000));
            } else if (this.timer) {
                scoreText += "\t Temps: 0";
            }
            this.scoreTableText.text = scoreText;


            if (this.gameResult) {
                var resultText = "";
                if (this.gameResult.winner === "") {
                    resultText = "Has empatat";
                } else {
                    resultText = (this.gameResult.winner === this.api.username)? "Has guanyat!" : "Has perdut.";
                }
                
                this.gameResultText.text = resultText;
            }            
        }

        endGameResult() {
            this.api.gameResult((gameResult: GameResult, isOk: boolean) => {
                if (isOk) {
                    this.gameResult = gameResult;
                    this.gameResultText.visible = true;
                    _.forEach(this.chars, function (char) {
                        char.x = -10000;
                    });
                }
            });
        }

    }
}