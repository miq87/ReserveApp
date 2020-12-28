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

  async getReservations(querySnapshot, error) {
    await firebase.firestore().collection('reservations')
      .where('userId', '==', firebase.auth().currentUser.uid)
      .onSnapshot(querySnapshot, error)
  }

  async unSubReservations() {    
    const unsub = await firebase.firestore().collection('reservations').onSnapshot(() => {});
    unsub();
  }

  async deleteReservation(resId: string) {
    await firebase.firestore().collection('reservations').doc(resId).delete().then(() => {
      this._toastr.success(`Usunąłem rezerwację ${resId}`)
    })
    .catch(err => {
      this._toastr.error('Problem z usunięciem rezerwacji')
      console.log(err.message)
    })
  }

}
