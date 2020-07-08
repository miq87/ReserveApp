import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor(private _heroService: HeroService) { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  onGetHeroes() {
    this._heroService.getHeroes().subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })
  }

}
