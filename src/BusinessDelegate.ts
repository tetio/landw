/// <reference path="../lib/jquery.d.ts" />
/// <reference path="Word.ts" />
/// <reference path="Game.ts" />
/// <reference path="PlayState.ts" />

module states {

    export class BusinessDelegate {
        constructor() {
        }

        createNewGame(username: string, numPlayers: number, language: string = 'CA', next: (Game) => void) {
            var data = {
                username: username,
                numPlayers: numPlayers,
                language: language
            };
            $.ajax({
                type: "post",
                url: "http://localhost:6061/game",
                data: "usermane=" + username + "&numPlayers=" + numPlayers + "&language=" + numPlayers,
                success: aGame => {
                    console.log('aGame: ' + aGame._id);
                    next(aGame);
                }
            });
        }

        findWord(word:string, next: (Word) => void) {
            $.getJSON("http://localhost:6061/word/"+word, aWord => {
                console.log('aWord: ' + aWord.word);
                next(aWord);
            });
        }

    }
}