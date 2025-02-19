export const requestCount = async () => {
  return await fetchApi(`/request-count`, {
    method: 'GET',
  })
}
