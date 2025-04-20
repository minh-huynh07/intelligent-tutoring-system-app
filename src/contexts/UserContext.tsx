import { createContext, useContext, useState } from 'react'
import type { UserInfo } from '@/types'
import { AdminSchema } from '@/types/auth'

interface UserContextType {
  user: (UserInfo & AdminSchema) | null
  setUser: (user: (UserInfo & AdminSchema) | null) => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {}
})

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<(UserInfo & AdminSchema) | null>(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
