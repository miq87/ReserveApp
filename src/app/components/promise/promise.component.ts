import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import firebase from 'firebase/app'

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss']
})

export class PromiseComponent implements OnInit {

  color: ThemePalette = 'primary'
  mode: ProgressSpinnerMode = 'indeterminate'
  isVisible = true

  constructor() { }

  ngOnInit(): void {
    this.getPresent().then(present => {
      console.log('Idzie:')
      console.log(present)
      this.isVisible = !this.isVisible
    }).catch(error => {
      console.log(error)
    })
  }

  getPresent() {
    let user
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        user = firebase.auth().currentUser
        resolve(user)
      }, 1000);
    });
  }

}
