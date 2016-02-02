/// <reference path="../lib/restful.js.d.ts" />

import restful, {
    Api, MemberResponse, CollectionResponse, ResponseBody, CollectionEndpoint, MemberEndpoint,
} from 'restful.js';

//import r = require('restful.js');

module states {


    export class BusinessDelegate {

        api: Api;

        constructor() {
                //.header('AuthToken', 'test') // set global header
                //.prefixUrl('api/v1')
            this.api = restful('localhost')
                .protocol('http')
                .port(6061);
        }


        createNewGame() {
            //localhost:6161/api/company/5627c02f93163cd447feb9b2
            var word = this.api.one('word', '5627c02f93163cd447feb9b2');
            console.log('Word name: ' + word);
        }
    }
}