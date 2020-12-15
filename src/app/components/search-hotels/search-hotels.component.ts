import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { MessengerService } from 'src/app/services/messenger.service';


@Component({
  selector: 'app-search-hotels',
  templateUrl: './search-hotels.component.html',
  styleUrls: ['./search-hotels.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchHotelsComponent implements OnInit {

  facList: any[]

  searchForm = this.fb.group({
    city: ['', Validators.required],
    dateStart: ['', Validators.required],
    dateEnd: ['', Validators.required],
    facilities: ['']
  })

  constructor(private fb: FormBuilder, private _fs: FacilitiesService, private _msg: MessengerService, private _router: Router) { }

  ngOnInit() {
    let pipe = new DatePipe('en-US')
    this.searchForm.patchValue({
      dateFrom: pipe.transform(Date.now(), 'yyyy-MM-dd'),
      dateTo: pipe.transform(Date.now()+604800000, 'yyyy-MM-dd') // Dodaje 7 dni (w milisekundach)
    })
    this._fs.getAllFacilities().subscribe((data: any) => {
      this.facList = data.facilities
    })
  }
  onSearch() {
    console.log(this.searchForm.value)
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
