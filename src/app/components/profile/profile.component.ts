import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: any
  isLogged: boolean

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private _auth: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this._auth.getCurrentUser((user) => {
      if(user) {
        this.currentUser = user
        this.isLogged = true
        console.log(user)
      }
      else {
        this.isLogged = false
      }
    })
  }

}
