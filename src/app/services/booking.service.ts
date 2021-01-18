import { Injectable } from '@angular/core';
import { Hotel } from '../models/classes/hotel';
import { Room } from '../models/classes/room';
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private hotelsRef = firebase.firestore().collection('hotels')

  constructor() { }

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
      console.log('Błąd podczas dodawania nowego hotelu!')
      console.log(err.message)
    })
    return retHotelId || null
  }

  async updateHotel(hotelId, hotelData) {
    await this.hotelsRef.doc(hotelId).update(hotelData).then(() => {
      console.log(`Zaktualizowałem dane hotelu o id: ${hotelId}`)
    }).catch(err => {
      console.log(`Błąd podczas aktualizacji danych hotelu o id ${hotelId}`)
      console.log(err.message)
    })
  }

  async addNewRoom(hotelId: string, personNum: number) {
    let room = {
      "personNum": personNum
    }
    await this.hotelsRef.doc(hotelId).collection('rooms').add(room).then(() => {
      console.log(`Dodałem pokój dla ${personNum} osób w hotelu o id: ${hotelId}`)
    }).catch(err => {
      console.log(`Błąd podczas dodawania pokoju w hotelu o id: ${hotelId}`)
      console.log(err.message)
    })
  }

  async deleteRoom(hotelId: string, roomId: string) {
    await this.hotelsRef.doc(hotelId).collection('rooms').doc(roomId).delete().then(() => {
      console.log(`Usunąłem pokój o id: ${roomId}`)
    }).catch(err => {
      console.log(`Błąd podczas usuwania pokoju o id: ${roomId}`)
      console.log(err.message)
    })
  }

  async deleteHotelById(hotelId: string) {
    await this.hotelsRef.doc(hotelId).delete()
      .then(() => {
        console.log(`Usunąłem hotel o id: ${hotelId} `)
      }).catch(err => {
        console.log(`Błąd podczas usuwania hotelu o id: ${hotelId}`)
        console.log(err.message)
      })
  }

  async getHotelDetails(hotelId: string): Promise<Hotel> {
    let hotel: Hotel
    await this.hotelsRef.doc(hotelId).get()
      .then(doc => {
        hotel = new Hotel(doc.id, doc.data())
      }).catch(err => {
        console.log('Błąd podczas ładowania szczegółów hotelu!')
        console.log(err.message)
      })
    return hotel || null
  }

  getHotelDetailsSnap(hotelId: string, querySnapshot, error) {
    return this.hotelsRef.doc(hotelId).onSnapshot(querySnapshot, error)
  }

  addImgUrl(hotelId: string, newImgUrl: string) {
    let imgUrlList: string[] = []
    this.hotelsRef.doc(hotelId).get().then(doc => {
      if(doc.data().imgUrlList) {
        imgUrlList = doc.data().imgUrlList
      }
      imgUrlList.push(newImgUrl)

      this.hotelsRef.doc(hotelId).update({ imgUrlList }).catch(err => {
        console.log(err.message)
      })
    }).catch(err => {
      console.log(err.message)
    })
  }

  async deleteImgUrl(hotelId: string, index: number) {
    let imgUrlList: string[] = []
    this.hotelsRef.doc(hotelId).get().then(doc => {
      if(doc.data().imgUrlList) {
        imgUrlList = doc.data().imgUrlList
      }
      imgUrlList.splice(index, 1)
      this.hotelsRef.doc(hotelId).update({ imgUrlList }).catch(err => {
        console.log(err.message)
      })
    }).catch(err => {
      console.log(err.message)
    })
  }

  // async getHotelRooms(hotelId: string): Promise<Room[]> {
  //   let roomList: Room[] = []
  //   await this.hotelsRef.doc(hotelId).collection('rooms').get()
  //     .then(querySnapshot => {
  //       querySnapshot.docs.forEach(doc => {
  //         roomList.push(new Room(doc.id, doc.data()))
  //       });
  //     })
  //     .catch(err => {
  //       console.log('Błąd podczas ładowania pokoji')
  //       console.log(err.message)
  //     })
  //   return roomList || null
  // }

  getMyRooms(hotelId, querySnapshot, error) {
    return this.hotelsRef.doc(hotelId).collection('rooms').onSnapshot(querySnapshot, error)
  }

  getMyHotels(querySnapshot, error) {
    let adminId = firebase.auth().currentUser.uid
    return this.hotelsRef.where('adminId', '==', adminId).onSnapshot(querySnapshot, error)
  }

  async onLoadHotels(searchData): Promise<Hotel[]> {
    let hotelList: Hotel[] = []
    let snapshot

    if (searchData.facilities[0]) {
      snapshot = await this.hotelsRef
        .where('address.city', '==', searchData.city)
        .where('facilities', 'array-contains', searchData.facilities[0])
        .get()
    }
    else {
      snapshot = await this.hotelsRef
        .where('address.city', '==', searchData.city)
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
    console.log('Dodałem nowy hotel:', hotel)
  }

}
