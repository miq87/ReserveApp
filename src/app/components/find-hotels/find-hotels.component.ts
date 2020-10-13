import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/model/hotel';
import { MessengerService } from 'src/app/services/messenger.service';
import * as firebase from "firebase/app";

@Component({
  selector: 'app-find-hotels',
  templateUrl: './find-hotels.component.html',
  styleUrls: ['./find-hotels.component.scss']
})
export class FindHotelsComponent implements OnInit {

  tmpHotelCity: string

  constructor(private _msg: MessengerService) { }

  ngOnInit(): void { }

  onSubmit(hotelCity: string) {
    this.tmpHotelCity = hotelCity
    this._msg.sendMsg(hotelCity)
  }

}
