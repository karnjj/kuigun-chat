import { Server } from 'socket.io'

const send = (io: Server, topic: string, msg: any) => {
  io.emit(topic, msg)
}

const response = (io: Server, topic: string, msg: any) => {
  const responseTopic = `response-${topic}`
  io.emit(responseTopic, msg)
}

export { send, response }
