import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/models/hotel';
import { BookingService } from 'src/app/services/booking.service';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {
  hotel: Hotel
  hotelFacilities: string[]
  hotelMainImg: string

  constructor(
    private route: ActivatedRoute,
    private _bs: BookingService,
    private _fs: FireStorageService,
    private _facs: FacilitiesService) { }

  ngOnInit(): void {
    let hotelId = this.route.snapshot.paramMap.get('id')

    this._bs.getHotelDetails(hotelId).then(data => {
      this.hotel = data;

      this._facs.getFacilities(this.hotel.facilities).then((data: string[]) => {
        this.hotelFacilities = data
      }).catch(err => {
        console.log(err.message)
      })

    }).catch(err => {
      console.log(err.code)
    })
    
    this._fs.getMainImage(hotelId).then(data => {
      console.log(data)
      this.hotelMainImg = data
    })
    .catch(err => {
      console.log(err.code)
      this._fs.getDefaultImage().then(data => {
        console.log(data)
        this.hotelMainImg = data
      })
    })

    

  }

}
