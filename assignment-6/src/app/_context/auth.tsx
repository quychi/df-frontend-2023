'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { TOKEN_KEY, client } from '../_lib/api'

interface AuthContextValue {
  isLogin: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  return context
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(() => {
    return typeof window === 'undefined'
      ? false
      : Boolean(window.localStorage.getItem(TOKEN_KEY))
  })

  const { replace } = useRouter()
  const pathname = usePathname()

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await client.login({ email, password })
      if (response.data.accessToken) {
        window.localStorage.setItem(TOKEN_KEY, response.data.accessToken)
        client.setToken(response.data.accessToken)
        setIsLogin(true)
      } else {
        // Handle error
        console.log('Error')
      }
    } catch (error) {
      // Handle error
      console.log(error)
    }
  }, [])

  const logout = useCallback(() => {
    setIsLogin(false)
    window.localStorage.removeItem(TOKEN_KEY)
  }, [])

  useEffect(() => {
    if (!isLogin && pathname !== '/sign-in') {
      replace('/sign-in')
    }
  }, [isLogin, pathname, replace])

  console.log('from auth context provide - pathname:', pathname)

  const providerValue = useMemo(
    () => ({ isLogin, login, logout }),
    [isLogin, login, logout],
  )

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}
