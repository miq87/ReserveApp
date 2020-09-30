import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  city: string
  results: any

  constructor(private _booking: BookingService) { }

  ngOnInit(): void {

  }

  getResult(term: string) {
    console.log(`Get result of ${this.city}`)
    this._booking.searchHotel(term)
      .then(() => {
        console.log('After then')
      })
      .catch((err) => {
        console.log('After catch')
        console.log(err)
      })
  }

}
