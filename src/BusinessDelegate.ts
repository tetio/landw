/// <reference path="../lib/jquery.d.ts" />


module states {


    export class BusinessDelegate {

        constructor() {
            //     //.header('AuthToken', 'test') // set global header
            //     //.prefixUrl('api/v1')
            // this.api = restful('localhost')
            //     .protocol('http')
            //     .port(6061);
            var word: String = "";
            $.getJSON("localhost:6061/word/ABAC", aWord => { word = aWord;});


             console.log('Word name: ' + word);
        }


        createNewGame() {
            // //localhost:6161/api/company/5627c02f93163cd447feb9b2
            var word: String = "";
            $.getJSON("localhost:6061/word/ABAC", aWord => { word = aWord;});


             console.log('Word name: ' + word);
        }
    }
}