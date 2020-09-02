import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private fireAuth: AngularFireAuth) { }

  user: any

  ngOnInit(): void {
    this.fireAuth.onAuthStateChanged(function(user) {
    //firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.user = user
        console.log('Zalogowany')
        console.log()
      } else {
        console.log('Niezalogowany')
      }
    });
  }
}
