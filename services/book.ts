import type { Book, PagedBooks } from '~/types/book'

export const getBookById = async (bookId: string) => {
  return await fetchApi<Book>(`/book/${bookId}`, {
    method: 'GET',
    credentials: "include",
  })
}

export const getPagedBooks = async (page?: string, search?: string) => {
  return await fetchApi<PagedBooks>(`/book`, {
    method: 'GET',
    credentials: "include",
    params: {
      page,
      size: '8',
      searchText: search,
    },
  })
}

export const removeBook = async (bookId: string) => {
  return await fetchApi(`/book/${bookId}`, {
    method: 'DELETE',
    credentials: "include",
  })
}

export const addBook = async (book: Book) => {
  return await fetchApi(`/book`, {
    method: 'POST',
    credentials: "include",
    body: JSON.stringify(book),
  })
}

export const editBook = async (bookId: string, book: Book) => {
  return await fetchApi(`/book/${bookId}`, {
    method: 'PUT',
    credentials: "include",
    body: JSON.stringify(book),
  })
}
