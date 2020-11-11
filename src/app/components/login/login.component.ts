import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService) {}

  ngOnInit(): void {
  }
  loginWithEmail(form) {
    this._auth.loginWithEmail(form.value)
  }
  loginFb() {
    this._auth.loginFb()
  }
  loginGoogle() {
    this._auth.loginGoogle()
  }
  logout() {
    this._auth.logout()
  }

}
