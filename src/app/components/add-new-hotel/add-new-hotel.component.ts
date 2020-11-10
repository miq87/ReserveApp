import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Hotel } from 'src/app/models/hotel';
import { BookingService } from 'src/app/services/booking.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';

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
    ]
  })

  states: any
  returnHotelId: string
  allFiles: File[] = []

  constructor(
    private fb: FormBuilder,
    private _booking: BookingService,
    private _fs: FireStorageService,
    private http: HttpClient) {
      this.http.get("assets/data.json").subscribe((data) => {
        this.states = (<any>data).states
      })
  }

  ngOnInit() {
    console.log(this.allFiles.length)
  }

  onFileSelected(event) {
    this.allFiles.push(event.target.files[0])
    console.log(this.allFiles.length)

  }
  onFilesSelected(event) {
    for(let i = 0; i < event.target.files.length; i++) {
      this.allFiles.push(event.target.files[i])
    }
    console.log(this.allFiles)
  }

  onSubmit() {
    let correctCity = (<string>this.hotelForm.value.city).substring(0,1).toUpperCase() + (<string>this.hotelForm.value.city).substring(1)
    let newHotel = new Hotel(null,
      { 'hotelName': this.hotelForm.value.hotelName,
        'street': this.hotelForm.value.street,
        'city': correctCity,
        'state': this.hotelForm.value.state,
        'postalCode': this.hotelForm.value.postalCode })
    this._booking.addNewHotel(newHotel).then((data) => {
      this.returnHotelId = data
      console.log(this.returnHotelId)
    })
    .finally(() => {
      this._fs.sendMainImage(this.returnHotelId, this.allFiles[0]).then((data) => {
        this.consoleInfo(this.allFiles[0].name, this.returnHotelId)
      })
      
      for(let i = 1; i < this.allFiles.length; i++) {
        this._fs.sendImage(this.returnHotelId, this.allFiles[i]).then((data) => {
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
