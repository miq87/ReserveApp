import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private _bs: BookingService) { }

  ngOnInit(): void {
    this._bs.getMyHotels(snapshot => {
      snapshot.docs.forEach(snap => {
        console.log(snap.data())        
      });

    }, error => {
      console.log(error.message)
    })
  }

}
