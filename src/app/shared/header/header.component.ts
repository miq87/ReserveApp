import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any
  isLogged: boolean
  isAdmin: boolean

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this._auth.getCurrentUser(user => {
      if (user) {
        this.currentUser = user
        this.isLogged = true
        this._auth.isAdmin().then(data => {
          this.isAdmin = data
        })
      }
      else { this.isLogged = false }
    })
  }
  onLogout() {
    this._auth.logout()
  }

}
