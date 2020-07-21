import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddnameService {

  names: string[] = []

  nameList$ = of(2, 'Lechia', ['chwm','dhw','hfa'])

  constructor() { }

  addName(firstName: string) {
    this.names.push(firstName)
  }

  showNames(): string[] {
    console.log(this.names)
    return this.names
  }

}
