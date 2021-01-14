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
  roomList: Room[]
  facilities: Facilities[]
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
    facilities: ['']
  })

  constructor(
    private fb: FormBuilder,
    private _bs: BookingService,
    private _fs: FireStorageService,
    private _facs: FacilitiesService) { }

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

    this._facs.getAllFacilities().subscribe((data: any) => {
      this.facilities = data.facilities
    })
  }

  ngOnDestroy(): void {
    this.unsub()
  }

  onSelect(hotel) {
    this.selectedHotel = hotel
    this.hotelForm.patchValue(hotel)
    this.loadRooms()
    this.loadImages()
  }

  onReset() {
    this.selectedHotel = null
  }

  updateHotel() {
    console.log(this.hotelForm.value)
    this._bs.updateHotel(this.selectedHotel.hotelId, this.hotelForm.value)
    this.loadImages()
  }

  deleteHotel() {
    this._bs.deleteHotelById(this.selectedHotel.hotelId).then(() => {
      this.selectedHotel = null
    })
  }

  deleteImg(imgUrl: string) {
    this._fs.deleteImg(imgUrl).then(() => {
      this.loadImages()
    })
  }

  addRoom(personNum: number) {
    this._bs.addNewRoom(this.selectedHotel.hotelId, personNum).then(() => {
      this.loadRooms()
    })
  }

  deleteRoom(hotelId: string, roomId: string) {
    this._bs.deleteRoom(hotelId, roomId).then(() => {
      this.loadRooms()
    })
  }

  loadRooms() {
    this._bs.getHotelRooms(this.selectedHotel.hotelId).then(roomList => {
      this.roomList = roomList
    })
  }

  loadImages() {
    this._fs.getAllImages(this.selectedHotel.hotelId).then(imgUrlList => {
      this.imgUrlList = imgUrlList
    })
  }

  onFileSelected(event) {
    this._fs.sendMainImage(this.selectedHotel.hotelId, event.target.files[0]).then(() => {
      this.loadImages()
    })
  }

  onFilesSelected(event) {
    for(let i = 0; i < event.target.files.length; i++) {
      this._fs.sendImage(this.selectedHotel.hotelId, event.target.files[i]).then(() => {
        this.loadImages()
      })
    }
  }

}