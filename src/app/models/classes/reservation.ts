import { IReservation } from "../interfaces/ireservation"

export class Reservation implements IReservation {
    resId?: string
    hotelId: string
    userId: string
    roomId: string
    dateStart: Date
    dateEnd: Date
    notice: string
}
