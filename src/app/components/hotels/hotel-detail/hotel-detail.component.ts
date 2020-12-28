import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/models/classes/hotel';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HotelDetailComponent implements OnInit {
  hotel: Hotel
  hotelRooms = []
  hotelFacilities: string[]
  hotelMainImg: string

  resForm = this.fb.group({
    hotelId: ['', Validators.required],
    userId: ['', Validators.required],
    roomId: ['', Validators.required],
    dateStart: ['', Validators.required],
    dateEnd: ['', Validators.required],
    notice: [''],
  })

  constructor(
    private route: ActivatedRoute,
    private _bs: BookingService,
    private _fs: FireStorageService,
    private _facs: FacilitiesService,
    private _auth: AuthService,
    private _res: ReservationsService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    let hotelId = this.route.snapshot.paramMap.get('id')

    this._auth.getCurrentUser(user => {
      if(user) {
        this.resForm.patchValue({ hotelId: hotelId, userId: user.uid })
      }
    })

    this._bs.getHotelDetails(hotelId).then(data => {
      this.hotel = data;

      this._facs.getFacilities(this.hotel.facilities).then((data: string[]) => {
        this.hotelFacilities = data
      }).catch(err => {
        console.log(err.message)
      })

      this._bs.getHotelRooms(hotelId).then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          this.hotelRooms.push({ id: doc.id, ...doc.data() })
        });
        console.log(this.hotelRooms)
      })
      .catch(err => {
        console.log(err)
      })

    }).catch(err => {
      console.log(err)
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

  onBook() {
    this._res.makeReservation(this.resForm.value)
  }

}
