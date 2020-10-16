import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';
import { MessengerService } from 'src/app/services/messenger.service';
import { Subscription } from 'rxjs';
import * as firebase from "firebase/app";
//import "firebase/auth";
//import "firebase/firestore";

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  hotelList: Hotel[]
  numReq = 0
  subscription: Subscription

  constructor(private _msg: MessengerService) { 
    this.hotelList = []
  }

  ngOnInit(): void {
    this.subscription = this._msg.getMsg().subscribe(data => {
      if(data) {
        this.hotelList = []
        this.numReq++
        console.log(`Otrzymałem wiadomość ${data}`)
        console.log(`Ilość zapytań: ${this.numReq}`)
        this.onLoadHotels(<string>data)
      }
    })
  }
  ngOnDestroy() {
    this._msg.sendMsg(null)
    this.subscription.unsubscribe();
  }

  async onLoadHotels(hotelCity: string) {
    const hotelsRef = firebase.firestore().collection('hotels')

    const snapshot = await hotelsRef.where('city', '==', hotelCity).get();
    if(snapshot.empty) {
      console.log('Brak wyników')
      return
    }
    console.log(`Załadowałem: ${hotelCity}\n`)
    snapshot.forEach(doc => {
      this.hotelList.push(new Hotel(doc.id, doc.data()))
    })
  }

}
