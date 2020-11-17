import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  storage = firebase.storage()
  storageRef = this.storage.ref()
  numReq = 0

  constructor() { }

  getMainImage(hotelId: string) {
    var spaceRef = this.storageRef.child(`images/${hotelId}/main_img.jpg`)
    console.log('main ' + hotelId)
    console.log(this.numReq++)
    return spaceRef.getDownloadURL()
  }
  getDefaultImage() {
    var spaceRef = this.storageRef.child('images/main_img.jpg')
    console.log('default')
    console.log(this.numReq++)
    return spaceRef.getDownloadURL()
  }
  sendMainImage(hotelId: string, file: File) {
    var spaceRef = this.storageRef.child(`images/${hotelId}/main_img.jpg`)
    return spaceRef.put(file)
  }
  sendImage(hotelId: string, file: File) {
    var spaceRef = this.storageRef.child(`images/${hotelId}/${file.name}`)
    return spaceRef.put(file)
  }

}
