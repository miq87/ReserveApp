import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as firebase from "firebase/app";

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
    //return await this.db.collection('hotels').add({
    return await firebase.firestore().collection('hotels').add({
      hotelName: form.value.hotelName,
      address: form.value.address,
      city: form.value.city,
      state: form.value.state,
      postalCode: form.value.postalCode
    }).then((res) => {
      console.log('Dodałem nowy hotel o id: ' + res.id)
    }).catch((error) => {
      console.log('Błąd podczas dodawania nowego hotelu', error)
    })
  }

}
