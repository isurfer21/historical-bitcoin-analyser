const CliParser = require("../../lib/cli-parser");

const assert = require("node:assert");
const test = require("node:test");

console.log("\nTest module: CLI Parser");

test("Empty argv", (t) => {
  assert.deepStrictEqual(CliParser.parse([]), { _: [] });
});

test("Simple argument", (t) => {
  assert.deepStrictEqual(CliParser.parse(["node", "script.js", "hello"]), { _: ["hello"] });
});

test("Short option with value", (t) => {
  assert.deepStrictEqual(CliParser.parse(["node", "script.js", "-a=value"]), { a: "value", _: [] });
});

test("Long option with value", (t) => {
  assert.deepStrictEqual(CliParser.parse(["node", "script.js", "--long_option=value"]), {
    _: [],
    long_option: "value",
  });
});

test("Short option without value", (t) => {
  assert.deepStrictEqual(CliParser.parse(["node", "script.js", "-b"]), { b: true, _: [] });
});

test("Long option without value", (t) => {
  assert.deepStrictEqual(CliParser.parse(["node", "script.js", "--long_option"]), { long_option: true, _: [] });
});

test("Multiple arguments", (t) => {
  assert.deepStrictEqual(CliParser.parse(["node", "script.js", "arg1", "arg2", "-c=value"]), {
    c: "value",
    _: ["arg1", "arg2"],
  });
});

test("Mixed arguments", (t) => {
  assert.deepStrictEqual(CliParser.parse(["node", "script.js", "-a=value", "arg1", "--long_option=value2", "arg2"]), {
    a: "value",
    long_option: "value2",
    _: ["arg1", "arg2"],
  });
});
