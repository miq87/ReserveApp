import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facilities } from '../models/classes/facilities';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {
  private facilities: Facilities[]

  assetsUrl = 'assets/facilities.json'

  constructor(private http: HttpClient) {
    this.http.get(this.assetsUrl).subscribe((data: any) => {
      this.facilities = <Facilities[]>(data.facilities)
    })
  }

  async getFacilities(values: number[]): Promise<string[]> {
    let retFacilities: string[] = []
    values.forEach(value => {
      let selectedOpt = this.facilities.find(opt => opt.id == value);
      retFacilities.push(selectedOpt.name)
    })
    return retFacilities || null
  }

  getAllFacilities() {
    return this.http.get(this.assetsUrl)
  }

}
