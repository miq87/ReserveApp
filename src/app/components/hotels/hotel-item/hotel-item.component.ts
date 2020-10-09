import { Component, Input, OnInit } from '@angular/core';
import { Hotel } from 'src/app/model/hotel';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.scss']
})
export class HotelItemComponent implements OnInit {

  @Input() hotel: Hotel

  constructor(private booking_: BookingService) { }

  ngOnInit(): void {
    console.log('Hotel = >', this.hotel)
  }

  onBook() {
    console.log('Chcę zarezerwować: ' + this.hotel.id)
  }

  onRemove() {
    this.booking_.removeHotelById(this.hotel.id)
  }

}
