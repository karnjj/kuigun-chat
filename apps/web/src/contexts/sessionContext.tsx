import useLocalStorage from '@/hooks/useLocalStorage'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

interface ISessionContext {
  username: string | null
  isAuthenticated: boolean
  login: (username: string) => void
  logout: () => void
}

const sessionContext = createContext<ISessionContext>({} as ISessionContext)

const useSession = () => useContext(sessionContext)

const ignoreRoutes = ['/login']

const SessionProvider = ({ children }: React.PropsWithChildren) => {
  const [username, setUsername, removeUsername] = useLocalStorage('session', undefined)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

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
      router.push('/login')
    }
  }, [username])

  return (
    <sessionContext.Provider value={{ username, login, logout, isAuthenticated }}>
      {isAuthenticated || ignoreRoutes.includes(router.pathname) ? children : null}
    </sessionContext.Provider>
  )
}

export { useSession, SessionProvider }
