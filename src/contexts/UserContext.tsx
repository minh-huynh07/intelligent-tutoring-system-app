import { createContext, useContext, useState, useEffect } from 'react'
import type { UserInfo } from '@/types'

interface UserContextType {
  user: UserInfo | null
  setUser: (user: UserInfo | null) => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {}
})

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
