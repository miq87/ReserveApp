import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app'

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
    this.auth.signInWithPopup(new auth.FacebookAuthProvider())
  }

  loginGoogle() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider())
    console.log(auth)
  }

  logout() {
    this.auth.signOut()
  }

}
