const HttpWrapper = require("../lib/http-wrapper");

const assert = require("node:assert");
const test = require("node:test");

const host = "http://localhost:8080/api";

console.log("\nTest module: API");

test("GET request to root path", async (t) => {
  try {
    const response = await HttpWrapper.get(`${host}/`);
    assert.strictEqual(response.message, "API service is active!");
  } catch (err) {
    assert.fail(err instanceof Error);
  }
});

test("GET request to fetch supported-currencies", async (t) => {
  try {
    const response = await HttpWrapper.get(`${host}/supported-currencies`);
    assert.strictEqual(response[0].currency, 'AED');
  } catch (err) {
    assert.fail(err instanceof Error);
  }
});

test("GET request to fetch historical-prices", async (t) => {
  try {
    const response = await HttpWrapper.get(`${host}/historical-prices?startDate=2024-04-25&endDate=2024-04-29&targetCurrency=USD`);
    assert.strictEqual(response.prices[0].price, "64486.6377");
  } catch (err) {
    assert.fail(err instanceof Error);
  }
});
