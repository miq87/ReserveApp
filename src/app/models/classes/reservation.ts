import { IReservation } from "../interfaces/ireservation"

export class Reservation implements IReservation {
    hotelId: string
    userId: string
    roomId: string
    dateStart: Date
    dateEnd: Date
    notice: string
}
