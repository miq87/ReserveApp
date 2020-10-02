import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss']
})

export class PromiseComponent implements OnInit {

  color: ThemePalette = 'primary'
  mode: ProgressSpinnerMode = 'indeterminate'
  isVisible = true
  isLoaded = false

  constructor() { }

  ngOnInit(): void {
    this.getPresent().then(present => {
      console.log(present)
      this.isVisible = !this.isVisible
      this.isLoaded = !this.isLoaded
    }).catch(error => {
      console.log(error)
    })
  }

  getPresent() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Oto prezent!')
      }, 4000);
    });
  }

}
