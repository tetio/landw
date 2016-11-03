/// <reference path="Word.ts" />
/// <reference path="Game.ts" />
/// <reference path="Http.ts" />

module states {

    export class ApiDelegate extends Http {
        username: string;
        gameId: string;

        constructor() {
            // TODO: Read from a properties file depending on environment
            var host = window.location.hostname;
            console.log('host:' + host);
            super('http://'+host+':6061/api/', true);
        }

        createNewGame(username: string, maxPlayers: number, language: string = 'CA', next: (Game, isOk) => void) {
            this.username = username;
            let payload = {
                username: username,
                maxPlayers: maxPlayers,
                language: language,
            };
            this.setPayload(JSON.stringify(payload));
            this.setNext(next);
            this.send('POST', 'game');
        }

        addWord(username: string, gameId: string, word: string, next: (number, isOk) => void) {
            let payload = {
                username: username,
                gameId: gameId,
                word: word
            };
            this.setPayload(JSON.stringify(payload));
            this.setNext(next);
            this.send('POST', 'game/addWord');
        }

        joinGame(username: string, numPlayers: number = 2, language: string = 'CA', next: (game: Game, isOk) => void) {
            let payload = {
                username: username,
                numplayers: numPlayers,
                language: language
            };
            this.setPayload(JSON.stringify(payload));
            this.setNext(next);
            this.send('POST', 'game/joinGame');
        }

        findGameById(id: string, next: (Game, isOk) => void) {
            let payload = {
                id: id
            };
            this.setPayload(JSON.stringify(payload));
            this.setNext(next);
            this.send('POST', 'game/findById');
        }        
    }
}