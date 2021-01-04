export class Reservation {
    resId: string
    hotelId: string
    userId: string
    roomId: string
    dateStart: any
    dateEnd: any
    notice: string

    constructor(resId: string, resData: any) { 
        this.resId = resId
        this.hotelId = resData.hotelId
        this.userId = resData.userId
        this.roomId = resData.roomId
        this.dateStart = resData.dateStart
        this.dateEnd = resData.dateEnd
        this.notice = resData.notice
    }
}
