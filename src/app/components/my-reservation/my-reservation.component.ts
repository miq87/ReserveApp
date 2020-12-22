import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.scss']
})
export class MyReservationComponent implements OnInit {


  myBooksForm = this.fb.group({
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
