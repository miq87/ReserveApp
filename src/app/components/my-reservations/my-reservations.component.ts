import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Reservation } from 'src/app/models/classes/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {

  myReservations: Reservation[]

  myResForm = this.fb.group({
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
      this.myReservations = myReservations
    })
  }

}
