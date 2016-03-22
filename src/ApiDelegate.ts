/// <reference path="Word.ts" />
/// <reference path="Game.ts" />
/// <reference path="Http.ts" />
/// <reference path="PlayState.ts" />

module states {

    export class ApiDelegate extends Http {
        username: string;
        gameId: string;

        constructor() {
            // TODO: Read from a properties file depending on environment
            var host = window.location.hostname;
            console.log('host:' + host);
            super('http://'+host+':6061/', true);
        }

        createNewGame(username: string, numPlayers: number, language: string = 'CA', next: (Game) => void) {
            this.username = username;
            let payload = {
                username: username,
                numPlayers: numPlayers,
                language: language,
            };
            this.setPayload(JSON.stringify(payload));
            this.setNext(next);
            this.send('POST', 'game');
        }

        addWord(username: string, gameId: string, word: string, next: (number) => void) {
            let payload = {
                username: username,
                gameid: gameId,
                word: word
            };
            this.setPayload(JSON.stringify(payload));
            this.setNext(next);
            this.send('POST', 'addWord');
        }

        findWord(word: string, next: (Word) => void) {
            // $.getJSON("http://localhost:6061/word/"+word, aWord => {
            //     console.log('aWord: ' + aWord.word);
            //     next(aWord);
            // });
        }

    }
}