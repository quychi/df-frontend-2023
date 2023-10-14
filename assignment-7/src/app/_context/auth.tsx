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
import * as authClient from '../_generated/auth/auth'
import { isSSR } from '../_utils/isSSR'

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
    return isSSR() ? false : Boolean(window.localStorage.getItem(TOKEN_KEY))
  })

  const { replace } = useRouter()
  const pathname = usePathname()

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authClient.login({ email, password })
      const token = response.data?.accessToken
      if (token) {
        window.localStorage.setItem(TOKEN_KEY, token)
        client.setToken(token)
        setIsLogin(true)
      }
    } catch (error) {
      // Handle error
      throw new Error('Incorrect email or password')
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
