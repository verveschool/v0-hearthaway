import test from 'node:test'
import assert from 'node:assert/strict'
import { acceptPage } from './scraye-portfolio.mjs'

test('moving totals and repeated identities never advance the cursor', () => {
  const url = 'https://agents.scraye.com/listings/abc'
  const seen = new Map()
  acceptPage({start: 1, end: 1, total: 2, urls: [url]}, 2, seen)
  assert.throws(() => acceptPage({start: 2, end: 2, total: 3, urls: [url]}, 2, seen), /count/)
  assert.throws(() => acceptPage({start: 2, end: 2, total: 2, urls: [url+'?ref=another']}, 2, seen), /Duplicate/)
  assert.equal(seen.size, 1)
})
