import { IReservation } from "../interfaces/ireservation"

export class Reservation implements IReservation {
    userId: string
    roomId: string
    dateStart: Date
    dateEnd: Date
    notice: string
}
