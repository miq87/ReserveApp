import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddNewHotelService } from 'src/app/services/add-new-hotel.service';

@Component({
  selector: 'app-add-new-hotel',
  templateUrl: './add-new-hotel.component.html',
  styleUrls: ['./add-new-hotel.component.scss']
})
export class AddNewHotelComponent {
  hotelForm = this.fb.group({
    hotelName: null,
    address: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
  });

  states = [
    { name: 'dolnośląskie' },
    { name: 'kujawsko-pomorskie' },
    { name: 'lubelskie' },
    { name: 'lubuskie' }, 
    { name: 'łódzkie' },
    { name: 'małopolskie' },
    { name: 'mazowieckie' },
    { name: 'opolskie' },
    { name: 'podkarpackie' },
    { name: 'podlaskie' },
    { name: 'pomorskie' },
    { name: 'śląskie' },
    { name: 'świętokrzyskie' },
    { name: 'warmińsko-mazurskie' },
    { name: 'wielkopolskie' },
    { name: 'zachodnio-pomorskie' },

  ]

  constructor(private fb: FormBuilder, private _nhs: AddNewHotelService) {}

  onSubmit() {
    this._nhs.AddNewHotel(this.hotelForm)
  }
}
