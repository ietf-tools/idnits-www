const ALLOWED_DOMAINS = ['ietf.org', 'rfc-editor.org', 'github.com', 'githubusercontent.com', 'github.io', 'gitlab.com', 'gitlab.io', 'codeberg.page', 'httpwg.org', 'quicwg.org']

export default defineEventHandler(async (event) => {
  assertMethod(event, 'POST')
  const body = await readBody(event)

  if (!body || !body.url || typeof body.url !== 'string') {
    throw new Error('Missing url field')
  }

  const parsedUrl = new URL(body.url)
  if (!(parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:')) {
    throw new Error('Invalid URL protocol')
  }

  if (!(parsedUrl.pathname.endsWith('.xml') || parsedUrl.pathname.endsWith('.txt'))) {
    throw new Error('Unsupported file extension')
  }

  let hostname = parsedUrl.hostname
  const hostnameParts = hostname.split('.')
  if (hostnameParts.length > 1) {
    hostname = `${hostnameParts.at(-2)}.${hostnameParts.at(-1)}`
  }
  if (!ALLOWED_DOMAINS.includes(hostname)) {
    throw new Error('Domain is not allowlisted. Use the local idnits CLI instead to fetch from any website.')
  }

  return sendProxy(event, parsedUrl.toString(), {
    headers: {
      'User-Agent': 'idnits-www'
    }
  })
})
