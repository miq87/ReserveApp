import { IUser } from 'src/app/models/interfaces/iuser';

export class User implements IUser {
    firstName: string
    lastName: string
    displayName: string
    email: string
    uid: string
    photoURL: string
    birthday: Date
    role: string
    
    constructor() {}
    
}
