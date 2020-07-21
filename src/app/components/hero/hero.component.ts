import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  formHero = new Hero()
  AllHeroes : Hero[]
  @Output() AllHeroesOut = new EventEmitter<Hero[]>()


  constructor(private _heroService: HeroService) { }

  ngOnInit(): void {
    this.onGetHeroes()
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
      this.AllHeroes = data
      console.log(this.AllHeroes)
      this.AllHeroesOut.emit(this.AllHeroes)
    }, err => {
      console.log(err)
    })
  }

}
