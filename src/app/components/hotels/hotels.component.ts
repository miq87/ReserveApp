import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/model/hotel';
import { MessengerService } from 'src/app/services/messenger.service';

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

  hotelList: Hotel[]
  tmpHotelCity: string

  constructor(private _msg: MessengerService) { 
    this.hotelList = []
  }

  ngOnInit(): void {
    this._msg.getMsg().subscribe((data) => {
      this.hotelList = []
      this.tmpHotelCity = <string>data
      console.log(`Otrzymałem wiadomość ${data}`)
      this.onLoadHotels(this.tmpHotelCity)
    })
  }

  async onLoadHotels(hotelCity: string) {
    const hotelsRef = firebase.firestore().collection('hotels')

    const snapshot = await hotelsRef.where('city', '==', hotelCity).get();
    if(snapshot.empty) {
      console.log('Brak wyników')
      return
    }
    snapshot.forEach(doc => {
      this.hotelList.push(new Hotel(doc.id, doc.data()))
    })
  }

}
