// custom-instance.ts

import Axios, { AxiosRequestConfig } from 'axios'
import { isSSR } from '../_utils/isSSR'
import { TOKEN_KEY } from './api'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const AXIOS_INSTANCE = Axios.create({ baseURL: BASE_URL }) // use your own URL here or environment variable

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source()
  const token = isSSR() ? undefined : localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }
  return promise
}
