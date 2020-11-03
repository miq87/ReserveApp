import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {
  facilities: any[]

  constructor(private _http: HttpClient) {
    this._http.get("assets/facilities.json").subscribe((data) => {
      this.facilities = <any>data
      console.log(this.facilities)
    })
  }

  getInfo(values: number[]): string[] {

    let retValues: string[] = []

    values.forEach((value) => {
      let selectedOpt = this.facilities.find(opt => opt.id == value);
      retValues.push(selectedOpt.name)
    })
    return retValues
  }

}
