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

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    displayName: ['', Validators.required],
    email: ['', Validators.required],
    birthday: ['', Validators.required],
    role: ['', Validators.required],
  })

  constructor(private _auth: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this._auth.getCurrentUser((user) => {
      if(user) {
        this.userId = user.uid
        this._auth.getUserData(user.uid).then((user) => {
          this.userData = <User>user.data()
          this.profileForm.setValue(user.data())
        }).catch((err) => {
          console.log(err.message)
        })
      }
    })
  }

  updateUser() {
    this._auth.updateUserData(this.userId, this.profileForm.value).then((doc) => {
      this.userData = this.profileForm.value
      this._auth.updateUserProfile(this.profileForm.value.displayName).then((doc) => {
      }).catch((err) => {
        console.log(err.mmessage)
      })
    }).catch((err) => {
      console.log(err.mmessage)
    })
  }

}
