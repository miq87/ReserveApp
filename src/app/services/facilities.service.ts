import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {
  facilities: any[]

  constructor(private http: HttpClient) {
    this.http.get("assets/data.json").subscribe((data) => {
      this.facilities = (<any>data).facilities
    })
  }

  getFacilities(values: number[]): string[] {
    let retValues: string[] = []
    values.forEach((value) => {
      let selectedOpt = this.facilities.find(opt => opt.id == value);
      retValues.push(selectedOpt.name)
    })
    return retValues
  }

}
