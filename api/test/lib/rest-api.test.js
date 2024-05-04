const HttpWrapper = require("../../lib/http-wrapper");

const assert = require("node:assert");
const test = require("node:test");

const host = "http://localhost:8080/api";

console.log("\nTest module: REST API");

test("GET request to root path", async (t) => {
  try {
    const response = await HttpWrapper.get(`${host}/`);
    assert.strictEqual(response.message, "API service is active!");
  } catch (err) {
    assert.fail(err instanceof Error);
  }
});

test("GET request to non-existent path", async (t) => {
  try {
    const response = await HttpWrapper.get(`${host}/non-existent`);
    assert.strictEqual(response.data, "Not found");
  } catch (err) {
    assert.ok(err instanceof Error);
  }
});

test("POST request to non-existent path", async (t) => {
  try {
    const response = await HttpWrapper.post(`${host}/non-existent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    assert.strictEqual(response.data, "Not found");
  } catch (err) {
    assert.ok(err instanceof Error);
  }
});
