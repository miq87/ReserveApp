import { IUser } from '../interfaces/iuser';

export class User implements IUser {
    firstName: string
    lastName: string
    displayName: string
    email: string
    uid: string
    photoURL: string
    date: Date
    
    /*constructor(firstName: string, lastName: string, email: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
    }*/
    constructor() {}
    
}
