import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/classes/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {

  myReservations: Reservation[]

  constructor(private _res: ReservationsService) { }

  ngOnInit(): void {
    this._res.getReservations().then(myReservations => {
      console.log(myReservations)
      this.myReservations = myReservations
    })
  }

}
