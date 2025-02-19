export type FetchApiResponse<T> =
  | {
    status: 'success'
    data: T
  }
  | {
    status: 'error'
    error: string
  }
