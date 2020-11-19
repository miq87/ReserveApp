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
  currentToken: any

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }
    
  createUser(user) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      this.newUser = user

      userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName,
      })
      .catch((err) => {
        this.eventAuthError.next(err)
      })
      .finally(() => {
        this.insertUserData(userCredential).then((user) => {
          console.log(user)
          this.router.navigate(['/hotels'])
        })
        .catch((err) => {
          console.log(err)
          this.eventAuthError.next(err)
        })
      })

    })
    .catch((err) => {
      this.eventAuthError.next(err)
    })
    
  }
  insertUserData(userCredential: firebase.auth.UserCredential) {
    return firebase.firestore().doc(`users/${userCredential.user.uid}`).set({
      email: userCredential.user.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      displayName: userCredential.user.displayName,
      role: 'network user'
    })
  }
  loginWithEmail(user) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((userCredential) => {
      this.newUser = userCredential.user
    })
    .catch((err) => {
      console.log(err.message)
    });
  }
  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider
    firebase.auth().signInWithPopup(provider).then((UserCredential) => {
      this.currentToken = (<any>UserCredential).credential.accessToken
      this.newUser = UserCredential.user
      this.router.navigate(['/hotels'])
    })
    .catch(err => {
      console.log(err.message)
    })
  }
  loginFb() {
    const provider = new firebase.auth.FacebookAuthProvider
    //provider.addScope('user_birthday')
    firebase.auth().languageCode = 'pl_PL'
    firebase.auth().signInWithPopup(provider).then((UserCredential) => {
      this.currentToken = (<any>UserCredential).credential.accessToken
      this.newUser = UserCredential.user
      this.router.navigate(['/hotels'])
    })
    .catch(err => {
      console.log(err.message)
    })
  }
  logout() {
    firebase.auth().signOut().finally(() => {
      console.log('Logged out!')
      this.newUser = null
      this.currentToken = null
      this.router.navigate(["/hotels"])
    })
  }
  isLoggedIn(): Observable<boolean> {
    return this.authState$.pipe(
      map(authState => !!authState)
    )
  }
  getCurrentUser(cb) {
    return firebase.auth().onAuthStateChanged(cb)
  }

}
