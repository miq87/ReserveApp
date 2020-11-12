import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  currentUser: any

  constructor() { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.currentUser = user
    })
  }

}
