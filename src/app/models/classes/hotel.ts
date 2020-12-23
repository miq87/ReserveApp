export class Hotel {
    id: string
    hotelName: string
    street: string
    city: string
    state: string
    postalCode: string
    facilities: number[]

    constructor(docId: string, data: any) {
        this.id = docId
        this.hotelName = data.hotelName
        this.street = data.street
        this.city = data.city
        this.state = data.state
        this.postalCode = data.postalCode
        this.facilities = data.facilities
    }
}