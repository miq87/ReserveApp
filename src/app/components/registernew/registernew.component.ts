import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registernew',
  templateUrl: './registernew.component.html',
  styleUrls: ['./registernew.component.scss']
})
export class RegisternewComponent implements OnInit {

  authError: any

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private _auth: AuthService) { }

  ngOnInit(): void {
    this._auth.eventAuthError$.subscribe(data => {
      this.authError = data
    })
  }
  ngOnDestroy(): void {
    this._auth.resetError()
  }
  createUser() {
    this._auth.createUser(this.registerForm.value)
  }
  loginFb() {
    this._auth.loginFb()
  }
  loginGoogle() {
    this._auth.loginGoogle()
  }
  loginInstagram() {
    console.log('Instagram')
  }

}
