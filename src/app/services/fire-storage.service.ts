import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import "firebase/storage";


@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor() { }

  getMainImage(hotelId: string) {
    var storage = firebase.storage()
    var storageRef = storage.ref()
    var spaceRef = storageRef.child(`images/${hotelId}/main_img.jpg`)
    return spaceRef
  }

}
