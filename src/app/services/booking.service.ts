import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Hotel } from '../model/hotel';
import * as firebase from "firebase/app";


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor() { }

  async addNewHotel(form: FormGroup) {
    return await firebase.firestore().collection('hotels').add({
      hotelName: form.value.hotelName,
      street: form.value.street,
      city: form.value.city,
      state: form.value.state,
      postalCode: form.value.postalCode
    }).then((res) => {
      console.log('Dodałem nowy hotel o id: ' + res.id)
    }).catch((error) => {
      console.log('Błąd podczas dodawania nowego hotelu.', error)
    })
  }

  async addNewRandomHotels(hotel: Hotel) {
    return await firebase.firestore().collection('hotels').add({
      hotelName: hotel.hotelName,
      street: hotel.street,
      city: hotel.city,
      state: hotel.state,
      postalCode: hotel.postalCode
    }).then(() => {
      console.log(`Dodałem:\n\t${hotel.hotelName} Hotel\n\t${hotel.street}\n\t${hotel.postalCode} ${hotel.city}, ${hotel.state}\n`)
    }).catch((error) => {
      console.log('Błąd podczas dodawania nowego hotelu.', error)
    })
  }

  async removeHotelById(hotelId: string) {
    await firebase.firestore().collection('hotels').doc(hotelId).delete()
    .then(() => {
      console.log('Usunąłem hotel o id: ' + hotelId)
    }).catch((error) => {
      console.log('Błąd podczas usuwania hotelu.', error)
    })
  }

}
