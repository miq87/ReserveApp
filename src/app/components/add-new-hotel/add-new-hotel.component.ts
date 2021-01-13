import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Facilities } from 'src/app/models/classes/facilities';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';

@Component({
  selector: 'app-add-new-hotel',
  templateUrl: './add-new-hotel.component.html',
  styleUrls: ['./add-new-hotel.component.scss']
})

export class AddNewHotelComponent implements OnInit, OnDestroy {

  hotelForm = this.fb.group({
    adminId: ['', Validators.required],
    hotelName: ['', Validators.required],
    address: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(6)])]
    }),
    facilities: ['']
  })

  facilities: Facilities[]
  states: any[]
  returnHotelId: string
  mainImg: File
  allImages: File[] = []
  sub: Subscription

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _booking: BookingService,
    private _fs: FireStorageService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.sub = this.http.get("assets/data.json").subscribe((data: any) => {
      this.states = data.states
      this.facilities = data.facilities
    })

    this.hotelForm.patchValue({ adminId: this._auth.getCurrentUserId() })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  onFileSelected(event) {
    this.mainImg = event.target.files[0]
  }

  onFilesSelected(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.allImages.push(event.target.files[i])
    }
  }

  onSubmit() {
    this._booking.addNewHotel(this.hotelForm.value).then((retId) => {
      this.returnHotelId = retId

      if (this.mainImg) {
        this._fs.sendMainImage(this.returnHotelId, this.mainImg).then(() => {
          this.consoleInfo(this.mainImg.name, this.returnHotelId)
        })
      }
      for (let i = 0; i < this.allImages.length; i++) {
        this._fs.sendImage(this.returnHotelId, this.allImages[i]).then(() => {
          this.consoleInfo(this.allImages[i].name, this.returnHotelId)
        })
          .catch((err) => {
            console.log(err.message)
          })
      }
    })
  }

  consoleInfo(name: string, id: string) {
    console.log(`Dodałem '${name}' do hotelu o ID '${id}'!`)
  }

}
