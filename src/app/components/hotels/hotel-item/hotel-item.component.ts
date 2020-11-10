import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel';
import { BookingService } from 'src/app/services/booking.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.scss']
})
export class HotelItemComponent implements OnInit {

  @Input() hotel: Hotel

  constructor(private _booking: BookingService, private _msg: MessengerService, private router: Router) { }

  ngOnInit() { }

  onBook() {
    console.log('Chcę zarezerwować: ' + this.hotel.id)
    this.router.navigate(['/hotels', this.hotel.id])
  }

  onRemove() {
    this._booking.removeHotelById(this.hotel.id).finally(() => {
      this._msg.sendMsg(this.hotel.city)
    })
  }

}
