export class User {
    firstName: string
    lastName: string
    displayName: string
    email: string
    uid: string
    photoURL: string
    birthday: Date
    address: Address
    role: string
    isAdmin: false

    constructor() {
        this.address = new Address()
    }
}

class Address {
    street: string
    city: string
    zip: string

    constructor() { }
}