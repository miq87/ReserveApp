import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  formHero = new Hero()

  constructor(private _heroService: HeroService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._heroService.addHeroes(this.formHero).subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })
  }

  onGetHeroes() {
    this._heroService.getHeroes().subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })
  }

}
