import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/classes/hotel';
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
  private numReq = 0
  private subscription: Subscription

  constructor(private _msg: MessengerService, private _booking: BookingService) { }

  ngOnInit() {
    this.subscription = this._msg.getMsg().subscribe(searchData => {
      if(searchData) {
        this.numReq++
        console.log("Otrzymałem wiadomość:")
        console.log(searchData)
        console.log(`Ilość zapytań: ${this.numReq}`)
        this.onLoadHotels(searchData)
      }
    })
  }
  ngOnDestroy() {
    this._msg.sendMsg(null)
    this.subscription.unsubscribe();
  }
  onLoadHotels(searchData) {
    this._booking.onLoadHotels(searchData).then(hotels => {
      this.hotelList = hotels
    })
    .catch(err => {
      console.log(err.message)
    })
  }

}
