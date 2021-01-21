import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Facilities } from 'src/app/models/classes/facilities';
import { Hotel } from 'src/app/models/classes/hotel';
import { Room, RoomData } from 'src/app/models/classes/room';
import { BookingService } from 'src/app/services/booking.service';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  personNums = [1, 2, 3, 4, 5, 6]
  hotelList: Hotel[] = []
  roomList: Room[]
  facilities: Facilities[]
  hotelIndex: number = -1
  selectedHotelId: string
  //roomPrice: number
  subHotels
  subRooms

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
    facilities: []
  })

  constructor(
    private fb: FormBuilder,
    private _bs: BookingService,
    private _fs: FireStorageService,
    private _facs: FacilitiesService) { }

  ngOnInit(): void {

    this._facs.getAllFacilities().toPromise().then((data: any) => {
      this.facilities = data.facilities
    })

    this.subHotels = this._bs.getMyHotels(querySnapshot => {
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

  }

  ngOnDestroy(): void {
    this.subHotels()
    if (this.subRooms) {
      this.subRooms()
    }
  }

  onSelect(index: number) {
    this.hotelIndex = index
    this.selectedHotelId = this.hotelList[index].hotelId
    this.hotelForm.patchValue(this.hotelList[this.hotelIndex])

    this.subRooms = this._bs.getMyRooms(this.selectedHotelId, querySnapshot => {
      this.roomList = []
      if (querySnapshot.empty) {
        console.log('Brak pokoi')
      }
      else {
        querySnapshot.docs.forEach(doc => {
          this.roomList.push(new Room(doc.id, doc.data()))
        });
      }
    }, err => {
      console.log(err.message)
    })
  }

  onReset() {
    this.subRooms()
    this.hotelIndex = -1
  }

  updateHotel() {
    this._bs.updateHotel(this.selectedHotelId, this.hotelForm.value)
  }

  deleteHotel() {
    this._bs.deleteHotelById(this.selectedHotelId).then(() => {
      this.hotelIndex = -1
    })
  }

  deleteImg(index: number) {
    this._bs.deleteImgUrl(this.selectedHotelId, index)
  }

  addRoom(personNum: number, price: number) {
    let roomData = new RoomData(personNum, price)
    this._bs.addNewRoom(this.selectedHotelId, roomData)
  }

  deleteRoom(roomId: string) {
    this._bs.deleteRoom(this.selectedHotelId, roomId)
  }

  onFileSelected(event) {
    this._fs.sendImage(this.selectedHotelId, event.target.files[0], true)
  }

  onFilesSelected(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this._fs.sendImage(this.selectedHotelId, event.target.files[i])
    }
  }

}