import { useSocket } from '@/contexts/socketContext'
import { simRest, trigger } from '@/utils'
import { useEffect, useState } from 'react'

type TAllGroups = {
  id: string
  name: string
  onlineCount: number
}[]

const useAllGroups = () => {
  const { socket } = useSocket()
  const [data, setData] = useState<TAllGroups>()

  useEffect(() => {
    if (!socket) return
    socket.emit(trigger('all-groups'))

    socket.on('all-groups', (data: TAllGroups) => {
      setData(data)
    })
  }, [socket])

  return data
}

const useGroupColors = () => {
  const { socket } = useSocket()
  const [data, setData] = useState<string[]>()

  useEffect(() => {
    if (!socket) return
    ;(async () => {
      const colors = await simRest<string[]>(socket, 'get-all-colors')
      setData(colors)
    })()
  }, [socket])

  return data
}

interface ICreateGroupRes {
  groupId: string
  status: 'OK' | 'ERROR'
}

const useCreateGroup = () => {
  const { socket } = useSocket()

  const trigger = async (data: { name: string; color: string }) => {
    return await simRest<ICreateGroupRes>(socket, 'create-group', data)
  }

  return [trigger]
}

interface Message {
  sender: string
  sendAt: Date
  message: string
}

const useGroupHistory = (groupId: string) => {
  const { socket } = useSocket()
  const [data, setData] = useState<Message[]>()

  useEffect(() => {
    if (!socket) return
    socket.emit('join-group', { groupId })
    socket.emit(trigger('group-chat-history'), { groupId })

    socket.on('group-chat-history', (data: Message[]) => {
      setData(data)
    })

    return () => {
      socket.emit('leave-group', { groupId })
    }
  }, [socket, groupId])

  return data
}

const useSendGroupMessage = () => {
  const { socket } = useSocket()

  const trigger = (data: { groupId: string; message: string }) => {
    socket?.emit('send-group-message', data)
  }

  return [trigger]
}

const useListenGroupOnlineCount = (groupId: string, default_value: number) => {
  const { socket } = useSocket()
  const [data, setData] = useState<number>()

  useEffect(() => {
    if (!socket) return
    socket.on(`group-${groupId}-online-count`, (data: number) => {
      setData(data)
    })

    return () => {
      socket.off(`group-${groupId}-online-count`)
    }
  }, [])

  useEffect(() => {
    setData(default_value)
  }, [default_value])

  return data
}

export { useAllGroups, useCreateGroup, useGroupColors, useGroupHistory, useSendGroupMessage, useListenGroupOnlineCount }
