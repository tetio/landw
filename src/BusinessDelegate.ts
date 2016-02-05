/// <reference path="../lib/jquery.d.ts" />
/// <reference path="Word.ts" />


module states {


    export class BusinessDelegate {

        constructor() {
            //     //.header('AuthToken', 'test') // set global header
            //     //.prefixUrl('api/v1')
            // this.api = restful('localhost')
            //     .protocol('http')
            //     .port(6061);



        }


        createNewGame(username: string, numPlayers: number, language: string = 'CA', next: (string) => void) {
        }

        findWord(word:string, next: (Word) => void) {
            $.getJSON("http://localhost:6061/word/"+word, aWord => {
                console.log('aWord: ' + aWord.word);
                next(aWord);
            });
        }

    }
}