import {
  BookResponse,
  BooksResponse,
  CreateBookRequest,
  EditBookRequest,
  LoginRequest,
  LoginResponse,
  TopicsResponse,
} from '../_types/schema'
import fetcher from '../_utils/fetcher'

export const TOKEN_KEY = 'df-token'

const BASE_URL = 'https://develop-api.bookstore.dwarvesf.com/api/v1'

class Client {
  headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  privateHeaders: HeadersInit = {
    ...this.headers,
    Authorization:
      typeof window === 'undefined'
        ? ''
        : `Bearer ${window.localStorage.getItem(TOKEN_KEY)}`,
  }

  setToken(accessToken: string) {
    this.privateHeaders = {
      ...this.privateHeaders,
      Authorization: `Bearer ${accessToken}`,
    }
  }

  // eslint-disable-next-line class-methods-use-this
  login(params: LoginRequest) {
    return fetcher<LoginResponse>(`${BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(params),
    })
  }

  getBooks() {
    return fetcher<BooksResponse>(`${BASE_URL}/books`, {
      headers: this.privateHeaders,
    })
  }

  getBook(bookId: number) {
    return fetcher<BookResponse>(`${BASE_URL}/books/${bookId}`, {
      headers: this.privateHeaders,
    })
  }

  addBook(params: CreateBookRequest) {
    return fetcher<BooksResponse>(`${BASE_URL}/books`, {
      method: 'POST',
      headers: this.privateHeaders,
      body: JSON.stringify(params),
    })
  }

  editBook(params: EditBookRequest) {
    const { id, ...rest } = params
    return fetcher<BooksResponse>(`${BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: this.privateHeaders,
      body: JSON.stringify(rest),
    })
  }

  deleteBook(bookId: number) {
    return fetcher<BooksResponse>(`${BASE_URL}/books/${bookId}`, {
      method: 'DELETE',
      headers: this.privateHeaders,
      body: JSON.stringify(bookId),
    })
  }

  getTopics() {
    return fetcher<TopicsResponse>(`${BASE_URL}/topics`, {
      headers: this.privateHeaders,
    })
  }
}

const client = new Client()

export { client }
