import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/classes/hotel';
import { FireStorageService } from 'src/app/services/fire-storage.service';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.scss']
})
export class HotelItemComponent implements OnInit {

  @Input() hotel: Hotel
  hotelMainImg: string

  constructor(
    private _fs: FireStorageService,
    private router: Router) { }

  ngOnInit() {
    this._fs.getMainImage(this.hotel.hotelId).then(url => {
      this.hotelMainImg = url
    })
  }

  onBook() {
    console.log('Chcę zarezerwować: ' + this.hotel.hotelId)
    this.router.navigate(['/hotels', this.hotel.hotelId])
  }

}
