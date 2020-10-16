import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Hotel } from 'src/app/models/hotel';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-add-new-hotel',
  templateUrl: './add-new-hotel.component.html',
  styleUrls: ['./add-new-hotel.component.scss']
})
export class AddNewHotelComponent {
  hotelForm = this.fb.group({
    hotelName: null,
    street: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
  })

  states = [ 'dolnośląskie', 'kujawsko-pomorskie', 'lubelskie', 'lubuskie', 'łódzkie', 'małopolskie',
             'mazowieckie', 'opolskie', 'podkarpackie', 'podlaskie', 'pomorskie', 'śląskie', 'świętokrzyskie',
             'warmińsko-mazurskie', 'wielkopolskie', 'zachodnio-pomorskie' ]

  constructor(private fb: FormBuilder, private _booking: BookingService) {}

  onSubmit() {
    let newHotel = new Hotel(null,
      { 'hotelName': this.hotelForm.value.hotelName,
        'street': this.hotelForm.value.street,
        'city': this.hotelForm.value.city,
        'state': this.hotelForm.value.state,
        'postalCode': this.hotelForm.value.postalCode })

    this._booking.addNewHotel(newHotel)
  }

}
