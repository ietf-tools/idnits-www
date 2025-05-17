const DOCNAME_RE = /^[a-z0-9-]+$/

export default defineEventHandler(async (event) => {
  assertMethod(event, 'POST')
  const body = await readBody(event)

  if (!body || !body.name || typeof body.name !== 'string') {
    throw new Error('Missing name field')
  }
  const name = body.name.trim().toLowerCase()

  if (!DOCNAME_RE.test(name)) {
    throw new Error('Invalid doc name')
  }

  return sendProxy(event, `https://datatracker.ietf.org/api/v1/doc/document/${name}/`, {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'idnits-www'
    }
  })
})
