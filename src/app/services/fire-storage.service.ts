import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  storage = firebase.storage()
  storageRef = this.storage.ref()

  constructor() { }

  getMainImage(hotelId: string) {
    var spaceRef = this.storageRef.child(`images/${hotelId}/main_img.jpg`)
    return spaceRef.getDownloadURL()
  }
  getDefaultImage() {
    var spaceRef = this.storageRef.child('images/main_img.jpg')
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
