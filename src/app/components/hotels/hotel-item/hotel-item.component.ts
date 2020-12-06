import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel';
import { BookingService } from 'src/app/services/booking.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.scss']
})
export class HotelItemComponent implements OnInit {

  @Input() hotel: Hotel
  imgMain: string

  constructor(
    private _fs: FireStorageService,
    private _bs: BookingService,
    private _msg: MessengerService,
    private router: Router) { }

  ngOnInit() {
    this._fs.getMainImage(this.hotel.id).then((data) => {
      this.imgMain = data
    })
    .catch(err => {
      console.log(err.code)
      this._fs.getDefaultImage().then((data) => {
        this.imgMain = data
      })
      .catch(err => {
        console.log(err.code)
      })
    })
  }

  onBook() {
    console.log('Chcę zarezerwować: ' + this.hotel.id)
    this.router.navigate(['/hotels', this.hotel.id])
  }

  onRemove() {
    this._bs.removeHotelById(this.hotel.id).finally(() => {
      this._msg.sendMsg(this.hotel.city)
    })
  }

}
