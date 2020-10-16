import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-find-hotels',
  templateUrl: './find-hotels.component.html',
  styleUrls: ['./find-hotels.component.scss']
})
export class FindHotelsComponent implements OnInit {

  constructor(private _msg: MessengerService, private _router: Router) { }

  ngOnInit() { }

  onSubmit(hotelCity: string) {
    this._msg.sendMsg(hotelCity)
    this._router.navigate(['hotels'])
  }
}
