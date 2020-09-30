import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    let promise = new Promise((resolve, reject) => {
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
    return promise;
  }

}
