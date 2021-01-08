import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  private storage = firebase.storage()
  private storageRef = this.storage.ref()

  constructor() { }

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
  getMainImage(hotelId: string): Promise<string> {
    var spaceRef = this.storageRef.child(`images/${hotelId}/main_img.jpg`)

    return new Promise((resolve, reject) => {
      spaceRef.getDownloadURL().then(url => {
        resolve(url)
      })
        .catch(err => {
          console.log(err.code)
          this.getDefaultImage().then(url => {
            resolve(url)
          })
            .catch(err => {
              reject(err)
            })
        })
    })

  }

  getAllImages(hotelId: string) {
    var listRef = this.storageRef.child(`images/${hotelId}`)

    listRef.listAll().then(res => {
      res.prefixes.forEach(folderRef => {
        console.log(folderRef)
      })
      res.items.forEach(itemRef => {
        console.log(itemRef)
      })
    }).catch(err => {
      console.log(err)
    })
  }

}
