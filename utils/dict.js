"use strict";

import { createRange } from "./utils.js";

export const asciiSymbols = {
  symbolChars: createRange(33, 47)
    .concat(createRange(58, 64))
    .concat(createRange(91, 96)),
  upperChars: createRange(65, 90),
  lowerChars: createRange(97, 122),
  numberChars: createRange(48, 57),
};

export const emailHelp = ` 
Generates email addresses based on a pre-existing email address, allowing the user to receive emails for testing purposes by appending a date, number and optional designator to the local-part.

${chalk.bold(
  "Format:"
)} <local-part> + <designator>MM-DD-YY-<increment> @ <domain>
`;

export const psaswordHelp = `
abcd
A random password generator, which takes arguments for optional features. Length restrictions 
`;
export const passphraseHelp = `
abcd
`;
