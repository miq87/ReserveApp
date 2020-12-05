import { IUser } from 'src/app/models/interfaces/iuser';

class Address {
    street: string
    city: string
    zip: string

    constructor() { }
}

export class User implements IUser {
    firstName: string
    lastName: string
    displayName: string
    email: string
    uid: string
    photoURL: string
    birthday: Date
    address: Address
    role: string
    
    constructor() {
        this.address = new Address()
    }
    
}
