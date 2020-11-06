import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Hotel } from 'src/app/models/hotel';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-add-new-hotel',
  templateUrl: './add-new-hotel.component.html',
  styleUrls: ['./add-new-hotel.component.scss']
})
export class AddNewHotelComponent {
  hotelForm = this.fb.group({
    hotelName: [null, Validators.required],
    street: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    imgTitle: [null]
  })

  imgCount: number = 0
  images: FormControl[] = []
  states: any[]

  constructor(private fb: FormBuilder, private _booking: BookingService, private http: HttpClient) {
    this.http.get("assets/data.json").subscribe((data) => {
      this.states = (<any>data).states
    })
  }

  ngOnInit() { }

  onSubmit() {
    let returnHotelId: string
    let correctCity = (<string>this.hotelForm.value.city).substring(0,1).toUpperCase() + (<string>this.hotelForm.value.city).substring(1)
    let newHotel = new Hotel(null,
      { 'hotelName': this.hotelForm.value.hotelName,
        'street': this.hotelForm.value.street,
        'city': correctCity,
        'state': this.hotelForm.value.state,
        'postalCode': this.hotelForm.value.postalCode })
    this._booking.addNewHotel(newHotel).then((data) => {
      returnHotelId = data
      console.log(returnHotelId)
    })
  }

  addNewImgControl() {
    let controlka = new FormControl()
    this.images.push(controlka)
    this.hotelForm.addControl(`img${this.imgCount++}`, controlka)
    console.log(this.hotelForm)
  }

  onFileChanged(event) {
    const file = event.target.files[0]
  }

}
