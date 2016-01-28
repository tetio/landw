/// <reference path="../lib/restful.js.d.ts" />
module states {
    export class BusinessDelegate {
        api: Api;
            
        constructor() {
            this.api = restful('api.example.com');

        }
    }
}