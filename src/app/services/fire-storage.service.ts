import { Injectable } from '@angular/core';
import { BookingService } from './booking.service';
import firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  private storage = firebase.storage()
  private storageRef = this.storage.ref()

  constructor(private _bs: BookingService) { }

  getDefaultImage() {
    var spaceRef = this.storageRef.child('images/main_img.jpg')
    return spaceRef.getDownloadURL()
  }

  sendImage(hotelId: string, file: File, main?: boolean) {
    if (main) {
      var uploadTask = this.storageRef.child(`images/${hotelId}/main_img.jpg`).put(file)
    }
    else {
      var uploadTask = this.storageRef.child(`images/${hotelId}/${file.name}`).put(file)
    }
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
    }, err => {
      console.log(err.message)
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
        console.log('File available at: ', url);
        this._bs.addImgUrl(hotelId, url, main)
      });
    })
  }

  async deleteImg(imgUrl: string) {
    await this.storage.refFromURL(imgUrl).delete().then(() => {
      console.log(`Usunąłem plik: ${imgUrl}`)
    }).catch(err => {
      console.log(err.message)
    })
  }

}
