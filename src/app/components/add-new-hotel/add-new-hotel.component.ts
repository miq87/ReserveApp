import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';

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

  states = [ 'dolnośląskie', 'kujawsko-pomorskie', 'lubelskie',
             'lubuskie', 'łódzkie', 'małopolskie', 'mazowieckie', 'opolskie',
             'podkarpackie', 'podlaskie', 'pomorskie', 'śląskie', 'świętokrzyskie',
             'warmińsko-mazurskie', 'wielkopolskie', 'zachodnio-pomorskie' ]

  constructor(private fb: FormBuilder, private _booking: BookingService) {}

  onSubmit() {
    this._booking.addNewHotel(this.hotelForm)
  }

}
