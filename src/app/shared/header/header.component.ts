import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this.handleBurger()
    this._auth.getCurrentUser((user) => {
      this.currentUser = user
    })
  }
  
  handleBurger() {
    const burger = document.querySelector('.burger')
    const nav = document.querySelector('.nav-links')
    const navLinks = document.querySelectorAll('.nav-links li')

    burger.addEventListener('click', () => {
      nav.classList.toggle('nav-active')
      navLinks.forEach((link) => {
        link.classList.add('nav-links-fade')
      })
      burger.classList.toggle('toggle')
    })
  }

  onLogout() {
    this._auth.logout()
  }

}
