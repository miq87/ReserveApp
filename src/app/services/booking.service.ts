import { Injectable } from '@angular/core';
import { Hotel } from '../models/hotel';
import * as firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor() { }

  async addNewHotel(hotel: Hotel) {
    return await firebase.firestore().collection('hotels').add(JSON.parse(JSON.stringify(hotel)))
    .then((res) => {
      this.consoleAddedNewHotel(hotel)
    }).catch((error) => {
      console.log('Błąd podczas dodawania nowego hotelu!', error)
    })
  }
  async removeHotelById(hotelId: string) {
    await firebase.firestore().collection('hotels').doc(hotelId).delete()
    .then(() => {
      console.log('Usunąłem hotel o id: ' + hotelId)
    }).catch((error) => {
      console.log('Błąd podczas usuwania hotelu!', error)
    })
  }
  async getHotelDetails(hotelId: string): Promise<Hotel> {
    let hotel: Hotel
    await firebase.firestore().collection('hotels').doc(hotelId).get()
    .then((doc) => {
      hotel = new Hotel(doc.id, doc.data) 
    }).catch((error) => {
      console.log('Błąd podczas ładowania szczegółów hotelu!', error)
    })
    return hotel || null
  }
  async onLoadHotels(hotelCity: string): Promise<Hotel[]> {
    const hotelsRef = firebase.firestore().collection('hotels')
    let hotelList: Hotel[] = [];

    const snapshot = await hotelsRef.where('city', '==', hotelCity).get()
    if(snapshot.empty) {
      console.log('Brak wyników!')
      return null
    }
    console.log(`Załadowałem: ${hotelCity}\n`)
    snapshot.forEach(doc => {
      hotelList.push(new Hotel(doc.id, doc.data()))
    })
    return hotelList;
  }
  consoleAddedNewHotel(hotel: Hotel) {
    console.log(`Dodałem:\n\t${hotel.hotelName}\n\t${hotel.street}\n\t${hotel.postalCode} ${hotel.city}, ${hotel.state}\n`)
  }

}
