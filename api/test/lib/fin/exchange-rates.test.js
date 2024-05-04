const { getRate, fetchRates } = require('../../../lib/fin/exchange-rates');

const assert = require('node:assert');
const test = require('node:test');

console.log("\nTest module: Exchange Rates");

test('should fetch rates from API', async () => {
  try {
    const rates = await fetchRates();
    assert.deepEqual(rates.USD.rate, 1);
    assert.deepEqual(rates.INR.rate, 83.3802);
  } catch(err) {
    assert.fail(err instanceof Error);
  }
});

test('should cache rates', async () => {
  try {
    const rate = await getRate('EUR');
    assert.ok(rate === 0.92865);
  } catch(err) {
    assert.fail(err instanceof Error);
  }
});