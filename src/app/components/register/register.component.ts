import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  authError: any

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this._auth.eventAuthError$.subscribe(data => {
      this.authError = data
    })
  }

  createUser(form) {
    this._auth.createUser(form.value)
  }

}
