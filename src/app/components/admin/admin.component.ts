import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Hotel } from 'src/app/models/classes/hotel';
import { Room } from 'src/app/models/classes/room';
import { BookingService } from 'src/app/services/booking.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  personNums = [1, 2, 3, 4, 5, 6]
  hotelList: Hotel[] = []
  roomList: Room[] = []
  imgUrlList: string[]
  selectedHotel: Hotel
  unsub

  hotelForm = this.fb.group({
    adminId: [{ value: '', disabled: true }],
    hotelId: [{ value: '', disabled: true }, Validators.required],
    hotelName: ['', Validators.required],
    address: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    }),
  })

  constructor(private _bs: BookingService, private fb: FormBuilder, private _fs: FireStorageService) { }

  ngOnInit(): void {
    this.unsub = this._bs.getMyHotels(querySnapshot => {
      this.hotelList = []
      if (querySnapshot.empty) {
        console.log('Brak hoteli')
      }
      else {
        querySnapshot.docs.forEach(doc => {
          this.hotelList.push(new Hotel(doc.id, doc.data()))
        });
      }
    }, error => {
      console.log(error.message)
    })

    if (this.selectedHotel) {
      console.log(this.selectedHotel.hotelId)
    }
  }

  onSelect(hotel) {
    this.selectedHotel = hotel
    this.hotelForm.patchValue(hotel)
    this._bs.getHotelRooms(hotel.hotelId).then(roomList => {
      this.roomList = roomList
    })
    this._fs.getAllImages(hotel.hotelId).then(imgUrlList => {
      this.imgUrlList = imgUrlList
    })
  }

  updateHotel() {
    this._bs.updateHotelInfo(this.selectedHotel.hotelId, this.hotelForm.value)
  }

  deleteHotel() {
    this._bs.deleteHotelById(this.selectedHotel.hotelId).then(() => {
      this.selectedHotel = null
    })
  }

  deleteImg(imgUrl: string) {
    this._fs.deleteImg(imgUrl)
  }

  addRoom(personNum: number) {
    this._bs.addNewRoom(this.selectedHotel.hotelId, personNum)
    this._bs.getHotelRooms(this.selectedHotel.hotelId).then(roomList => {
      this.roomList = roomList
    })
  }

  ngOnDestroy(): void {
    this.unsub()
  }

}
