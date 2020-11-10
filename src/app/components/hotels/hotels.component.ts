import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';
import { MessengerService } from 'src/app/services/messenger.service';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  hotelList: Hotel[]
  numReq = 0
  subscription: Subscription

  constructor(private _msg: MessengerService, private _booking: BookingService) {
    this.hotelList = []
  }

  ngOnInit() {
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
  onLoadHotels(hotelCity: string) {
    this._booking.onLoadHotels(hotelCity).then((hotels) => {
      this.hotelList = hotels
    })
    .catch((error) => {
      console.log(error.message)
    })
  }

}
