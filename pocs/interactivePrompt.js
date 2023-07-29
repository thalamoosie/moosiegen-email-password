#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
import Table from "cli-table";
import { getNiceAffirmation } from "../components/nice-things-api/niceThings.js";

// import { boolean } from "yargs";

// let userName;
const pver = `v1.0.0`;

const passphraseOptions = {};
const userObject = {};
const passwordOptions = {};

// This isn't my moose. This will be rectified later.
const asciiMoose = String.raw`
/\/\__/\_/\      /\_/\__/\/\   ______________  
\          \____/          /  |              |
 '----_____       ____----'   |  Account     |
           | x 0  \___        |  Stuff       | 
           |           \      |  Gemerator   |
         _/     /\     |      |  ${pver}      |
        /o)  (o/l \    |      |______________|
        \=====//   \__/
`;

const mainMenuChoices = [
  "1. Email Addresses",
  "2. Random Passwords",
  "3. Random Passphrases",
  "4. Tell me something nice (please)",
  "5. Help",
];

const booleanChoices = ['Y', 'N'];

const introMsg = "m00seg3n";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const generateFiglet = (text) => {
  return new Promise((resolve, reject) => {
    figlet(text, { font: "Small" }, (err, data) => {
      resolve(data);
    });
  });
};

const introScreen = async function () {
  try {

    const figletData = await generateFiglet(introMsg);

    console.log(gradient.pastel.multiline(figletData));
    console.log(gradient.pastel.multiline(asciiMoose));
    console.log(chalk.cyan(`\n Account Stuff Generator CLI Tool ${pver} `));

    await sleep();

  } catch (err) {
    console.error(`Error generating screen: ${err}`);
  }
};

const mainMenu = async function () {
  const answer = await inquirer.prompt({
    name: "main_menu_selection",
    type: "list",
    message: "Please select from the options below: \n",
    choices: mainMenuChoices,
  });

  switch (answer.main_menu_selection) {
    case mainMenuChoices[0]:
      handleEmailSelection();
      break;
    case mainMenuChoices[1]:
      handlePasswordSelection();
      break;
    case mainMenuChoices[2]:
      handlePassphraseSelection();
      break;
    case mainMenuChoices[3]:
      handleNiceAPI();
      break;
    default:
      console.log(`Invalid choice. Please try again.`);
      mainMenu();
      break;
  }
};

// Validation Functions for Inquirer Prompts
const validateEmail = async function (email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return email.match(emailRegex) === null
    ? `Not a valid email address. Please try again.`
    : true;
};

const validateQty = async function (qty) {
  return qty > 1 && qty < 100
    ? true
    : `Invalid quantity, please enter an integer between 1 and 100`;
};

const handleEmailSelection = async function () {
  console.clear();

  console.log(`
  Generates ${chalk.italic(
    `n`
  )} email addresses based on a current email address.
  Format: ${chalk.bgGreen(
    "<your_email>+<optional identifier><date><number>@<yourdomain.com>"
  )}\n`);
  const email = await inquirer.prompt({
    name: "email_prompt",
    type: "input",
    message: "Enter your email address: ",
    validate: validateEmail,
  });
  userObject.emailAddress = email.email_prompt;

  const emailQty = await inquirer.prompt({
    name: "email_qty",
    type: "input",
    message: "Quantity of emails to generate (1-1000):",
    validate: validateQty,
  });

  userObject.emailQuantity = emailQty.email_qty;

  const includePassword = await inquirer.prompt({
    name: "bool_pw",
    type: "list",
    message: "Include a test password?",
    choices: booleanChoices
  });

  userObject.inclOptionalPassword = includePassword.bool_pw;

  if (includePassword.bool_pw === "Y") {
    const optionalPassword = await inquirer.prompt({
      name: "optional_pw",
      type: "input",
      message: "Enter desired test password (Default: Testing1234!):",
      default() {
        return "Testing1234!";
      },
    });
    userObject.testingPassword = optionalPassword.optional_pw;
  }

  const table = new Table({
    head: ["Options", "Values"],
    colWidths: [25, 25],
  });

  table.push(
    ["Email Address", userObject.emailAddress],
    ["Email QTY", userObject.emailQuantity],
    ["Include Passwords?", userObject.inclOptionalPassword]
  );

  if (userObject.inclOptionalPassword === "Y")
    table.push(["Password (Optional)", userObject?.testingPassword]);

  console.log(table.toString());
  const spinner = createSpinner(`Calculating`).start();
  await sleep();
  spinner.success();
};

const handlePasswordSelection = async function () {
  // handle option 2


  console.log("Random Password Gen Invocation!");
  console.log("");
  const passwordLength = await inquirer.prompt({
    name: "password_length",
    type: "input",
    messasge: "Password length (5-50):",
  });

  passwordOptions.passwordLength = passwordLength.password_length;

  console.log("Include any of the following optional parameters:")

  const inclUppercase = await inquirer.prompt({
    name: "inc_upper",
    type: "list",
    messasge: "Uppercase?",
    choices: booleanChoices
  });

  passwordOptions.inclUpper = inclUppercase.inc_upper;

  const inclNumber = await inquirer.prompt({
    name: "inc_number",
    type: "list",
    message: "Number?",
    choices: booleanChoices
  });

  passwordOptions.inclNumber = inclNumber.inc_number;

  const inclSymbol = await inquirer.prompt({
    name: "inc_symbol",
    type: "list",
    messasge: "Symbols?",
    choices: booleanChoices
  });

  passwordOptions.inclSymbol = inclSymbol.inc_symbol;
  console.log(passwordOptions);

};

const handlePassphraseSelection = async function () {
  // handle option 3
  const passphraseLength = await inquirer.prompt({
    name: "passphrase_length",
    type: "input",
    message:"Enter passphrase length (in words):"
  });

  passphraseOptions.passphraseLength = passphraseLength.passphrase_length;

  const passphraseLeetSpeak = await inquirer.prompt({
    name: "leet_speak",
    type: "list",
    message: "Swap some characters for symbols?",
    choices: booleanChoices
  })

  passphraseOptions.leetSpeak = passphraseLeetSpeak.leet_speak;

  const delimiterChoice = await inquirer.prompt({
    name: "delimiter_choice",
    type: "list",
    message: "Choose a delimiter (default: '-'):",
    choices: ['None', ':', '.', '_', '\\', '*', '%', '+', '=', '/', '#']

  })
  passphraseOptions.delimiter = delimiterChoice.delimiter_choice;

  const capitalizeRandomWord = await inquirer.prompt({
    name: "cap_word",
    type: "list",
    message: "Capitalize a random word?",
    choices: booleanChoices
  })

  passphraseOptions.capitalizeWord = capitalizeRandomWord.cap_word;

  console.log(passphraseOptions);


};

const handleNiceAPI = async function () {
  const apiURL = 'https://www.affirmations.dev/'
  console.log("Everyone can use a little well wishing, eh?\n")
  const { affirmation } = await getNiceAffirmation(apiURL);
  
  sleep();
  console.log(affirmation)
  // handle option 4
};

await introScreen();
await mainMenu();
