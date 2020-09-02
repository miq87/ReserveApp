import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user: string

  constructor(private _auth: AuthService) {}

  ngOnInit(): void {
    this.user = this._auth.checkLogged()
    console.log(this.user)
  }

}
