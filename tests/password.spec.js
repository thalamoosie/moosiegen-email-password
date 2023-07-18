import { assert, expect } from "chai";
import generatePassword from "../components/password-generator/passwordGenerator.js";
import { asciiSymbols } from "../utils/dict.js";

// Password Tests
/*
1. Password created is of length specified - try with small to large lengths
1a. what happens if we give it a REEELY BEEEGG number
2. Password contains Numbers if inclNumber is True
3. Password contains Uppercase Letters if inclUpper is True
4. Password contains Symbosl if inclSymbol is True
5. Password contains all the above if all 3 parameter are true.
*/

const specialChars = [...asciiSymbols.symbolChars].map((char) =>
  String.fromCharCode(char)
);
const uppercaseChars = [...asciiSymbols.upperChars].map((char) =>
  String.fromCharCode(char)
);
console.log(specialChars, uppercaseChars);

describe("Password Generator: Tests generatePassword function - Positive Tests", function () {
  it("Creates a password of a given n length", function () {
    const res = generatePassword(8, false, false, false);
    console.log(`Password Generated: ${res}`);
    expect(res).to.have.lengthOf(8);
  });
  it("Generates a 5 character password by default if not given a length", function () {
    const res = generatePassword(undefined, false, false, false);
    console.log(`Password Generated: ${res}`);
    expect(res).to.have.lengthOf(5);
  });
  it("returns type of string", function () {
    const res = generatePassword(8, false, true, false);
    console.log(`Password Generated: ${res}`);
    assert.typeOf(res, "string", "Password is a string");
  });
  it("includes at least 1 number if inclNumber = true", function () {
    const res = generatePassword(8, false, true, false);
    console.log(`Password Generated: ${res}`);
    const num = /\d/.test(res);
    assert.isTrue(num, "Password should include at least 1 number");
  });
  it("includes at least 1 special character if inclSymbol = true", function () {
    const res = generatePassword(8, false, false, true);
    console.log(`Password Generated: ${res}`);
    expect(res).to.include.oneOf(specialChars);
  });
  it("includes at least 1 upper case character if inclUpper = true", function () {
    const res = generatePassword(8, true, false, true);
    console.log(`Password Generated: ${res}`);
    expect(res).to.include.oneOf(
      uppercaseChars,
      "Includes at least 1 upperchase char"
    );
  });
  it("Includes all special options if all boolean params are true", function () {
    const res = generatePassword(10, true, true, true);
    console.log(`Password Generated: ${res}`);
    const num = /\d/.test(res);
    assert.isTrue(num);
    expect(res)
      .to.include.oneOf(specialChars)
      .and.to.include.oneOf(uppercaseChars);
  });
});
