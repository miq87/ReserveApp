import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authError: any

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private _auth: AuthService) {}

  ngOnInit(): void {
    this._auth.eventAuthError$.subscribe(data => {
      this.authError = data
    })
    this._auth.resetError()
  }
  loginWithEmail() {
    this._auth.loginWithEmail(this.loginForm.value)
  }
  loginFb() {
    this._auth.loginBy('facebook')
  }
  loginGoogle() {
    this._auth.loginBy('google')
  }
  loginInstagram() {
    this._auth.loginBy('instagram')
  }

}
