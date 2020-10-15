import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MessengerService {

    subject = new BehaviorSubject('')

    constructor() { }

    sendMsg(msg: any) {
        this.subject.next(msg)
    }
    getMsg() {
        return this.subject.asObservable()
    }
}