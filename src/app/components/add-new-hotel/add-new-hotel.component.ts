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
    {name: 'Pomorskie', abbreviation: 'PM'},
    {name: 'Zachodnio-pomorskie', abbreviation: 'ZP'},
    {name: 'Kujawsko-pomorskie', abbreviation: 'KP'}
  ];

  constructor(private fb: FormBuilder, private _nhs: AddNewHotelService) {}

  onSubmit() {
    this._nhs.AddNewHotel(this.hotelForm).then((res) => {
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  }
}
