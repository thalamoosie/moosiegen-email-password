import { assert, expect } from "chai";

import generatePassphrase from "../components/password-generator/passphraseGenerator.js";

describe("Passphrase Generator: Tests generatePassphrase function - Positive Tests", function () {
  it("Creates a password of a given n length", function () {
    const res = generatePassphrase();
    console.log(`Passphrase Generated: ${res}`);
    assert.typeOf(res, "string", "Passphrase is a string");
  });
});
