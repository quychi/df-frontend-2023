import { isSSR } from '../_utils/isSSR'

export const TOKEN_KEY = 'df-token'

class Client {
  headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  privateHeaders: HeadersInit = {
    ...this.headers,
    Authorization: isSSR()
      ? ''
      : `Bearer ${window.localStorage.getItem(TOKEN_KEY)}`,
  }

  setToken(accessToken: string) {
    this.privateHeaders = {
      ...this.privateHeaders,
      Authorization: `Bearer ${accessToken}`,
    }
  }
}

const client = new Client()

export { client }
