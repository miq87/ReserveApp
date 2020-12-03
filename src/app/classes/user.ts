import { IUser } from '../interfaces/iuser';

export class User implements IUser {
    firstName: string
    lastName: string
    displayName: string
    email: string
    uid: string
    photoURL: string
    birthday: Date
    
    constructor() {}
    
}
