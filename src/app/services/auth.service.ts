import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgZone } from '@angular/core';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //readonly authState$: Observable<User | null> = this.fireAuth.authState
  private eventAuthError = new BehaviorSubject<string>('')
  eventAuthError$ = this.eventAuthError.asObservable()
  private accessToken: any

  constructor(private router: Router, private http: HttpClient, private zone: NgZone) { }
  
  resetError(): void {
    this.eventAuthError.next('')
  }
  sendError(err): void {
    this.eventAuthError.next(err)
  }

  createUser(newUser) {
    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(userCredential => {
      this.updateUserDisplayName(newUser.firstName + ' ' + newUser.lastName).then(() => {
        this.insertUserData(userCredential)
      })
      this.router.navigate(['/profile'])
    })
    .catch(err => {
      this.eventAuthError.next(err)
    })
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
    firebase.auth().signInWithPopup(provider).then(userCredential => {
      this.accessToken = (<any>userCredential).credential.accessToken
      if(userCredential.additionalUserInfo.isNewUser) {
        this.insertUserData(userCredential)
      }
    })
    .catch(err => {
      if(err.code === 'auth/account-exists-with-different-credential') {
        err.message = 'Istnieje już konto o emailu takim samym jak konto Facebooka'
        this.eventAuthError.next(err)
      }
    })
    .finally(() => {
      this.zone.run(() => {
        this.router.navigate(['/profile'])
      })
    })
  }
  insertUserData(userCredential: firebase.auth.UserCredential) {
    let pipe = new DatePipe('en-US')
    let birthday
    
    switch(userCredential.additionalUserInfo.providerId) {
      case 'facebook.com':
        birthday = pipe.transform((<any>userCredential).additionalUserInfo.profile.birthday, 'yyyy-MM-dd')
        this.addUserData(userCredential, birthday)
        break;
      case 'google.com':
        new Promise((resolve, reject) => {
          this.getGoogleBirthdays().then(data => {
            resolve(data)
          }, err => {
            reject(err)
          })
        }).then(bd => {
          this.addUserData(userCredential, bd)
        }).catch(err => {
          this.eventAuthError.next(err)
        })
        break;
      default:
        birthday = pipe.transform(Date.now(), 'yyyy-MM-dd')
        this.addUserData(userCredential, birthday)
    }
  }
  addUserData(userCredential, bd) {
    let fullName = userCredential.user.displayName.split(' ', 2)
    let userData = {
      email: userCredential.user.email,
      firstName: fullName[0],
      lastName: fullName[1],
      displayName: userCredential.user.displayName,
      birthday: bd,
      role: userCredential.additionalUserInfo.providerId,
      address: { street: '', city: '', zip: '' }
    }
    firebase.firestore().collection('users').doc(userCredential.user.uid).set(userData).then(() => {
      console.log('Dodałem informacje o użytkowniku do FireStore')
    })
    .catch(err => {
      this.eventAuthError.next(err)
    })
  }
  getGoogleBirthdays() {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken)
    let params =  new HttpParams().set('personFields', 'birthdays')
    let pipe = new DatePipe('en-US')
    let bd

     return new Promise((resolve, reject) => {
      this.http.get('https://people.googleapis.com/v1/people/me' , { headers: headers, params: params })
      .subscribe((data: any) => {
        bd = data.birthdays;
        bd.forEach(el => {
          if(el.metadata.source.type === 'ACCOUNT') {
            resolve(pipe.transform(el.date.year + '-' + el.date.month + '-' + el.date.day, 'yyyy-MM-dd'))
          }
        });
      }, err => {
        reject(err);
      })
    })
  }
  loginWithEmail(user) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .catch(err => {
      this.eventAuthError.next(err)
    });
  }
  logout() {
    firebase.auth().signOut().then(() => {
      console.log('Wylogowany!')
    })
  }
  /*isLoggedIn(): Observable<boolean> {
    return this.authState$.pipe(
      map(authState => !!authState)
    )
  }*/
  getCurrentUser(cb) {
    return firebase.auth().onAuthStateChanged(cb)
  }
  getUserData(cb, err) {
    return firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).onSnapshot(cb, err)
  }
  updateUserData(userData) {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update(userData).then(() => {
      this.updateUserDisplayName(userData.displayName)
    }).catch(err => this.eventAuthError.next(err))
  }
  updateUserDisplayName(displayName) {
    return firebase.auth().currentUser.updateProfile({
      displayName: displayName
    }).catch(err => this.eventAuthError.next(err))
  }
  deleteUser(): void {
    let userId = firebase.auth().currentUser.uid
    console.log('Usuwam ' + userId)

    firebase.auth().currentUser.delete().then(() => {
      console.log('Użytkownik usunięty ' + userId)
    }).catch(err => this.eventAuthError.next(err))
    firebase.firestore().collection('users').doc(userId).delete().then(() => {
      console.log('Usunięte z Firestore ' +  userId)
    }).catch(err => this.eventAuthError.next(err))

    this.router.navigate(['/'])
  }

}
