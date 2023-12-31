"use strict";

import {
  createRange,
  randomArrIndex,
  randomNumber,
} from "../../utils/utils.js";
import { asciiSymbols } from "../../utils/dict.js";

/**
 *
 * @param charLen Length of desired password in chars
 * @param inclUpper Includes Uppercase
 * @param inclNumber Includes Numbers
 * @param inclSymbol Includes Symbols
 */
const generatePassword = function (
  charLen = 5,
  inclUpper,
  inclNumber,
  inclSymbol
) {
  let chars = [];
  let charPool = [...asciiSymbols.lowerChars];
  const asciiPass = [];
  const maxLength = 50;
  const minLength = 5;

  if (charLen < minLength || charLen > maxLength) {
    throw new Error("Password length must be between 5 and 50 chars");
  }
  if (inclNumber) {
    const nums = asciiSymbols.numberChars;
    const randIndex = randomArrIndex(nums);
    chars.push(nums[randIndex]);
    charPool.push(...nums);
  }
  if (inclSymbol) {
    const sym = asciiSymbols.symbolChars;
    const randIndex = randomArrIndex(sym);
    chars.push(sym[randIndex]);
    charPool.push(...sym);
  }
  if (inclUpper) {
    const upper = asciiSymbols.upperChars;
    const randIndex = randomArrIndex(upper);
    chars.push(upper[randIndex]);
    charPool.push(...upper);
  }
  // Make a shallow copy of the password so far to keep track of required chars
  const requiredChars = [...chars];
  // Calculate remainder of length needed and sort randomly
  const remainder = charLen - requiredChars.length;
  chars.sort(() => Math.random() - 0.5);
  // Push random characters from character pool to Ascii holding array:
  for (let i = 0; i < remainder; i++) {
    const randIndex = randomArrIndex(charPool);
    const randChar = charPool[randIndex];
    asciiPass.push(randChar);
    // console.log(
    //   `Random character added to password: ${randChar} : ${String.fromCharCode(
    //     randChar
    //   )}`
    // );
  }
  // Sort array n times based on range of desired length of pw
  for (let i = 0; i <= randomNumber(1, charLen); i++) {
    asciiPass.sort(() => Math.random() - 0.5);
  }
  // console.log("Required", requiredChars);
  // console.log("AsciiPass", asciiPass);

  if (!asciiPass.every((c) => requiredChars.includes(c))) {
    for (let i = 0; i < requiredChars.length; i++) {
      if (!asciiPass.includes(requiredChars[i])) {
        const randIndex = randomArrIndex(asciiPass);
        asciiPass.push(requiredChars[i]);
      }
    }
  }
  // console.log("Amended Asciipass", asciiPass);
  const finalPass = [];
  asciiPass.forEach((e) => {
    finalPass.push(String.fromCharCode(e));
  });
  const password = finalPass.join("");
  // console.log("password: ", password);
  return password;
};

export default generatePassword;
