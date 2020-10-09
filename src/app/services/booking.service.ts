import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as firebase from "firebase/app";
import { Hotel } from '../model/hotel';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  results: any

  constructor(private http: HttpClient) {
    this.results = []
  }

  getBooking(term: string) {
    const urlBookingApi = 'https://hotels4.p.rapidapi.com'
    const search = "/locations/search"
    const params = { 'locale': 'en_US', 'query': term }
    const headers = {
      'x-rapidapi-key':'b657d91299msh0aebfe9f118c76dp129160jsnf85c1ce0e46b',
      'x-rapidapi-host':'hotels4.p.rapidapi.com', 'useQueryString': 'true'
    }
    return this.http.get(`${urlBookingApi}${search}`, { headers: headers, params: params })
  }

  searchHotel(term: string) {
    return new Promise((resolve, reject) => {
      this.getBooking(term)
        .toPromise()
        .then(
          res => { // Success
            this.results = res
            console.log(res)
            resolve();
          },
          msg => { // Error
            reject(msg);
          }
        );
    });
  }

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
    }).then((res) => {
      console.log(`Dodałem:\n\t${hotel.hotelName} Hotel\n\t${hotel.street}\n\t${hotel.postalCode} ${hotel.city}, ${hotel.state}\n`)
    }).catch((error) => {
      console.log('Błąd podczas dodawania nowego hotelu.', error)
    })
  }

  async removeHotelById(hotelId: string) {
    await firebase.firestore().collection('hotels').doc(hotelId).delete()
    .then((res) => {
      console.log('Usunąłem hotel o id: ' + hotelId)
    }).catch((error) => {
      console.log('Błąd podczas usuwania hotelu.', error)
    })
  }

}
