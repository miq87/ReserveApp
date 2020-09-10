import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  displayName: string
  isLogged: boolean

  constructor(private auth_: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn()
  }

  getUser() {
    this.auth_.authState$.pipe(first()).subscribe(data => {
      console.log(data.displayName)
      this.displayName = data.displayName
    })
  }

  isLoggedIn() {
    this.auth_.isLoggedIn().subscribe(data => {
      this.isLogged = data
    },
    error => {
      console.log(error)
    })
  }
  
}
