import { useSocket } from '@/contexts/socketContext'
import { trigger } from '@/utils'
import { useEffect, useState } from 'react'

type TOnlinePeople = string[]

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

export { useOnlinePeople }
