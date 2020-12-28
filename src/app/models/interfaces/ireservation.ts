export interface IReservation {
    resId?: string
    hotelId: string
    userId: string
    roomId: string
    dateStart: Date
    dateEnd: Date
    notice: string
}
