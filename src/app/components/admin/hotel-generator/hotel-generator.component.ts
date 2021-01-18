import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-hotel-generator',
  templateUrl: './hotel-generator.component.html',
  styleUrls: ['./hotel-generator.component.scss']
})
export class HotelGeneratorComponent implements OnInit, OnDestroy {

  assetsUrl = "assets/data.json"
  assetsGalleriesUrl = "assets/galleries.json"
  hotelNames = []
  hotelStreets = []
  hotelCities = []
  hotelGalleries = []
  sub1: Subscription
  sub2: Subscription


  constructor(private _bs: BookingService, private http: HttpClient, private _auth: AuthService) { }

  ngOnInit(): void {
    this.sub1 = this.http.get(this.assetsUrl).subscribe((data: any) => {
      for (let i = 0; i < 16; i++) {
        this.hotelNames.push(data.hotelNames[i].name)
        this.hotelStreets.push(data.streets[i].name)
        this.hotelCities.push([data.cities[i].name, data.cities[i].state])
      }
    })
    this.sub2 = this.http.get(this.assetsGalleriesUrl).subscribe((data: any) => {
      this.hotelGalleries = data.galleries
    })
  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }

  hotelGenerator(ileHoteli: number) {
    const adminId = this._auth.getCurrentUserId()
    for (let i = 1; i <= ileHoteli; i++) {
      let rName = this.hotelNames[this.randomInt(0, this.hotelNames.length)] + ' Hotel'
      let rStreet = this.hotelStreets[this.randomInt(0, this.hotelStreets.length)]
      let rCity = this.hotelCities[this.randomInt(0, this.hotelCities.length)]
      let rNumber = this.randomInt(10, 100)
      let rZip = this.randomInt(10000, 100000)
      let facilities = this.randomFacilities()
      let imgUrlList = this.hotelGalleries[this.randomInt(1, 18)].urlList
      
      let newHotel = {
        'hotelName': rName,
        'address': {
          'street': rStreet + ' ' + rNumber,
          'city': rCity[0],
          'state': rCity[1],
          'zip': rZip,
        },
        'facilities': facilities,
        'adminId': adminId,
        'autoGenerated': true,
        'imgUrlList': imgUrlList
      }
      this._bs.addNewHotel(newHotel, [2, 4, 6, 8])
    }
  }

  randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
  }

  randomFacilities(): number[] {
    let facArray: number[] = []
    let randomElement
    for (let i = 0; i < 9; i++) {
      randomElement = this.randomInt(1, 13)
      if (!facArray.includes(randomElement)) facArray.push(randomElement)
    }
    return facArray
  }

}
