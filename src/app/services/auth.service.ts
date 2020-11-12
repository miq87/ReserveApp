import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase'

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly authState$: Observable<User | null> = this.fireAuth.authState
  private eventAuthError = new BehaviorSubject<string>("")
  eventAuthError$ = this.eventAuthError.asObservable()
  newUser: any

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }
    
  createUser(user) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      this.newUser = user
      console.log(user)
      console.log(userCredential)
      userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName
      })

      this.insertUserData(userCredential)
      .then(() => {
        this.router.navigate(['/hotels'])
      })
      .catch(error => {
        this.eventAuthError.next(error)
      })
    })
  }
  insertUserData(userCredential: firebase.auth.UserCredential) {
    return firebase.firestore().doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: 'network user'
    })
  }
  loginWithEmail(user) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
    });
  }
  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider
    firebase.auth().signInWithPopup(provider).then((result) => {
      let token = (<any>result).credential.accessToken
      let user = result.user
      console.log(token)
      console.log(user)
      this.router.navigate(['/hotels'])
    })
    .catch(error => {
      console.log('error')
      console.log(error)
    })
  }
  loginFb() {
    const provider = new firebase.auth.FacebookAuthProvider
    //provider.addScope('user_birthday')
    firebase.auth().languageCode = 'pl_PL'
    firebase.auth().signInWithPopup(provider).then((result) => {
      let token = (<any>result).credential.accessToken
      let user = result.user
      console.log(token)
      console.log(user)
      this.router.navigate(['/hotels'])
    })
    .catch(error => {
      console.log('error')
      console.log(error)
    })
  }
  logout() {
    firebase.auth().signOut().finally(() => {
      console.log('Logged out!')
      this.router.navigate(["/hotels"])
    })
  }
  isLoggedIn(): Observable<boolean> {
    return this.authState$.pipe(
      map(authState => !!authState)
    )
  }
  getCurrentUser() {
    return firebase.auth().currentUser
  }

}
