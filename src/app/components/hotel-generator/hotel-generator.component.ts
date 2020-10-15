import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/model/hotel';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-hotel-generator',
  templateUrl: './hotel-generator.component.html',
  styleUrls: ['./hotel-generator.component.scss']
})
export class HotelGeneratorComponent implements OnInit {

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

  constructor(private booking_: BookingService) { }

  ngOnInit(): void {
  }

  hotelGenerator(ileHoteli: number) {
    for(let i = 1; i <= ileHoteli; i++) {
      let rName = this.hotelNames[Math.floor((Math.random() * (this.hotelNames.length)))] + ' Hotel'
      let rStreet = this.hotelStreet[Math.floor((Math.random() * (this.hotelStreet.length)))]
      let rCity = this.hotelCity[Math.floor((Math.random() * (this.hotelCity.length)))]
      let rNumber = Math.floor((Math.random() * 100) + 10)
      let rPostalCode = Math.floor((Math.random() * 80000) + 10000)
      
      let rHotel = new Hotel(null,
        { 'hotelName': rName,
          'street': rStreet + ' ' + rNumber,
          'city': rCity[0],
          'state': rCity[1],
          'postalCode': rPostalCode })

      this.booking_.addNewRandomHotels(rHotel)
    }
  }
}
