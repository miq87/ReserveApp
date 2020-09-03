import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase'

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly authState$: Observable<User | null> = this.fireAuth.authState
  private eventAuthError = new BehaviorSubject<string>("")
  eventAuthError$ = this.eventAuthError.asObservable()
  newUser: any

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router) { }
    
  createUser(user) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(userCredential => {
      this.newUser = user
      console.log(user)
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
    firebase.auth().signInWithPopup(provider).then(result => {
      let token = (<any>result).credential.accessToken
      let user : User = result.user
		
      console.log(token)
      console.log(user)

      this.router.navigate(['/members'])
    })
    .catch(error => {
      console.log('error')
      console.log(error)
    })
  }

  logout() {
    firebase.auth().signOut()
  }

  checkLogged() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Logged as ' + user.displayName)
      }
      else {
        console.log('no logged!')
      }
    })
  }

  getUser() {
    return this.authState$.pipe(first())
  }

}
