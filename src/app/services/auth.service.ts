import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators'
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if(user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          }
          else {
            return of(null)
          }
        }
        )
      )
    }
}
