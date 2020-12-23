import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-reservation-item',
  templateUrl: './my-reservation-item.component.html',
  styleUrls: ['./my-reservation-item.component.scss']
})
export class MyReservationItemComponent implements OnInit {

  @Input() myReservation

  constructor() { }

  ngOnInit(): void {
  }

}
