import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  lat: number = 51.678418
  lng: number = 7.809007

  constructor(private location: LocationService) { }

  ngOnInit(): void {
    this.location.getPosition().then(pos => {
      this.lat = pos.lat 
      this.lng = pos.lng
      console.log(`Positon: ${pos.lng} ${pos.lat}`)
    })
  }

}
