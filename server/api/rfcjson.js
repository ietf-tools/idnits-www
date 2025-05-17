const RFCNUM_RE = /^[0-9]+$/

export default defineEventHandler(async (event) => {
  assertMethod(event, 'POST')
  const body = await readBody(event)

  if (!body || !body.rfc || typeof body.rfc !== 'string') {
    throw new Error('Missing rfc field')
  }
  const rfc = body.rfc.trim()

  if (!RFCNUM_RE.test(rfc)) {
    throw new Error('Invalid RFC number')
  }

  return sendProxy(event, `https://www.rfc-editor.org/rfc/rfc${rfc}.json`, {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'idnits-www'
    }
  })
})
