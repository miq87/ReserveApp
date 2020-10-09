import { Component, Input, OnInit } from '@angular/core';
import { Hotel } from 'src/app/model/hotel';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.scss']
})
export class HotelItemComponent implements OnInit {

  @Input() hotel: Hotel

  constructor() { }

  ngOnInit(): void {
    console.log("Hotel = >", this.hotel)
  }

  onBook(hotelId: string) {
    console.log("Rezerwuje: " + hotelId)
  }

}
