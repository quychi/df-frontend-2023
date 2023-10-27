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
import { toast } from '../_components/Toast'
import { ACTION_FAILED, INCORRECT_EMAIL_PASSWORD } from '../_consts/messages'

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
      toast.error({
        title: ACTION_FAILED,
        message: INCORRECT_EMAIL_PASSWORD,
      })
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

  console.log('** from auth contextS provide - pathname:', pathname)

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
