export class Room {
  roomId: string
  personNum: number
  price: number

  constructor(roomId: string, roomData: RoomData) {
    this.roomId = roomId
    this.personNum = roomData.personNum
    this.price = roomData.price
  }
}

export class RoomData {
  personNum: number
  price: number

  constructor(personNum: number, price: number) {
    this.personNum = personNum
    this.price = price
  }
}