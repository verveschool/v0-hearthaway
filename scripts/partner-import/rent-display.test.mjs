import test from 'node:test'
import assert from 'node:assert/strict'
import { sourceRentDisplay } from '../../app/accommodation/presentation.ts'

test('published prices retain source precision, ISO minor units and billing period', () => {
  for (const period of ['week', 'month', 'night', 'term'])
    assert.deepEqual(sourceRentDisplay({ amountMinor: 14350, currency: 'GBP', period }), { amount: 143.5, label: '£143.5/' + period })
  assert.equal(sourceRentDisplay({ amountMinor: 1500, currency: 'JPY', period: 'night' }).amount, 1500)
  assert.equal(sourceRentDisplay({ amountMinor: -1, currency: 'GBP', period: 'week' }), null)
})
