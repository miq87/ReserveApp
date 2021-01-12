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

  async getFacilities(values: number[]): Promise<string[]> {
    let retFacilities: string[] = []
    values.forEach(value => {
      let selectedOpt = this.facilities.find(opt => opt.id == value);
      retFacilities.push(selectedOpt.name)
    })
    return retFacilities || null
  }

  getAllFacilities() {
    return this.http.get("assets/data.json")
  }

}
