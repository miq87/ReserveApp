import { query } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Facilities } from 'src/app/models/classes/facilities';
import { Hotel } from 'src/app/models/classes/hotel';
import { Room } from 'src/app/models/classes/room';
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
  roomList: Room[] = []
  facilities: Facilities[]
  hotelIndex: number = -1
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

    this._facs.getAllFacilities().subscribe((data: any) => {
      this.facilities = data.facilities
    })
  }

  ngOnDestroy(): void {
    this.subHotels()
    this.subRooms()
  }

  onSelect(index: number) {
    this.hotelIndex = index
    this.hotelForm.patchValue(this.hotelList[this.hotelIndex])

    this.subRooms = this._bs.getMyRooms(this.hotelList[this.hotelIndex].hotelId, querySnapshot => {
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
    this._bs.updateHotel(this.hotelList[this.hotelIndex].hotelId, this.hotelForm.value)
  }

  deleteHotel() {
    this._bs.deleteHotelById(this.hotelList[this.hotelIndex].hotelId).then(() => {
      this.hotelIndex = -1
    })
  }

  deleteImg(index: number) {
    this._bs.deleteImgUrl(this.hotelList[this.hotelIndex].hotelId, index)
    console.log('index: ', this.hotelList[this.hotelIndex].hotelId, index)
  }

  addRoom(personNum: number) {
    this._bs.addNewRoom(this.hotelList[this.hotelIndex].hotelId, personNum)
  }

  deleteRoom(roomId: string) {
    this._bs.deleteRoom(this.hotelList[this.hotelIndex].hotelId, roomId)
  }

  onFileSelected(event) {
    this._fs.sendImage(this.hotelList[this.hotelIndex].hotelId, event.target.files[0], true)
  }

  onFilesSelected(event) {
    for(let i = 0; i < event.target.files.length; i++) {
      this._fs.sendImage(this.hotelList[this.hotelIndex].hotelId, event.target.files[i])
    }
  }

}