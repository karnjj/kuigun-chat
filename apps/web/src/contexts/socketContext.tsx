import { createContext, useContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { useSession } from './sessionContext'
import { API_URL } from '@/config'

interface ISocketContext {
  socket: Socket | null
}

const socketContext = createContext<ISocketContext>({} as ISocketContext)

const useSocket = () => useContext(socketContext)

const SocketProvider = ({ children }: React.PropsWithChildren) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const { isAuthenticated, username } = useSession()

  useEffect(() => {
    if (!isAuthenticated) return
    const socketClient = io(API_URL, {
      transports: ['websocket'],
      auth: {
        username,
      },
    })
    setSocket(socketClient)

    return () => {
      socketClient.disconnect()
    }
  }, [isAuthenticated, username])

  return <socketContext.Provider value={{ socket }}>{children}</socketContext.Provider>
}

export { SocketProvider, useSocket }
