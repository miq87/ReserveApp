export class Hotel {
    hotelId: string
    hotelName: string
    address: Address
    facilities: number[]
    adminId: string

    constructor(docId: string, data: any) {
        this.hotelId = docId
        this.hotelName = data.hotelName
        this.address = data.address
        this.facilities = data.facilities
        this.adminId = data.adminId
    }
}

class Address {
    street: string
    city: string
    state: string
    zip: string

    constructor() { }
}