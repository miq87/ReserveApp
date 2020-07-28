import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app'
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: any

  constructor(public auth: AngularFireAuth) {}

  ngOnInit(): void {
  }

  loginFb() {
    const provider = new auth.FacebookAuthProvider()
    this.auth.signInWithPopup(provider).then(function(result) {
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

  loginGoogle() {
    const provider = new auth.GoogleAuthProvider()
    this.auth.signInWithPopup(provider).then(function(result) {
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
    this.auth.signOut()
  }

}
