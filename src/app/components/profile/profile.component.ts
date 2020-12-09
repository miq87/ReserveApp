import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/classes/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userId: string
  userData: User
  authError: any
  userToken: any

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    displayName: ['', Validators.required],
    email: [{ value: '', disabled: true }, Validators.required],
    birthday: ['', Validators.required],
    address: this.fb.group({
      street: [''],
      city: [''],
      zip: ['']
    }),
    role: ['', Validators.required],
  })

  constructor(private _auth: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this._auth.eventAuthError$.subscribe(data => {
      this.authError = data
    })
    this._auth.getCurrentUser(user => {
      if(user) {
        this.userId = user.uid
        this._auth.getUserData(user.uid).then(user => {
          this.userData = <User>(user.data())
          console.log(this.userData)
          this.profileForm.patchValue(this.userData)
        }).catch(err => {
          console.log(err)
          this._auth.sendError(err)
        })
      }
    })
  }
  updateUser() {
    this._auth.updateUserData(this.userId, this.profileForm.value).then((doc) => {
      this.userData = this.profileForm.value
    })
    .catch(err => {
      this._auth.sendError(err)
    })
    .finally(() => {
      this._auth.updateUserDisplayName(this.profileForm.value.displayName).then((doc) => {
      }).catch(err => {
        this._auth.sendError(err)
      })
    })
  }
  deleteUser() {
    this._auth.deleteUser()
  }

}
