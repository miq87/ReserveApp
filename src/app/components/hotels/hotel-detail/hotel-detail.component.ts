import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {

  hotelId: string

  constructor(private route: ActivatedRoute, private _booking: BookingService) { }

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('id')
  }

}
