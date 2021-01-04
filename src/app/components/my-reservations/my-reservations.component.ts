import { Component, OnDestroy, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/classes/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit, OnDestroy {

  myReservations: any[] = []
  unsub

  constructor(private _res: ReservationsService) { }

  ngOnInit(): void {

    this.unsub = this._res.getReservations(querySnapshot => {
      this.myReservations = []
      if(querySnapshot.empty) {
        console.log('Brak rezerwacji')
      }
      else {
        querySnapshot.docs.forEach(doc => {
          this.myReservations.push(new Reservation(doc.id, doc.data()))
        });
        console.log(this.myReservations)
      }
    }, err => {
      console.log(err.message)
    })

  }

  ngOnDestroy(): void {
    this.unsub()
  }

}
