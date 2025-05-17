export default defineEventHandler(async (event) => {
  assertMethod(event, 'GET')

  return sendProxy(event, 'https://datatracker.ietf.org/doc/downref/', {
    headers: {
      'User-Agent': 'idnits-www'
    }
  })
})
