import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MessengerService {

    subject = new BehaviorSubject(null)
    subject$ = this.subject.asObservable()

    constructor() { }

    sendMsg(msg: any) {
        this.subject.next(msg)
    }
    getMsg() {
        return this.subject$
    }
}