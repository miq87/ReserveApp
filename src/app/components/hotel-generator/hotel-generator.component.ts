import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-hotel-generator',
  templateUrl: './hotel-generator.component.html',
  styleUrls: ['./hotel-generator.component.scss']
})
export class HotelGeneratorComponent implements OnInit {

  assetsUrl = "assets/data.json"
  hotelNames = []
  hotelStreet = []
  hotelCity = []

  constructor(private _bs: BookingService, private http: HttpClient) {
    this.http.get(this.assetsUrl).subscribe((data: any) => {
      for(let i = 0; i < 16; i++) {
        this.hotelNames.push(data.hotelNames[i].name)
        this.hotelStreet.push(data.hotelStreet[i].name)
        this.hotelCity.push([data.hotelCity[i].name, data.hotelCity[i].state])
      }
    })
  }

  ngOnInit() { }
  hotelGenerator(ileHoteli: number) {
    for(let i = 1; i <= ileHoteli; i++) {
      let rName = this.hotelNames[this.randomInt(0, this.hotelNames.length)] + ' Hotel'
      let rStreet = this.hotelStreet[this.randomInt(0, this.hotelStreet.length)]
      let rCity = this.hotelCity[this.randomInt(0, this.hotelCity.length)]
      let rNumber = this.randomInt(10, 100)
      let rPostalCode = this.randomInt(10000, 100000)
      let facilities = this.randomFacilities()
      
      let newHotel = {
        'hotelName': rName,
        'street': rStreet + ' ' + rNumber,
        'city': rCity[0],
        'state': rCity[1],
        'postalCode': rPostalCode,
        'facilities': facilities
      }
      this._bs.addNewHotel(newHotel, [2,4,6,8])
    }
  }

  randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
  }

  randomFacilities(): number[] {
    let facArray: number[] = []
    let randomElement
    for(let i = 0; i < 9; i++) {
      randomElement = this.randomInt(1,13)
      if(!facArray.includes(randomElement)) facArray.push(randomElement)
    }
    return facArray
  }

}
