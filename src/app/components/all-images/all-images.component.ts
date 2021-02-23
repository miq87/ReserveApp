import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.scss']
})
export class AllImagesComponent implements OnInit, OnDestroy {

  assetsGalleriesUrl = 'assets/galleries.json'
  hotelGalleries
  sub

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.sub = this.http.get(this.assetsGalleriesUrl).subscribe((data: any) => {
      this.hotelGalleries = data.galleries
      console.log(this.hotelGalleries)
    })
  }

  ngOnDestroy(): void {
    this.sub()
  }

}
