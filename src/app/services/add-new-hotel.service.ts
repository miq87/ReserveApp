import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AddNewHotelService {

  constructor(private db: AngularFirestore) { }

  async AddNewHotel(form: FormGroup) {
    return await this.db.collection('hotels').add({
      hotelName: form.value.hotelName,
      address: form.value.address,
      city: form.value.city,
      state: form.value.state,
      postalCode: form.value.postalCode
    }).then((res) => {
      console.log('Dodałem nowy hotel o id: ' + res.id)
    }).catch((error) => {
      console.log('Błąd podczas dodawania nowego hotelu', error)
    })
  }

}
