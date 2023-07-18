#! /usr/bin/env node

"use strict";
import generatePassword from "./components/password-generator/passwordGenerator.js";
import generatePassphrase from "./components/password-generator/passphraseGenerator.js";
import generateEmails from "./components/email-generator/emailGenerator.js";

console.log("main");

generatePassphrase(2, ":", true, true);
generatePassword(2, true, true, true);
generateEmails("test");
