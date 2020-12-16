import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Hotel } from 'src/app/models/hotel';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-hotel-generator',
  templateUrl: './hotel-generator.component.html',
  styleUrls: ['./hotel-generator.component.scss']
})
export class HotelGeneratorComponent implements OnInit {

  assetsUrl = "assets/data.json"

  hotelNames = [ 'Grand', 'Hanza', 'Sheraton', 'Amber', 'Mercure', 'Orbis', 'Radisson Blu',
                 'Rezydent', 'Number One', 'Smart', 'Eva', 'Bryza', 'Szydłowski', 'Roko' ]
  hotelStreet = [ 'Adama Mickiewicza', 'Grunwaldzka', 'Jana Jerzego Haffnera', 'Stefana Czarnieckiego', 'Henryka Sienkiewicza',
                 'Generała Józefa Fiszera', 'Prezydenta Lecha Kaczyńskiego', 'Stanisława Wyspiańskiego', 'Generała Józefa Hallera',
                 'Jana Pawła II', 'Kołobrzeska', 'Macieja Płażyńskiego', 'Piastowska', 'Pomorska', 'Kolejowa', 'Traugutta' ]
  hotelCity = [ ['Gdańsk', 'pomorskie'], ['Sopot', 'pomorskie'], ['Gdynia', 'pomorskie'],
                ['Warszawa', 'mazowieckie'], ['Kraków', 'małopolskie'], ['Wrocław', 'dolnośląskie'], ['Poznań', 'wielkopolskie'],
                ['Katowice', 'śląskie'], ['Szczecin', 'zachodnio-pomorskie'], ['Chorzów', 'śląskie'], ['Rzeszów','podkarpackie'],
                ['Zakopane', 'małopolskie'], ['Toruń', 'kujawsko-pomorskie'], ['Białystok', 'podlaskie'], ['Łódź', 'łódzkie'],
                ['Lublin', 'lubelskie'] ]

  constructor(private _booking: BookingService, private http: HttpClient) {
    http.get(this.assetsUrl).subscribe((data: any) => {
      console.log(data.hotelNames)
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
      this._booking.addNewHotel(newHotel)
    }
  }
  randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
  }
  randomFacilities(): number[] {
    let facArray: number[] = []
    for(let i = 0; i < this.randomInt(3, 9); i++) {
      facArray.push(this.randomInt(1,13))
    }
    return facArray
  }

}
