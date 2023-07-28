#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
import Table from "cli-table";

let userName;
const pver = `v1.0.0`;

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
  const userObject = {};
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
    choices: ["Y", "N"],
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
  console.log("Password Gen!");
};

const handlePassphraseSelection = async function () {
  // handle option 3
};

const handleNiceAPI = async function () {
  // handle option 4
};

await introScreen();
await mainMenu();
