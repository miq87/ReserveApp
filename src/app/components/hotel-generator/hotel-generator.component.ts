import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-hotel-generator',
  templateUrl: './hotel-generator.component.html',
  styleUrls: ['./hotel-generator.component.scss']
})
export class HotelGeneratorComponent implements OnInit {

  hotelNames = [ 'Grand', 'Hanza', 'Sheraton', 'Amber', 'Mercure', 'Orbis', 'Radisson Blu',
                 'Rezydent', 'Number One', 'Smart', 'Eva', 'Bryza', 'Szydłowski' ]
  hotelCity = [ 'Gdańsk', 'Sopot', 'Gdynia', 'Warszawa', 'Kraków', 'Wrocław', 'Poznań', 'Katowice', 'Szczecin' ]

  hotelStreet = [ 'Adama Mickiewicza', 'Grunwaldzka', 'Jana Jerzego Haffnera', 'Stefana Czarnieckiego', 'Henryka Sienkiewicza',
                  'Generała Józefa Fiszera', 'Prezydenta Lecha Kaczyńskiego', 'Stanisława Wyspiańskiego', 'Generała Józefa Hallera',
                  'Jana Pawła II', 'Kołobrzeska', 'Macieja Płażyńskiego', 'Piastowska', 'Pomorska', 'Kolejowa' ]

  constructor(private booking_: BookingService) { }

  ngOnInit(): void {
  }

  hotelGenerator() {
    for(let i = 1; i <= 50; i++) {
      let rName = this.hotelNames[Math.floor((Math.random() * (this.hotelNames.length-1)) + 0)]
      let rCity = this.hotelCity[Math.floor((Math.random() * (this.hotelCity.length-1)) + 0)]
      let rStreet = this.hotelStreet[Math.floor((Math.random() * (this.hotelStreet.length-1)) + 0)]
      let rNumber = Math.floor((Math.random() * 100) + 10)
      let rPostalCode = Math.floor((Math.random() * 99999) + 10000)
      console.log(`${i}. ${rName} Hotel\n\t${rStreet} ${rNumber}\n\t${rPostalCode} ${rCity}\n`)
    }
  }

}
