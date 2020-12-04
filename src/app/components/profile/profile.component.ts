import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: any
  userData: User
  isLogged: boolean

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    birthday: ['', Validators.required],
  })

  constructor(private _auth: AuthService, private fb: FormBuilder) {
    this.userData = new User()
  }

  ngOnInit(): void {
    this._auth.getCurrentUser((user) => {
      if(user) {
        this.currentUser = user
        this.isLogged = true
        this._auth.getUserData(user.uid).then((user) => {
          this.userData = <User>user.data()
          console.log(this.userData)
        }).catch((err) => {
          console.log(err.message)
        })
      }
      else {
        this.isLogged = false
      }
    })
  }

  updateUser() {
    console.log(this.profileForm.value)
    this._auth.updateUserData(this.currentUser.uid, this.profileForm.value).then((doc) => {
      console.log('user updated!')
    }).catch((err) => {
      console.log(err.mmessage)
    })
  }

}
