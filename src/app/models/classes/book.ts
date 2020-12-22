import { IBook } from "../interfaces/ibook"

export class Book implements IBook {
    userId: string
    roomId: string
    dateStart: Date
    dateEnd: Date
    notice: string
}
