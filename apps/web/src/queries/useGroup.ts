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

export { useAllGroups, useCreateGroup, useGroupColors }
