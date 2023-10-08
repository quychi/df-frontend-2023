type Page<
  URLParams extends string | null = null,
  TitleParams extends string | null = null,
> = {
  getUrl: (params: {
    [param in URLParams extends string ? URLParams : never]: string
  }) => string
  pathname: string
  getTitle: (params: {
    [param in TitleParams extends string ? TitleParams : never]: string
  }) => string
}

const titleSuffix = 'Book store'
const makeTitle = (...words: string[]): string => words.join(' | ')

export const PAGE = {
  BookList: {
    getUrl: () => '/books',
    pathname: '/books',
    getTitle: () => makeTitle('Book list', titleSuffix),
  } as Page,
  BookDetail: {
    getUrl: (params) => `/book/${params.bookId}`,
    pathname: '/book/[bookId]',
    getTitle: () => makeTitle('Book detail', titleSuffix),
  } as Page<'bookId'>,
}
