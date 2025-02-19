export const requestCount = async () => {
  return await fetchApi(`/request-count`, {
    credentials: "include",
    method: 'GET',
  })
}
