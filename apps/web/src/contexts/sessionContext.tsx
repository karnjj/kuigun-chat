import useLocalStorage from '@/hooks/useLocalStorage'
import { createContext, useContext, useEffect, useState } from 'react'

interface ISessionContext {
  username: string | null
  isAuthenticated: boolean
  login: (username: string) => void
  logout: () => void
}

const sessionContext = createContext<ISessionContext>({} as ISessionContext)

const useSession = () => useContext(sessionContext)

const SessionProvider = ({ children }: React.PropsWithChildren) => {
  const [username, setUsername, removeUsername] = useLocalStorage('session', undefined)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (username: string) => {
    setUsername(username)
  }

  const logout = () => {
    removeUsername
  }

  useEffect(() => {
    if (username) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [username])

  return (
    <sessionContext.Provider value={{ username, login, logout, isAuthenticated }}>{children}</sessionContext.Provider>
  )
}

export { useSession, SessionProvider }
