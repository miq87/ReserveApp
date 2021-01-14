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
    this.storageRef.child(`images/${hotelId}/main_img.jpg`).put(file).then(() => {
      console.log(`Dodałem 'main_img.jpg' do hotelu o ID '${hotelId}'!`)
    }).catch(err => {
      console.log(err.message)
    })
  }
  sendImages(hotelId: string, files: File[]) {
    files.forEach(file => {
      console.log(file.name)
      this.storageRef.child(`images/${hotelId}/${file.name}`).put(file).then(() => {
        console.log(`Dodałem '${file.name}' do hotelu o ID '${hotelId}'!`)
      }).catch(err => {
        console.log(err.message)
      })
    })
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

  async getAllImages(hotelId: string): Promise<string[]> {
    var listRef = this.storageRef.child(`images/${hotelId}`)
    var urlList = []

    await listRef.listAll().then(res => {
      res.items.forEach(itemRef => {
        itemRef.getDownloadURL().then(url => {
          urlList.push(url)
        })
      })
    }).catch(err => {
      console.log(err)
    })
    return urlList
  }

  async deleteImg(imgUrl: string) {
    await this.storage.refFromURL(imgUrl).delete().then(() => {
      console.log(`Usunąłem plik: ${imgUrl}`)
    }).catch(err => {
      console.log(err.message)
    })
  }

}
