import { Component, OnInit } from '@angular/core';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
//import "firebase/auth";
//import "firebase/firestore";

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  snapshots: any[]

  constructor() {
    this.snapshots = []
  }

  ngOnInit(): void {
  }

  async onSubmit(form) {

    this.snapshots = []
    const hotelsRef = firebase.firestore().collection('hotels')

    const snapshot = await hotelsRef.where('city', '==', form.value.city).get();
    if(snapshot.empty) {
      console.log('No matching documents.')
      return
    }
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data())
      this.snapshots.push(doc.data())
    })

  }

}
