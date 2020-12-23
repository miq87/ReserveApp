import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-reservation-item',
  templateUrl: './my-reservation-item.component.html',
  styleUrls: ['./my-reservation-item.component.scss']
})

export class MyReservationItemComponent implements OnInit {

  @Input() myReservation

  myResForm = this.fb.group({
    roomId: ['', Validators.required],
    userId: ['', Validators.required],
    dateStart: ['', Validators.required],
    dateEnd: ['', Validators.required],
    notice: [''],
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
