import { Injectable } from '@angular/core';
import { Hotel } from '../models/classes/hotel';
import { ToastrService } from 'ngx-toastr';
import firebase from "firebase/app";
import { Room } from '../models/classes/room';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private hotelsRef = firebase.firestore().collection('hotels')

  constructor(private _toastr: ToastrService) { }

  async addNewHotel(hotel, roomNum?: number[]): Promise<string> {
    let retHotelId: string
    await this.hotelsRef.add(hotel).then(doc => {
      this.consoleAddedNewHotel(hotel)
      if (roomNum) {
        for (let i = 0; i < roomNum.length; i++) {
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
    await this.hotelsRef.doc(hotelId).collection('rooms').add(room).then(() => {
      console.log(`Dodałem pokój dla ${personNum} osób w hotelu ${hotelId}`)
    }).catch(err => {
      console.log(`Błąd podczas dodawania pokoju w hotelu ${hotelId}`, err.message)
    })
  }

  async removeHotelById(hotelId: string) {
    await this.hotelsRef.doc(hotelId).delete()
      .then(() => {
        console.log('Usunąłem hotel o id: ' + hotelId)
      }).catch(err => {
        console.log('Błąd podczas usuwania hotelu!', err.message)
      })
  }

  async getHotelDetails(hotelId: string): Promise<Hotel> {
    let hotel: Hotel
    await this.hotelsRef.doc(hotelId).get()
      .then(doc => {
        hotel = new Hotel(doc.id, doc.data())
      }).catch(err => {
        console.log('Błąd podczas ładowania szczegółów hotelu!', err.message)
      })
    return hotel || null
  }

  async getHotelRooms(hotelId: string): Promise<Room[]> {
    let rooms: Room[] = []
    await this.hotelsRef.doc(hotelId).collection('rooms').get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          rooms.push(<Room>{ roomId: doc.id, ...doc.data() })
        });
      })
      .catch(err => {
        console.log('Błąd podczas ładowania pokoi', err.message)
      })
    return rooms || null
  }

  async getMyHotels(snapshot, error) {
    let adminId = firebase.auth().currentUser.uid
    console.log(adminId)
    return await this.hotelsRef.where('adminId', '==', adminId).onSnapshot(snapshot, error)
  }

  async onLoadHotels(searchData): Promise<Hotel[]> {
    let hotelList: Hotel[] = []
    let snapshot

    if (searchData.facilities[0]) {
      snapshot = await this.hotelsRef
        .where('city', '==', searchData.city)
        .where('facilities', 'array-contains', searchData.facilities[0])
        .get()
    }
    else {
      snapshot = await this.hotelsRef
        .where('city', '==', searchData.city)
        .get()
    }
    if (snapshot.empty) {
      console.log('Brak wyników!')
      return null
    }
    console.log(`Załadowałem: ${searchData.city}\n`)
    snapshot.forEach(doc => {
      let hotel = doc.data()

      for (let i = 1; i < searchData.facilities.length; i++) {
        if (!hotel.facilities.includes(searchData.facilities[i]))
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
