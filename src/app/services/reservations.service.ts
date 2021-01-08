import { Injectable } from '@angular/core';
import { Reservation } from '../models/classes/reservation';
import { ToastrService } from 'ngx-toastr';
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private resRef = firebase.firestore().collection('reservations')

  constructor(private _toastr: ToastrService) { }

  async makeReservation(resData: Reservation) {
    await this.resRef.add(resData).then(() => {
      this._toastr.success('Dodałem nową rezerwację')
    })
      .catch(err => {
        this._toastr.error('Nie mogę dokonać rezerwacji')
        console.log(err.message)
      })
  }

  getReservations(querySnapshot, error) {
    return this.resRef.where('userId', '==', firebase.auth().currentUser.uid).onSnapshot(querySnapshot, error)
  }

  async deleteReservation(resId: string) {
    await this.resRef.doc(resId).delete().then(() => {
      this._toastr.success('Usunąłem rezerwację')
    })
      .catch(err => {
        this._toastr.error('Problem z usunięciem rezerwacji')
        console.log(err.message)
      })
  }

}
