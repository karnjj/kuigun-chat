import { Server } from 'socket.io'

const send = (io: Server, topic: string, msg: any) => {
  io.emit(topic, msg)
}

const sendRoom = (io: Server, room: string, topic: string, msg: any) => {
  io.to(room).emit(topic, msg)
}

const response = (io: Server, to: string, topic: string, msg: any) => {
  const responseTopic = `response-${topic}`
  io.to(to).emit(responseTopic, msg)
}

export { send, sendRoom, response }
