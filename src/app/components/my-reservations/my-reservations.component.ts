import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Reservation } from 'src/app/models/classes/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit, OnDestroy {

  myReservations: Reservation[]
  sub: Subscription

  constructor(private _res: ReservationsService) { }

  ngOnInit(): void {

    this._res.getReservations(querySnapshot => {
      if(querySnapshot.empty) {
        console.log('Brak rezerwacji')
      }
      else {
        this.myReservations = []
        querySnapshot.forEach(doc => {
          console.log({ resId: doc.id, ...doc.data() })
          this.myReservations.push(<Reservation>{ resId: doc.id, ...doc.data() })
        });
      }
    }, err => {
      console.log(err.message)
    })

  }

  ngOnDestroy(): void {
    this._res.unSubReservations()
  }

}
