import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorsService {

  private eventAuthError = new BehaviorSubject('')
  private eventAuthError$ = this.eventAuthError.asObservable()

  constructor() { }

  resetError(): void {
    this.eventAuthError.next('')
  }
  sendError(err): void {
    this.eventAuthError.next(err)
  }
  getError() {
    return this.eventAuthError$
  }

}
