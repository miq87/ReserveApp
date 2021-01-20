import { Facilities } from "./facilities"

export class SearchRequest {
  city: string
  dateStart: Date
  dateEnd: Date
  facilities: Facilities[]

  constructor() { }
}
