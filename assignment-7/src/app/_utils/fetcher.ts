export type FetcherError = Error & { response: Response }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init)
  if (res.ok) {
    return res.json() as Promise<JSON>
  }
  const error = new Error(res.statusText) as FetcherError
  error.response = res

  return Promise.reject(error)
}
