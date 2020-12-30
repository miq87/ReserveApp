import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { pipe } from 'rxjs';
import { Hotel } from 'src/app/models/classes/hotel';
import { Reservation } from 'src/app/models/classes/reservation';
import { BookingService } from 'src/app/services/booking.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-my-reservation-item',
  templateUrl: './my-reservation-item.component.html',
  styleUrls: ['./my-reservation-item.component.scss']
})

export class MyReservationItemComponent implements OnInit {

  @Input() myRes: Reservation
  hotel: Hotel
  hotelMainImg: string
  pipe = new DatePipe('en-US')
  dateSt: string

  myResForm = this.fb.group({
    resId: ['', Validators.required],
    hotelId: ['', Validators.required],
    userId: ['', Validators.required],
    roomId: ['', Validators.required],
    dateStart: ['', Validators.required],
    dateEnd: ['', Validators.required],
    notice: [''],
  })

  constructor(
    private fb: FormBuilder,
    private _fs: FireStorageService,
    private _res: ReservationsService,
    private _bs: BookingService) { }

  ngOnInit(): void {

    this.myResForm.patchValue(this.myRes)

    this._bs.getHotelDetails(this.myRes.hotelId).then((data: Hotel) => {
      this.hotel = data
      console.log(this.hotel)
    })

    this._fs.getMainImage(this.myRes.hotelId).then(data => {
      this.hotelMainImg = data
    })
    .catch(err => {
      console.log(err.code)
      this._fs.getDefaultImage().then(data => {
        this.hotelMainImg = data
      })
    })

  }

  onDeleteReservation() {
    this._res.deleteReservation(this.myRes.resId)
  }

}
