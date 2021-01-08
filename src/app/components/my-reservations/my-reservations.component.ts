import { Component, OnDestroy, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/classes/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit, OnDestroy {

  reservationList: any[] = []
  unsub

  constructor(private _res: ReservationsService) { }

  ngOnInit(): void {

    this.unsub = this._res.getReservations(querySnapshot => {
      this.reservationList = []
      if(querySnapshot.empty) {
        console.log('Brak rezerwacji')
      }
      else {
        querySnapshot.docs.forEach(doc => {
          this.reservationList.push(new Reservation(doc.id, doc.data()))
        });
      }
    }, err => {
      console.log(err.message)
    })

  }

  ngOnDestroy(): void {
    this.unsub()
  }

}
