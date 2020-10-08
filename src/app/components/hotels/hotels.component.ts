import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  snapshot: any[]

  constructor() {
    this.snapshot = []
  }

  ngOnInit(): void {
  }

  async onSubmit(form) {

    console.log('City: ' + form.value.city)

    const hotelsRef = firebase.firestore().collection('hotels')

    const snapshot = await hotelsRef.where('city', '==', form.value.city).get();
    if(snapshot.empty) {
      console.log('No matching documents.')
      return
    }
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data())
      this.snapshot.push(doc.data())
    })

  }

}
