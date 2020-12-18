import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {
  private facilities: any[]

  constructor(private http: HttpClient) {
    this.http.get("assets/data.json").subscribe((data: any) => {
      this.facilities = data.facilities
    })
  }

  getFacilities(values: number[]) {
    let retValues: string[] = []
    return new Promise((resolve) => {
      values.forEach(value => {
        let selectedOpt = this.facilities.find(opt => opt.id == value);
        retValues.push(selectedOpt.name)
      })
      resolve(retValues)
    })
  }

  getAllFacilities() {
    return this.http.get("assets/data.json")
  }

}
