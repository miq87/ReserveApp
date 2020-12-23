import { Injectable } from '@angular/core';
import { Reservation } from '../models/classes/reservation';
import { ToastrService } from 'ngx-toastr';
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private _toastr: ToastrService) { }

  async makeReservation(resData: Reservation) {
    await firebase.firestore().collection('reservations').add(resData).then(() => {
      this._toastr.success('Dodałem nową rezerwację')
    })
    .catch(err => {
      this._toastr.error('Nie mogę dokonać rezerwacji')
      console.log('Błąd podczas dodawania rezerwacji', err.message)
    })
  }

  async getReservations(): Promise<Reservation[]> {
    let resList: any[] = []
    let resRef = firebase.firestore().collection('reservations')
    let snapshot = await resRef
      .where('userId', '==', firebase.auth().currentUser.uid)
      .get()
    if(snapshot.empty) {
      console.log('Brak rezerwacji')
      return null
    }
    snapshot.forEach(doc => {
      resList.push(doc.data())
    })
    return resList
  }

  async deleteReservation(reservationId: string) {
    await firebase.firestore().collection('reservations').doc(reservationId).delete().then(() => {
      this._toastr.success('Usunąłem rezerwację')
    })
    .catch(err => {
      this._toastr.error('Problem z usunięciem rezerwacji')
      console.log(err.message)
    })
  }

}
