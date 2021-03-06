import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/models/classes/hotel';
import { Room } from 'src/app/models/classes/room';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HotelDetailComponent implements OnInit, OnDestroy {
  hotel: Hotel
  roomList: Room[]
  hotelFacilities: string[]
  hotelImages: string[]
  subRooms

  resForm = this.fb.group({
    hotelId: ['', Validators.required],
    userId: ['', Validators.required],
    roomId: ['', Validators.required],
    dateStart: ['', Validators.required],
    dateEnd: ['', Validators.required],
    notice: [''],
  })

  constructor(
    private route: ActivatedRoute,
    private _bs: BookingService,
    private _facs: FacilitiesService,
    private _auth: AuthService,
    private _res: ReservationsService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    let hotelId = this.route.snapshot.paramMap.get('id')

    this._auth.getCurrentUser(user => {
      if (user) {
        this.resForm.patchValue({ hotelId: hotelId, userId: user.uid })
      }
    })

    this._bs.getHotelDetails(hotelId).then(hotel => {
      this.hotel = hotel

      this._facs.getFacilities(this.hotel.facilities).then(data => {
        this.hotelFacilities = data
      })
      this.subRooms = this._bs.getMyRooms(hotelId, querySnapshot => {
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
      
    })

  }

  ngOnDestroy(): void {
    this.subRooms()
  }

  onBook() {
    this._res.makeReservation(this.resForm.value)
  }

}
