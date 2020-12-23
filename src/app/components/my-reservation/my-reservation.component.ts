import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.scss']
})
export class MyReservationComponent implements OnInit {


  myBooksForm = this.fb.group({
    roomId: ['', Validators.required],
    userId: ['', Validators.required],
    dateStart: ['', Validators.required],
    dateEnd: ['', Validators.required],
    notice: [''],
  })

  constructor(private fb: FormBuilder, private _res: ReservationsService) { }

  ngOnInit(): void {
    this._res.getReservations().then(myReservations => {
      console.log(myReservations)
    })
  }

}
