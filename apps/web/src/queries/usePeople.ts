import { useSocket } from '@/contexts/socketContext'
import { simRest, trigger } from '@/utils'
import { useEffect, useState } from 'react'

type TOnlinePeople = string[]

type TLastActive = { username: string; lastActive: Date }[]

interface Message {
  sender: string
  sendAt: Date
  message: string
}

const useNewMessageArrived = (from: string) => {
  const { socket } = useSocket()
  const [data, setData] = useState<Message>()

  useEffect(() => {
    if (!socket) return
    socket.on(`private-${from}-new-message`, (data: Message) => {
      setData(data)
    })
  }, [])

  return data
}

const useOnlinePeople = () => {
  const { socket } = useSocket()
  const [onlinePeople, setOnlinePeople] = useState<TOnlinePeople>()

  useEffect(() => {
    if (!socket) return
    socket.emit(trigger('online-users'))

    socket.on('online-users', (data: TOnlinePeople) => {
      setOnlinePeople(data)
    })
  }, [socket])

  return onlinePeople
}

const useLastActive = (withs?: string[]) => {
  const { socket } = useSocket()
  const [lastActive, setLastActive] = useState<TLastActive>()

  useEffect(() => {
    if (!socket || !withs) return

    simRest<TLastActive>(socket, 'get-last-active', { withs }).then((data) => {
      setLastActive(data)
    })
  }, [socket, withs])

  return lastActive
}

const useSendPrivateMessage = () => {
  const { socket } = useSocket()

  const trigger = (data: { to: string; message: string }) => {
    socket?.emit('send-private-message', data)
  }

  return [trigger]
}

const usePrivateHistory = (nickname: string) => {
  const { socket } = useSocket()
  const [data, setData] = useState<Message[]>()

  useEffect(() => {
    if (!socket || !nickname) return
    socket.emit('join-private', { with: nickname })
    socket.emit(trigger('private-chat-history'), { with: nickname })

    socket.on('private-chat-history', (data: Message[]) => {
      setData(data)
    })

    return () => {
      socket.emit('leave-private', { with: nickname })
    }
  }, [socket, nickname])

  return data
}

export { useOnlinePeople, useSendPrivateMessage, usePrivateHistory, useNewMessageArrived, useLastActive }
