import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase'
import { auth } from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly authState$: Observable<User | null> = this.fireAuth.authState
  private eventAuthError = new BehaviorSubject<string>("")
  eventAuthError$ = this.eventAuthError.asObservable()
  newUser: any

  constructor(
    public fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router) { }
    
  createUser(user) {
    this.fireAuth.createUserWithEmailAndPassword(user.email, user.password)
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

  loginGoogle() {
    const provider = new auth.GoogleAuthProvider
    this.fireAuth.signInWithPopup(provider).then(function(result) {
      let token = (<any>result).credential.accessToken
      let user : User = result.user
		
      console.log(token)
      console.log(user)
    })
    .catch(function(error) {
      console.log('error')
      console.log(error)
    })
  }

  logout() {
    this.fireAuth.signOut()
  }


  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.fireStore.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: 'network user'
    })
  }
  
}
