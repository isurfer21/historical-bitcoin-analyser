const { fetchHistoricalBitcoinData } = require('../../../lib/fin/historical-prices');

const assert = require('node:assert');
const test = require('node:test');

console.log("\nTest module: Historical Prices");

test('should fetch historical bitcoin data', async () => {
  try {
    const response = await fetchHistoricalBitcoinData('2024-04-25', '2024-04-29');
    assert.deepEqual(response.statusCode, 200);
    assert.deepEqual(response.message, 'OK');
  } catch(err) {
    assert.fail(err instanceof Error);
  }
});