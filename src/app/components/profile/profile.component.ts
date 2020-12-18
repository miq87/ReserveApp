import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { HandleErrorsService } from 'src/app/services/handle-errors.service';

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
    private handleError: HandleErrorsService) { }

  ngOnInit(): void {
    this._auth.getUserData(doc => {
      if(doc.data()) {
        this.userData = doc.data()
        this.profileForm.patchValue(doc.data())
      }
    }, err => {
      this.handleError.sendError(err)
    })
    this.handleError.getError().subscribe(data => {
      this.authError = data
    })
  }
  updateUser() {
    this._auth.updateUserData(this.profileForm.value)
  }
  deleteUser() {
    this._auth.deleteUser()
  }

}
