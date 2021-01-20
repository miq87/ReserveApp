import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/classes/hotel';
import { MessengerService } from 'src/app/services/messenger.service';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { SearchRequest } from 'src/app/models/classes/search-request';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  hotelList: Hotel[]
  private numReq = 0
  private sub: Subscription

  constructor(private _msg: MessengerService, private _booking: BookingService) { }

  ngOnInit() {
    this.sub = this._msg.getMsg().subscribe(searchReq => {
      if(searchReq) {
        this.numReq++
        console.log(`Ilość zapytań: ${this.numReq}`)
        this.onLoadHotels(searchReq)
      }
    })
  }
  ngOnDestroy() {
    this._msg.sendMsg(null)
    this.sub.unsubscribe();
  }
  onLoadHotels(searchReq: SearchRequest) {
    console.log(searchReq)
    this._booking.loadHotels(searchReq).then(hotels => {
      this.hotelList = hotels
    })
    .catch(err => {
      console.log(err.message)
    })
  }

}
