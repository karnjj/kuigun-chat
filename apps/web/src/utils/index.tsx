import { Socket } from 'socket.io-client'

const resTopic = (path: string) => `response-${path}`

const trigger = (path: string) => `trigger-${path}`

const simRest = <T = any,>(socket: Socket, path: string, data?: any) => {
  return new Promise<T>((resolve) => {
    socket.emit(path, data)
    socket.on(resTopic(path), (response: any) => {
      resolve(response)
      socket.off(resTopic(path))
    })
  })
}

export { resTopic, simRest, trigger }
