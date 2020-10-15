import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-find-hotels',
  templateUrl: './find-hotels.component.html',
  styleUrls: ['./find-hotels.component.scss']
})
export class FindHotelsComponent implements OnInit {

  constructor(private _msg: MessengerService) { }

  ngOnInit() { }

  onSubmit(hotelCity: string) {
    this._msg.sendMsg(hotelCity)
  }
}
