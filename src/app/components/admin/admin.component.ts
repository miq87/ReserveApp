import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Hotel } from 'src/app/models/classes/hotel';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  hotelList: Hotel[] = []
  selectedHotel: Hotel
  unsub

  hotelForm = this.fb.group({
    hotelId: ['', Validators.required],
    hotelName: ['', Validators.required],
    street: ['', Validators.required],
    city: [{ value: '', disabled: true }, Validators.required],
    state: ['', Validators.required],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    role: ['', Validators.required],
  })

  constructor(private _bs: BookingService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.unsub = this._bs.getMyHotels(querySnapshot => {
      this.hotelList = []
      if(querySnapshot.empty) {
        console.log('Brak hoteli')
      }
      else {
        querySnapshot.docs.forEach(doc => {
          this.hotelList.push(new Hotel(doc.id, doc.data()))
        });
      }
      console.log(this.hotelList)
    }, error => {
      console.log(error.message)
    })
  }

  ngOnDestroy(): void {
    this.unsub()
  }

  onSelect(hotel) {
    this.selectedHotel = hotel
    this.hotelForm.patchValue(hotel)
    console.log(`selected ${hotel.hotelName}`)
  }

}
