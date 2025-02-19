export type Book = {
  id: string
  title: string
  author: string
  publisher: string
  isbn?: string
  pages?: number
  releaseDate?: string
  language?: string
  description?: string
}

export type PagedBooks = {
  content: Book[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}
