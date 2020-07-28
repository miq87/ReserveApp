import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators'
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("")
  eventAuthError$ = this.eventAuthError.asObservable()
  newUser: any

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) { }
    
  createUser(user) {
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user
        console.log(userCredential)
        userCredential.user.updateProfile({
            displayName: user.firstName + ' ' + user.lastName
        })
        
        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/hero'])
          })
      .catch(error => {
        this.eventAuthError.next(error)
      })
    })
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: 'network user'
    })
  }
  
}
