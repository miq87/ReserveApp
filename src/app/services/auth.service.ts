import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';


declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly authState$: Observable<User | null> = this.fireAuth.authState
  private eventAuthError = new BehaviorSubject<string>('')
  eventAuthError$ = this.eventAuthError.asObservable()
  currentUser: User
  currentToken: any

  constructor(private fireAuth: AngularFireAuth, private router: Router, private http: HttpClient) { }
  
  resetError(): void {
    this.eventAuthError.next('')
  }
  sendError(err): void {
    this.eventAuthError.next(err)
  }

  createUser(newUser) {
    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((userCredential) => {
      this.currentUser = userCredential.user

      userCredential.user.updateProfile({
          displayName: newUser.firstName + ' ' + newUser.lastName,
      })
      .catch(err => {
        this.eventAuthError.next(err)
      })
      .finally(() => {
        this.insertUserData(userCredential).then(() => {
          console.log('Dodałem informacje o użytkowniku do FireStore')
          this.router.navigate(['/hotels'])
        })
        .catch(err => {
          this.eventAuthError.next(err)
        })
      })

    })
    .catch(err => {
      this.eventAuthError.next(err)
    })
    
  }
  insertUserData(userCredential: firebase.auth.UserCredential) {
    let fullName = userCredential.user.displayName.split(' ', 2)

    let pipe = new DatePipe('en-US')
    let birthday

    console.log(userCredential)

    switch(userCredential.additionalUserInfo.providerId) {
      case 'facebook.com':
        birthday = pipe.transform((<any>userCredential).additionalUserInfo.profile.birthday, 'yyyy-MM-dd')
        break;
      case 'google.com':
        this.getGoogleBirthdays()
        birthday = '2001-09-11'
        break;
      case 'password':
        birthday = pipe.transform(Date.now(), 'yyyy-MM-dd')
    }

    return firebase.firestore().collection('users').doc(userCredential.user.uid).set({
      email: userCredential.user.email,
      firstName: fullName[0],
      lastName: fullName[1],
      displayName: userCredential.user.displayName,
      birthday: birthday,
      role: userCredential.additionalUserInfo.providerId,
      address: { street: '', city: '', zip: '' }
    })
  }
  getGoogleBirthdays() {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.currentToken)
    let params =  new HttpParams().set('personFields', 'birthdays')
    this.http.get('https://people.googleapis.com/v1/people/me' , { headers: headers, params: params }).subscribe((data) => {
      console.log((<any>data).birthdays[0].date)
    }, (error) => { console.log(error.message) })
  }
  loginWithEmail(user) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((userCredential) => {
      this.currentUser = userCredential.user
    })
    .catch(err => {
      this.eventAuthError.next(err)
    });
  }
  loginBy(prov: string) {
    let provider

    switch(prov) {
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider
        provider.addScope('https://www.googleapis.com/auth/user.birthday.read');
        break
      case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider
        provider.addScope('user_birthday')
        break
      default:
        provider = new firebase.auth.FacebookAuthProvider
    }

    firebase.auth().languageCode = 'pl_PL'
    firebase.auth().signInWithPopup(provider).then((userCredential) => {
      this.currentToken = (<any>userCredential).credential.accessToken
      this.currentUser = userCredential.user
      
      if(userCredential.additionalUserInfo.isNewUser) {
        this.insertUserData(userCredential).then(() => {
          console.log('Dodałem informacje o użytkowniku do FireStore')
        })
        .catch(err => {
          this.eventAuthError.next(err)
        })
      }
      this.router.navigate(['/profile'])
    })
    .catch(err => {
      if(err.code === 'auth/account-exists-with-different-credential') {
        err.message = 'Istnieje już konto o emailu takim samym jak konto Facebooka'
        this.eventAuthError.next(err)
      }
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
    return firebase.firestore().collection('users').doc(userId).get()
  }
  updateUserData(userId, userData) {
    return firebase.firestore().collection('users').doc(userId).update(userData)
  }
  updateUserDisplayName(displayName) {
    return firebase.auth().currentUser.updateProfile({
      displayName: displayName
    })
  }

}
