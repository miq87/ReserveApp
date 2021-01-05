export class Hotel {
    hotelId: string
    hotelName: string
    street: string
    city: string
    state: string
    postalCode: string
    facilities: number[]
    adminId: string

    constructor(docId: string, data: any) {
        this.hotelId = docId
        this.hotelName = data.hotelName
        this.street = data.street
        this.city = data.city
        this.state = data.state
        this.postalCode = data.postalCode
        this.facilities = data.facilities
        this.adminId = data.adminId
    }
}