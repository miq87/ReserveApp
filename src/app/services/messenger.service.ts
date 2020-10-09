import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MessengerService {

    subject = new Subject()

    constructor() { }

    sendMsg(msg: any) {
        this.subject.next(msg)
    }
    getMsg() {
        return this.subject.asObservable()
    }
}