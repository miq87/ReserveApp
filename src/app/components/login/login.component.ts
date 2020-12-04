import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private _auth: AuthService) {}

  ngOnInit(): void { }

  loginWithEmail() {
    this._auth.loginWithEmail(this.loginForm.value)
  }
  loginFb() {
    this._auth.loginFb()
  }
  loginGoogle() {
    this._auth.loginGoogle()
  }

}
