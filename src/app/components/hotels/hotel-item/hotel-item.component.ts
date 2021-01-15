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

  constructor(private router: Router) { }

  ngOnInit() { }

  onBook() {
    this.router.navigate(['/hotels', this.hotel.hotelId])
  }

}
