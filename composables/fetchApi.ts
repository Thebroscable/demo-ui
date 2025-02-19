import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack'
import type { FetchApiResponse } from '~/types/api'

export const fetchApi = async <T>(
  url: NitroFetchRequest,
  options?: NitroFetchOptions<NitroFetchRequest>,
): Promise<FetchApiResponse<T>> => {
  const config = useRuntimeConfig()

  try {
    const response = await $fetch<T>(url, {
      ...options,
      baseURL: config.public.API_URL,
    })

    return {
      status: 'success',
      data: response,
    }
  }
  catch (err: any) {
    return {
      status: 'error',
      error: err.response._data || err.message || 'Unknown error',
    }
  }
}
