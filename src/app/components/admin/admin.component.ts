import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/classes/hotel';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  hotelList: Hotel[] = []
  unsub

  constructor(private _bs: BookingService) { }

  ngOnInit(): void {
    this.unsub = this._bs.getMyHotels(querySnapshot => {
      this.hotelList = []
      if(querySnapshot.empty) {
        console.log('Brak hoteli')
      }
      else {
        querySnapshot.docs.forEach(doc => {
          this.hotelList.push(new Hotel(doc.id, doc.data()))
        });
      }
      console.log(this.hotelList)
    }, error => {
      console.log(error.message)
    })
  }

  ngOnDestroy(): void {
    this.unsub()
  }

}
