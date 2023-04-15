import { useSocket } from '@/contexts/socketContext'
import { trigger } from '@/utils'
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

export { useAllGroups }
