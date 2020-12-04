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
  currentUser: User
  currentToken: any

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }
    
  createUser(newUser) {
    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((userCredential) => {
      this.currentUser = userCredential.user

      userCredential.user.updateProfile({
          displayName: newUser.firstName + ' ' + newUser.lastName,
      })
      .catch((err) => {
        this.eventAuthError.next(err)
      })
      .finally(() => {
        this.insertUserData(userCredential, newUser).then(() => {
          console.log('Dodałem informacje o użytkowniku do FireStore')
          this.router.navigate(['/hotels'])
        })
        .catch((err) => {
          this.eventAuthError.next(err)
        })
      })

    })
    .catch((err) => {
      this.eventAuthError.next(err)
    })
    
  }
  insertUserData(userCredential: firebase.auth.UserCredential, newUser) {
    return firebase.firestore().doc(`users/${userCredential.user.uid}`).set({
      email: userCredential.user.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      displayName: userCredential.user.displayName,
      role: 'network user'
    })
  }
  loginWithEmail(user) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((userCredential) => {
      this.currentUser = userCredential.user
    })
    .catch((err) => {
      console.log(err.message)
    });
  }
  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider
    firebase.auth().signInWithPopup(provider).then((userCredential) => {
      this.currentToken = (<any>userCredential).credential.accessToken
      this.currentUser = userCredential.user
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
    firebase.auth().signInWithPopup(provider).then((userCredential) => {
      this.currentToken = (<any>userCredential).credential.accessToken
      this.currentUser = userCredential.user
      console.log(this.currentToken)
      console.log(this.currentUser)
      console.log(userCredential.additionalUserInfo.isNewUser)
      this.router.navigate(['/hotels'])
    })
    .catch(err => {
      console.log(err.message)
    })
  }
  logout() {
    firebase.auth().signOut().finally(() => {
      console.log('Wylogowany!')
      this.currentUser = null
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
  getUserData(userId) {
    return firebase.firestore().collection("users").doc(userId).get()
  }
  updateUserData(userId, userData) {
    return firebase.firestore().collection("users").doc(userId).update(userData)
  }
  updateUserProfile(displayName) {
    return firebase.auth().currentUser.updateProfile({
      displayName: displayName
    })
  }

}
