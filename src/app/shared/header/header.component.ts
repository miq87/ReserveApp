import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const burger = document.querySelector('.burger')
    const nav = document.querySelector('nav-links')

    burger.addEventListener('click', () => {
      nav.classList.toggle('nav-active')
    })
  }

}
