import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Facilities } from 'src/app/models/classes/facilities';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { LabelType, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-search-hotels',
  templateUrl: './search-hotels.component.html',
  styleUrls: ['./search-hotels.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchHotelsComponent implements OnInit {

  facilities: Facilities[]
  minValue: number = 100
  maxValue: number = 400
  options: Options = {
    floor: 0,
    ceil: 500
  }

  searchForm = this.fb.group({
    city: ['', Validators.required],
    dateStart: ['', Validators.required],
    dateEnd: ['', Validators.required],
    facilities: [''],
    priceMin: [100, Validators.required],
    priceMax: [400, Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private _fs: FacilitiesService,
    private _msg: MessengerService,
    private _router: Router) { }

  ngOnInit() {
    this._fs.getAllFacilities().subscribe((data: any) => {
      this.facilities = data.facilities
    })
  }
  onSearch() {
    let city = this.titleCase(this.searchForm.value.city)
    this.searchForm.patchValue({ city: city })
    this._msg.sendMsg(this.searchForm.value)
    this._router.navigate(['hotels'])
  }
  titleCase(str) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }
  onPriceChange(event) {
    console.log('priceMin: ', event)
  }
  onHighValueChange(event) {
    console.log('priceMax:', event)
  }

}
