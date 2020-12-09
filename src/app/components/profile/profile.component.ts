import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileResolverService } from 'src/app/services/profile-resolver.service';

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

  constructor(
    private _auth: AuthService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._auth.eventAuthError$.subscribe(data => {
      this.authError = data
    })
    /*this.activatedRoute.data.subscribe((data) => {
      console.log(data.userData)
      this.userData = <User>data.userData
    })*/
    this.userData = this.activatedRoute.snapshot.data['userData']
    console.log(this.userData)
    this.profileForm.patchValue(this.userData)

    /*this._auth.getCurrentUser(user => {
      if(user) {
        this.userId = user.uid
        this._auth.getUserData().then(user => {
          this.userData = <User>(user.data())
          console.log(this.userData)
          this.profileForm.patchValue(this.userData)
        }).catch(err => {
          this._auth.sendError(err)
        })
      }
    })*/
  }
  updateUser() {
    this._auth.updateUserData(this.profileForm.value)
  }
  deleteUser() {
    this._auth.deleteUser()
  }

}
