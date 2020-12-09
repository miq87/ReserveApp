import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { from, Observable } from 'rxjs';
import { User } from '../models/classes/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<User> {

  constructor(private _auth: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let observable$ = from(this._auth.getUserData())
    return observable$
  }
}
