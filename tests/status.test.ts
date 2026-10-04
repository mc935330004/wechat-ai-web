import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getStatus } from '../src/api/status.ts'

test('status contract accepts OFF and rejects incompatible or failed responses', async () => {
  const previousFetch = globalThis.fetch
  try {
    const good = { appName: 'wechat-ai', status: 'UP', effectiveMode: 'OFF', schemaVersion: 1 }
    globalThis.fetch = async () => new Response(JSON.stringify(good))
    assert.deepEqual(await getStatus(), good)
    globalThis.fetch = async () => new Response(JSON.stringify({ ...good, schemaVersion: 2 }))
    await assert.rejects(getStatus(), /接口版本/)
    globalThis.fetch = async () => new Response('unavailable', { status: 503 })
    await assert.rejects(getStatus(), /503/)
  } finally {
    globalThis.fetch = previousFetch
  }
})
