#! /usr/bin/env node

"use strict";
import generatePassword from "./components/password-generator/passwordGenerator.js";
import generatePassphrase from "./components/password-generator/passphraseGenerator.js";
import generateEmails from "./components/email-generator/emailGenerator.js";

console.log("main");

generatePassphrase(8, ":", true, true);
generatePassword(8, true, true, true);
generateEmails("test");
