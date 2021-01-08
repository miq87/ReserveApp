import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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
    })
  })

  states: any
  returnHotelId: string
  allFiles: File[] = []
  sub: Subscription

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _booking: BookingService,
    private _fs: FireStorageService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.sub = this.http.get("assets/data.json").subscribe((data) => {
      this.states = (<any>data).states
    })

    this.hotelForm.patchValue({ adminId: this._auth.getCurrentUserId() })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  onFileSelected(event) {
    this.allFiles.push(event.target.files[0])
  }
  onFilesSelected(event) {
    for(let i = 0; i < event.target.files.length; i++) {
      this.allFiles.push(event.target.files[i])
    }
  }
  onSubmit() {
    //let correctCity = (<string>this.hotelForm.value.address.city).substring(0,1).toUpperCase() + (<string>this.hotelForm.value.address.city).substring(1)

    this._booking.addNewHotel(this.hotelForm.value).then((retId) => {
      console.log(retId)
      this.returnHotelId = retId

      this._fs.sendMainImage(this.returnHotelId, this.allFiles[0]).then(() => {
        this.consoleInfo(this.allFiles[0].name, this.returnHotelId)
      })

      for(let i = 1; i < this.allFiles.length; i++) {
        this._fs.sendImage(this.returnHotelId, this.allFiles[i]).then(() => {
          this.consoleInfo(this.allFiles[i].name, this.returnHotelId)
        })
        .catch((error) => {
          console.log(error.message)
        })
      }

    })

  }

  consoleInfo(name: string, id: string) {
    console.log(`Dodałem '${name}' do hotelu o ID '${id}'!`)
  }

}
