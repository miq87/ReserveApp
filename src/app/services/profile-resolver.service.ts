import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/classes/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<User> {

  constructor(private _auth: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User {
    let userData: User

    this._auth.getUserData().then(user => {
      userData = <User>user.data()
      console.log(userData)
    })
    console.log(userData)
    return userData
    
  }
}
