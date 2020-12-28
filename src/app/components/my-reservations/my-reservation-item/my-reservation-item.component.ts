import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Reservation } from 'src/app/models/classes/reservation';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-my-reservation-item',
  templateUrl: './my-reservation-item.component.html',
  styleUrls: ['./my-reservation-item.component.scss']
})

export class MyReservationItemComponent implements OnInit {

  @Input() myReservation: Reservation
  hotelMainImg: string

  myResForm = this.fb.group({
    resId: ['', Validators.required],
    hotelId: ['', Validators.required],
    userId: ['', Validators.required],
    roomId: ['', Validators.required],
    dateStart: ['', Validators.required],
    dateEnd: ['', Validators.required],
    notice: [''],
  })

  constructor(private fb: FormBuilder, private _fs: FireStorageService, private _res: ReservationsService) { }

  ngOnInit(): void {

    this.myResForm.patchValue(this.myReservation)
    console.log(this.myResForm.value)

    this._fs.getMainImage(this.myReservation.hotelId).then(data => {
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

  onRemoveReservation() {
    this._res.deleteReservation(this.myReservation.resId)
  }

}
