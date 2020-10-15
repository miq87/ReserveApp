import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-hotels',
  templateUrl: './find-hotels.component.html',
  styleUrls: ['./find-hotels.component.scss']
})
export class FindHotelsComponent implements OnInit {

  tmpHotelCity: string

  constructor(private _msg: MessengerService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(hotelCity: string) {
    this.tmpHotelCity = hotelCity
    this.router.navigate(['hotels'])//.finally(() => {
    this._msg.sendMsg(hotelCity)
    //})
  }
}
