const { getSupportedCurrencies } = require("../../../lib/fin/currencies-list");

const assert = require("node:assert");
const test = require("node:test");

console.log("\nTest module: Currencies List");

test("GET request to supported currencies API", async (t) => {
  try {
    const data = await getSupportedCurrencies();
    assert.ok(Array.isArray(data));
    assert.ok(data.length > 0);
    assert.ok(data.every((item) => typeof item === "object"));
  } catch (err) {
    console.error(err);
  }
});
