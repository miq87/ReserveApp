import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor() { }

  async getMainImage(hotelId: string): Promise<string> {
    var storage = firebase.storage()
    var storageRef = storage.ref()
    var spaceRef = storageRef.child(`images/${hotelId}/main_img.jpg`)
    var imgUrl: string

    await spaceRef.getDownloadURL().then((data) => {
      imgUrl = data
    }).catch((error) => {
      console.log(error.message)
      spaceRef = storageRef.child('images/main_img.jpg')
      spaceRef.getDownloadURL().then((data) => {
        imgUrl = data
      })
      .finally(() => {
        return imgUrl
      })
    }).finally(() => {
      return imgUrl
    })
    //return imgUrl

  }

}
