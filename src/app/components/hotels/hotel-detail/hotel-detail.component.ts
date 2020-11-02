import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/models/hotel';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  hotel: Hotel
  hotelFacilities: number[]

  constructor(private route: ActivatedRoute, private _booking: BookingService) { }

  ngOnInit(): void {
    let hotelId = this.route.snapshot.paramMap.get('id')

    this._booking.getHotelDetails(hotelId).then((data) => {
      this.hotel = data;
    }).catch((error) => {
      console.log(error)
    })

    this._booking.getHotelFacilities(hotelId).then((data) => {
      this.hotelFacilities = data
    }).catch((error) => {
      console.log(error)
    })
  }

}
