import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/models/hotel';
import { BookingService } from 'src/app/services/booking.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  hotel: Hotel
  hotelFacilities: number[]
  hotelMainImg: any

  constructor(private route: ActivatedRoute,
    private _bs: BookingService, private _fs: FireStorageService) { }

  ngOnInit(): void {
    let hotelId = this.route.snapshot.paramMap.get('id')

    this._bs.getHotelDetails(hotelId).then((data) => {
      this.hotel = data;
    }).catch((error) => {
      console.log(error)
    })

    this._bs.getHotelFacilities(hotelId).then((data) => {
      this.hotelFacilities = data
    }).catch((error) => {
      console.log(error)
    })

    this.hotelMainImg = this._fs.getMainImage(hotelId).getDownloadURL().then((doc) => {
      this.hotelMainImg = doc
    })
    .catch((error) => {
      console.log(error.message)
    })

  }

}
