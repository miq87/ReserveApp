import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  currentUser: User

  constructor(private fireAuth: AngularFireAuth, private router: Router, private http: HttpClient, private zone: NgZone) { }
  
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
        this.insertUserData(userCredential)
      })

    })
    .catch(err => {
      this.eventAuthError.next(err)
    })
    .finally(() => this.router.navigate(['/profile']))
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
      this.currentUser = userCredential.user
      
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
    let promise
    let accessToken = (<any>userCredential).credential.accessToken

    switch(userCredential.additionalUserInfo.providerId) {
      case 'facebook.com':
        promise = new Promise((resolve) => {
          resolve(pipe.transform((<any>userCredential).additionalUserInfo.profile.birthday, 'yyyy-MM-dd'))
        }).then(data => {
          this.addUserData(userCredential, data)
        })
        break
      case 'google.com':
        promise = new Promise((resolve, reject) => {
          this.getGoogleBirthdays(accessToken).then(data => {
            resolve(data)
          }, err => {
            reject(err)
          })
        }).then(data => {
          this.addUserData(userCredential, data)
        }).catch(err => {
          this.eventAuthError.next(err)
        })
        break
      case 'password':
        this.addUserData(userCredential, pipe.transform(Date.now(), 'yyyy-MM-dd'))
    }

  }
  addUserData(userCredential: firebase.auth.UserCredential, birthday) {
    let fullName = userCredential.user.displayName.split(' ', 2)
    let userData = {
      email: userCredential.user.email,
      firstName: fullName[0],
      lastName: fullName[1],
      displayName: userCredential.user.displayName,
      birthday: birthday,
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
  getGoogleBirthdays(accessToken) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken)
    let params =  new HttpParams().set('personFields', 'birthdays')
    let pipe = new DatePipe('en-US')
    let bd
    console.log({ headers: headers, params: params })

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
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(userCredential => {
      this.currentUser = userCredential.user
    })
    .catch(err => {
      this.eventAuthError.next(err)
    });
  }
  
  logout() {
    firebase.auth().signOut().then(() => {
      console.log('Wylogowany!')
      this.currentUser = null
      this.router.navigate(['/register'])
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
  getUserData(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.firestore().collection('users').doc(this.currentUser.uid).get().then(user => {
        resolve(user.data())
      }, err => reject(err))
    })
  }
  updateUserData(userData) {
    firebase.firestore().collection('users').doc(this.currentUser.uid).update(userData).then(() => {
      this.updateUserDisplayName(userData.displayName)
    }).catch(err => this.eventAuthError.next(err))
  }
  updateUserDisplayName(displayName) {
    firebase.auth().currentUser.updateProfile({
      displayName: displayName
    }).then(() => {
      console.log('User Display Name updated')
    }).catch(err => this.eventAuthError.next(err))
  }
  deleteUser(): void {
    firebase.auth().currentUser.delete().then(() => {
      this.router.navigate(['/register'])
      console.log('Użytkownik usunięty')
      firebase.firestore().collection('users').doc(this.currentUser.uid).delete().then(() => {
      }).catch(err => this.eventAuthError.next(err))
    }).catch(err => this.eventAuthError.next(err))
  }

}
