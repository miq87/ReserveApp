import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registernew',
  templateUrl: './registernew.component.html',
  styleUrls: ['./registernew.component.scss']
})
export class RegisternewComponent implements OnInit {

  authError: any

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this._auth.eventAuthError$.subscribe(data => {
      this.authError = data
    })
  }

  createUser(form) {
    console.log('form: ' + form)
    console.log('form value: ' + form.value)
    this._auth.createUser(form.value)
  }

}
