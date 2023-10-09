export interface Book {
  id: number
  name: string
  author: string
  topic: Topic
}

export interface Topic {
  code: string
  name: string
  id: number
}

export interface BookResponse {
  data: Book
}

export interface Metadata {
  hasNext: boolean
  page: number
  pageSize: number
  sort: number
  totalPages: number
  totalRecords: number
}

export interface BooksResponse {
  data: Book[]
  metadata: Metadata
}

export interface EditBookRequest {
  id: number
  author: string
  name: string
  topicId: number
}

export interface CreateBookRequest {
  author: string
  name: string
  topicId: number
}

export interface ErrorDetail {
  error: string
  field: string
}

export interface ErrorResponse {
  code: string
  error: string
  errors: ErrorDetail
  traceId: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface Auth {
  accessToken: string
  email: string
  id: number
}

export interface LoginResponse {
  data: Auth
}

//! ignore Me + MeResponse (dont need at assignment-6)

export interface Message {
  message: string
}

export interface MessageResponse {
  data: Message
}

export interface SignupRequest {
  avatar: string
  email: string
  fullName: string
  password: string
  minLength: 8
}

export interface TopicsResponse {
  data: Topic[]
}

export interface UpdateBookRequest {
  author: string
  name: string
  topicId: number
}

//! ignore UpdatePasswordRequest + UpdateUserRequest + User + UserResponse (dont need at assignment-6)
