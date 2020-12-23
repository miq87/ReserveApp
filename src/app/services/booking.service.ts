import { Injectable } from '@angular/core';
import { Hotel } from '../models/hotel';
import { ToastrService } from 'ngx-toastr';
import firebase from "firebase/app";


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _toastr: ToastrService) { }

  async addNewHotel(hotel, roomNum?: number[]): Promise<string> {
    let retHotelId: string
    await firebase.firestore().collection('hotels').add(hotel).then(doc => {
      this.consoleAddedNewHotel(hotel)
      if(roomNum) {
        for(let i = 0; i < roomNum.length; i++) {
          this.addNewRoom(doc.id, roomNum[i])
        }
      }
      retHotelId = doc.id
    }).catch(err => {
      console.log('Błąd podczas dodawania nowego hotelu!', err.message)
    })
    return retHotelId || null
  }

  async addNewRoom(hotelId: string, personNum: number) {
    let room = {
      "personNum": personNum
    }
    await firebase.firestore().collection('hotels').doc(hotelId).collection('rooms').add(room).then(() => {
      console.log(`Dodałem pokój dla ${personNum} osób w hotelu ${hotelId}`)
    }).catch(err => {
      console.log(`Błąd podczas dodawania pokoju w hotelu ${hotelId}`, err.message)
    })
  }

  async removeHotelById(hotelId: string) {
    await firebase.firestore().collection('hotels').doc(hotelId).delete()
    .then(() => {
      console.log('Usunąłem hotel o id: ' + hotelId)
    }).catch(err => {
      console.log('Błąd podczas usuwania hotelu!', err.message)
    })
  }

  async getHotelDetails(hotelId: string): Promise<Hotel> {
    let hotel: Hotel
    await firebase.firestore().collection('hotels').doc(hotelId).get()
    .then(doc => {
      hotel = new Hotel(doc.id, doc.data())
    }).catch(err => {
      console.log('Błąd podczas ładowania szczegółów hotelu!', err.message)
    })
    return hotel || null
  }

  getHotelRooms(hotelId: string) {
    return firebase.firestore().collection('hotels').doc(hotelId).collection('rooms').get()
  }

  async onLoadHotels(hotelData): Promise<Hotel[]> {
    let hotelList: Hotel[] = []
    let hotelsRef = firebase.firestore().collection('hotels')
    let snapshot
  
    if(hotelData.facilities[0]) {
      snapshot = await hotelsRef
      .where('city', '==', hotelData.city)
      .where('facilities', 'array-contains', hotelData.facilities[0])
      .get()
    }
    else {
      snapshot = await hotelsRef
      .where('city', '==', hotelData.city)
      .get()
    }
    if(snapshot.empty) {
      console.log('Brak wyników!')
      return null
    }
    console.log(`Załadowałem: ${hotelData.city}\n`)
    snapshot.forEach(doc => {
      let hotel = doc.data()
      
      for(let i = 1; i < hotelData.facilities.length; i++) {
        if(!hotel.facilities.includes(hotelData.facilities[i]))
          return null
      }
      hotelList.push(new Hotel(doc.id, hotel))
    })
    return hotelList;
  }

  consoleAddedNewHotel(hotel) {
    console.log(`Dodałem:\n\t${hotel.hotelName}\n\t${hotel.street}\n\t${hotel.postalCode} ${hotel.city}, ${hotel.state}\n`)
  }

}
