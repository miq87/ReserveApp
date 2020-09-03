import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: any

  constructor(private auth_: AuthService) {}

  ngOnInit(): void {
  }

  loginWithEmail(form) {
    this.auth_.loginWithEmail(form.value)
  }

  loginFb() {
    this.auth_.loginGoogle()
  }

  loginGoogle() {
    this.auth_.loginGoogle()
  }

  logout() {
    this.auth_.logout()
  }

  checkLogged() {
    this.auth_.checkLogged()
  }

}
