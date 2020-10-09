export class Hotel {
    id: string
    hotelName: string
    address: string
    city: string
    state: string
    postalCode: string

    constructor(docId: string, data: any) {
        this.id = docId
        this.hotelName = data.hotelName
        this.address = data.address
        this.city = data.city
        this.state = data.state
        this.postalCode = data.postalCode
    }

}