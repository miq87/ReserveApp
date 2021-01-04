export class Room {
    roomId: string
    personNum: number

    constructor(roomId: string, roomData: any) {
        this.roomId = roomId
        this.personNum = roomData.personNum
    }
}
