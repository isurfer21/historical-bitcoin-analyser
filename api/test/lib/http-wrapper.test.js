const HttpWrapper = require("../../lib/http-wrapper");

const assert = require("assert");
const test = require("node:test");

console.log("\nTest module: HTTP Wrapper");

test("GET request with valid URL", async (t) => {
  try {
    const response = await HttpWrapper.get("http://localhost:8080/mock/api.coindesk.com/v1/bpi/historical/close.json");
    assert.deepStrictEqual(response.bpi["2024-03-25"], 70668.1481);
  } catch (err) {
    console.error(err);
  }
});

test("GET request with invalid URL", async (t) => {
  try {
    const response = await HttpWrapper.get("http://localhost:8080/mock/api.coindesk.com/v1/bpi/historical/open.json");
    assert.fail("Expected an error to be thrown");
  } catch (err) {
    assert.ok(err instanceof Error);
  }
});

test("POST request with valid URL and data", async (t) => {
  try {
    const response = await HttpWrapper.post("https://jsonplaceholder.typicode.com/posts", {
      title: "foo",
      body: "bar",
      userId: 1,
    });
    assert.ok(response.id);
  } catch (err) {
    console.error(err);
  }
});

test("POST request with invalid URL", async (t) => {
  try {
    const response = await HttpWrapper.post("https://jsonplaceholder.typicode.com/posts99999", {
      title: "foo",
      body: "bar",
      userId: 1,
    });
    assert.fail("Expected an error to be thrown");
  } catch (err) {
    assert.ok(err instanceof Error);
  }
});
