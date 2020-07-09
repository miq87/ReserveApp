import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../models/hero';
import { heroesUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(heroesUrl)
  }

  addHeroes(hero: Hero): Observable<any> {
    // JSON.stringify, JSON.parse
    return this.http.post(heroesUrl, hero)
  }

}
