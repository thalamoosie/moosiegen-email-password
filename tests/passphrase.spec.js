import { assert, expect } from "chai";

import generatePassphrase from "../components/password-generator/passphraseGenerator.js";

// Passphrase Generator Tests

describe("Passphrase Generator: Tests generatePassphrase function - Positive Tests", function () {
  it("Creates a passphrase of the desired length", function () {
    const res = generatePassphrase(8).split("-");
    assert.equal(res.length, 8);
  });

  it("Returns type of: String", function () {
    const res = generatePassphrase(8);
    assert.typeOf(res, "string");
  });

  it("Uses the delimiter passed in function parameters", function () {
    const res = generatePassphrase(8, ":", false, false);
    const matches = res.match(/[^a-zA-Z0-9_]/g);
    assert.lengthOf(matches, 7);
    assert.equal(matches[0], ":");
  });

  it("capitalizes one word in the phrase if capitalize = true", function () {
    const res = generatePassphrase(8, ".", false, true).split(".");
    const checkUppercase = res.some((str) => str === str.toUpperCase());
    assert.equal(checkUppercase, true);
  });
  it("swaps in other characters for a, s, e, t, i, o", function () {
    const res = generatePassphrase(8, ":", true, false);
    const match = /[4@5371!0\$]/g.test(res);
    assert.isTrue(match);
  });
});
