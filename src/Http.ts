
/// <reference path="Game.ts" />

module states {
    export class Http {
        url: string;
        payload: any;
        mode: boolean;
        //response: string;
        objHttpReq: any;
        next: (any, bookean) => void;
        apiVersion: string;

        constructor(url: string, mode: boolean) {
            this.url = url;
            this.mode = mode;
            this.objHttpReq = new XMLHttpRequest();
            this.objHttpReq.mode = this.mode;
            this.objHttpReq.onreadystatechange = () => this.OnRStateChange();
        }

        send(method: String, uri: String) {
            this.objHttpReq = new XMLHttpRequest();
            this.objHttpReq.mode = this.mode;
            this.objHttpReq.onreadystatechange = () => this.OnRStateChange();
            this.objHttpReq.open(method, this.url + uri, this.mode);
            this.objHttpReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            this.objHttpReq.send(this.payload);
        }

        setPayload(payload: string) {
            this.payload = payload;
        }

        setNext(next: (any, boolean) => void) {
            this.next = next;
        }

        OnRStateChange() {
            if (this.objHttpReq.readyState == 4 && this.objHttpReq.status == 200) {
                if (this.objHttpReq.mode == false) {
                    // alert(this.objHttpReq.responseText);
                    this.next(this.objHttpReq.responseText, true);
                } else {
                    // alert(this.objHttpReq.responseText);
                    this.next(JSON.parse(this.objHttpReq.responseText), true);
                }
            } else if (this.objHttpReq.status == 404) {
                this.next(null, false);
            }
        }
    }
}