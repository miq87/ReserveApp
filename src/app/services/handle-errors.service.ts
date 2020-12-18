import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorsService {

  private isError = new BehaviorSubject('')
  private isError$ = this.isError.asObservable()

  constructor() { }

  resetError(): void {
    this.isError.next('')
  }
  sendError(err): void {
    this.isError.next(err)
  }
  getError() {
    return this.isError$
  }

}
