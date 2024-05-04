const { getHistoricalBitcoinPrice } = require('../../../lib/biz/hbp-extractor');

const assert = require('node:assert');
const test = require('node:test');

console.log("\nTest module: HBP Extractor");

test("should return list of historical bitcoin prices", async (t) => {
    try {
      const data = await getHistoricalBitcoinPrice('2024-04-25', '2024-04-29', 'USD');
      assert.ok(Array.isArray(data));
      assert.ok(data.length > 0);
      assert.ok(data.every((item) => typeof item === "object"));
    } catch (err) {
      console.error(err);
    }
  });

test('should fetch historical bitcoin prices', async () => {
  try {
    const response = await getHistoricalBitcoinPrice('2024-04-25', '2024-04-29', 'USD');
    assert.deepEqual(response[0].price, '64486.6377');
    assert.deepEqual(response[0].high, true);
  } catch(err) {
    assert.fail(err instanceof Error);
  }
});