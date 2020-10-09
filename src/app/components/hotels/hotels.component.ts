import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/model/hotel';

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
  hotelList: Hotel[]

  constructor() {
    this.snapshots = []
    this.hotelList = []
  }

  ngOnInit(): void {
  }

  async onSubmit(form) {

    this.snapshots = []
    this.hotelList = []
    const hotelsRef = firebase.firestore().collection('hotels')

    const snapshot = await hotelsRef.where('city', '==', form.value.city).get();
    if(snapshot.empty) {
      console.log('Brak wyników')
      return
    }
    snapshot.forEach(doc => {
      this.hotelList.push(new Hotel(doc.id, doc.data()))
    })
  }

}
