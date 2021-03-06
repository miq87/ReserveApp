import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HandleErrorsService } from 'src/app/services/handle-errors.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isError: any

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private handleError: HandleErrorsService) { }

  ngOnInit(): void {
    this.handleError.getError().subscribe(data => {
      this.isError = data
    })
  }
  onRegister() {
    this._auth.createUser(this.registerForm.value)
  }
  loginFb() {
    this._auth.loginBy('facebook')
  }
  loginGoogle() {
    this._auth.loginBy('google')
  }

}
