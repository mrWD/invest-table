/**
 * A very small App Store Connect API client.
 *
 * Everything TestFlight needs — checking the app record, uploading state, beta groups,
 * review submission — is a handful of REST calls, so this is a script rather than a
 * dependency. The credentials never appear in it: the private key stays in
 * `~/.appstoreconnect/private_keys/AuthKey_<KEYID>.p8`, where `altool` also expects it,
 * and the issuer sits beside it in `~/.appstoreconnect/issuer_id`.
 *
 *   node scripts/asc.mjs GET /v1/apps
 *   node scripts/asc.mjs GET '/v1/apps?filter[bundleId]=com.mrwd.investtable'
 *   node scripts/asc.mjs POST /v1/betaGroups '{"data":{...}}'
 */
import { createPrivateKey, sign } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'
import { homedir } from 'node:os'

const DIR = `${homedir()}/.appstoreconnect`
const b64url = (input) => Buffer.from(input).toString('base64url')

/** The key id is the filename's own suffix — Apple names the download that way. */
async function credentials() {
  const files = await readdir(`${DIR}/private_keys`)
  const keyFile = files.find((f) => /^AuthKey_.+\.p8$/.test(f))
  if (!keyFile) throw new Error(`no AuthKey_*.p8 in ${DIR}/private_keys`)

  return {
    keyId: keyFile.replace(/^AuthKey_|\.p8$/g, ''),
    issuerId: (await readFile(`${DIR}/issuer_id`, 'utf8')).trim(),
    privateKey: createPrivateKey(await readFile(`${DIR}/private_keys/${keyFile}`)),
  }
}

/**
 * ES256, signed as JOSE rather than DER — `ieee-p1363` is what makes the signature the
 * raw r‖s pair a JWS needs. Twenty minutes is Apple's ceiling for token lifetime.
 */
function token({ keyId, issuerId, privateKey }) {
  const now = Math.floor(Date.now() / 1000)
  const header = b64url(JSON.stringify({ alg: 'ES256', kid: keyId, typ: 'JWT' }))
  const payload = b64url(
    JSON.stringify({ iss: issuerId, iat: now, exp: now + 20 * 60, aud: 'appstoreconnect-v1' }),
  )
  const signature = sign('sha256', Buffer.from(`${header}.${payload}`), {
    key: privateKey,
    dsaEncoding: 'ieee-p1363',
  }).toString('base64url')

  return `${header}.${payload}.${signature}`
}

/**
 * Apple's API host is slow to connect from here — measured at 7.7 s, against undici's
 * 10 s connect timeout, so a plain fetch fails intermittently rather than reliably.
 * Retrying is the fix; the request itself is idempotent for GETs, and a POST that failed
 * to connect never reached Apple.
 */
async function request(url, init, attempts = 3) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fetch(url, { ...init, signal: AbortSignal.timeout(60_000) })
    } catch (error) {
      if (attempt >= attempts) throw error
    }
  }
}

export async function asc(method, path, body) {
  const jwt = token(await credentials())
  const response = await request(`https://api.appstoreconnect.apple.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${jwt}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined,
  })

  const text = await response.text()
  const json = text ? JSON.parse(text) : null
  if (!response.ok) {
    const detail = json?.errors?.map((e) => `${e.title}: ${e.detail}`).join('\n') ?? text
    throw new Error(`${response.status} ${response.statusText}\n${detail}`)
  }
  return json
}

// Run directly, or import `asc` from a longer script.
if (import.meta.url === `file://${process.argv[1]}`) {
  const [, , method = 'GET', path, body] = process.argv
  if (!path) throw new Error('usage: node scripts/asc.mjs <METHOD> <path> [json body]')
  console.log(JSON.stringify(await asc(method, path, body), null, 2))
}
