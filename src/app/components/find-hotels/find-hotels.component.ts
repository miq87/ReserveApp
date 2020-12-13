import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-find-hotels',
  templateUrl: './find-hotels.component.html',
  styleUrls: ['./find-hotels.component.scss']
})
export class FindHotelsComponent implements OnInit {

  searchForm = this.fb.group({
    city: ['', Validators.required],
    dateFrom: ['', Validators.required],
    dateTo: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private _msg: MessengerService, private _router: Router) { }

  ngOnInit() {
    let pipe = new DatePipe('en-US')
    this.searchForm.patchValue({
      dateFrom: pipe.transform(Date.now(), 'yyyy-MM-dd'),
      dateTo: pipe.transform(Date.now()+604800000, 'yyyy-MM-dd') // Dodaje 7 dni (w milisekundach)
    })
  }
  onSearch() {
    let city = this.titleCase(this.searchForm.value.city)
    this.searchForm.patchValue({ city: city })
    this._msg.sendMsg(city)
    this._router.navigate(['hotels'])
  }
  titleCase(str) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }

}
