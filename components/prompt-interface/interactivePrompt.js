#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
import Table from "cli-table";
import { getNiceAffirmation } from "../nice-things-api/niceThings.js";
import { randomArrIndex, randomNumber } from "../../utils/utils.js";

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

const booleanChoices = ["Y", "N"];
const returnToMenuChoices = ["Return to Main Menu", "Give me Another!", "Exit"];

const introMsg = "m00seg3n";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const generateFiglet = (text, f) => {
  return new Promise((resolve, reject) => {
    figlet(text, { font: f }, (err, data) => {
      resolve(data);
    });
  });
};

// const makeTable = function (arr) {
//   const table = new Table({
//     head: ["Options", "Values"],
//     colWidths: [25, 25],
//   });

//   table.push(
//     ["Email Address", userObject.emailAddress],
//     ["Email QTY", userObject.emailQuantity],
//     ["Include Passwords?", userObject.inclOptionalPassword]
//   );

//   if (userObject.inclOptionalPassword === "Y")
//     table.push(["Password (Optional)", userObject?.testingPassword]);

//   console.log(table.toString());
// };

// Introduction Screen (with the big moosie)
const introScreen = async function () {
  try {
    const figletData = await generateFiglet(introMsg, "Small");

    console.log(gradient.pastel.multiline(figletData));
    console.log(gradient.pastel.multiline(asciiMoose));
    console.log(chalk.cyan(`\n Account Stuff Generator CLI Tool ${pver} `));

    await sleep();
  } catch (err) {
    console.error(`Error generating screen: ${err}`);
  }
};

// Main Menu:
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
    case mainMenuChoices[4]:
      helpScreen();
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

// Flexible function to validate input ranges
const validateQty = function (qty, min, max) {
  return qty >= min && qty <= max
    ? true
    : `Invalid quantity, please enter an integer between ${min} and ${max}`;
};

// Email Address Subroutine
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
    validate: (input) => validateQty(Number(input), 1, 1000),
  });

  userObject.emailQuantity = emailQty.email_qty;

  const includePassword = await inquirer.prompt({
    name: "bool_pw",
    type: "list",
    message: "Include a test password?",
    choices: booleanChoices,
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

// Password Subroutine
const handlePasswordSelection = async function () {
  console.log("Random Password Gen Invocation!");
  const passwordLength = await inquirer.prompt({
    name: "password_length",
    type: "input",
    message: "Password length (5-50):",
    validate: (input) => validateQty(input, 5, 50),
  });

  passwordOptions.passwordLength = passwordLength.password_length;

  console.log("Include any of the following optional parameters:");

  const inclUppercase = await inquirer.prompt({
    name: "inc_upper",
    type: "list",
    message: "Uppercase?",
    choices: booleanChoices,
  });

  passwordOptions.inclUpper = inclUppercase.inc_upper;

  const inclNumber = await inquirer.prompt({
    name: "inc_number",
    type: "list",
    message: "Number?",
    choices: booleanChoices,
  });

  passwordOptions.inclNumber = inclNumber.inc_number;

  const inclSymbol = await inquirer.prompt({
    name: "inc_symbol",
    type: "list",
    message: "Symbols?",
    choices: booleanChoices,
  });

  passwordOptions.inclSymbol = inclSymbol.inc_symbol;

  const table = new Table({
    head: ["Options", "Values"],
    colWidths: [25, 25],
  });

  table.push(
    ["Password Length", passwordOptions.passwordLength],
    ["Uppercase Chars", passwordOptions.inclUpper],
    ["Numbers", passwordOptions.inclNumber],
    ["Symbols", passwordOptions.inclSymbol]
  );

  console.log(table.toString());
};

// Passphrase Subroutine
const handlePassphraseSelection = async function () {
  const passphraseLength = await inquirer.prompt({
    name: "passphrase_length",
    type: "input",
    message: "Enter passphrase length (max: 32):",
    validate: (input) => validateQty(Number(input), 3, 32),
  });

  passphraseOptions.passphraseLength = passphraseLength.passphrase_length;

  const passphraseLeetSpeak = await inquirer.prompt({
    name: "leet_speak",
    type: "list",
    message: "Swap some characters for symbols?",
    choices: booleanChoices,
  });

  passphraseOptions.leetSpeak = passphraseLeetSpeak.leet_speak;

  const delimiterChoice = await inquirer.prompt({
    name: "delimiter_choice",
    type: "list",
    message: "Choose a delimiter (default: '-'):",
    choices: ["None", ":", ".", "_", "\\", "*", "%", "+", "=", "/", "#"],
  });
  passphraseOptions.delimiter = delimiterChoice.delimiter_choice;

  const capitalizeRandomWord = await inquirer.prompt({
    name: "cap_word",
    type: "list",
    message: "Capitalize a random word?",
    choices: booleanChoices,
  });

  passphraseOptions.capitalizeWord = capitalizeRandomWord.cap_word;

  const table = new Table({
    head: ["Options", "Values"],
    colWidths: [25, 25],
  });

  const delim = passphraseOptions.delimiter;

  table.push(
    ["Passphrase Length", `${passphraseOptions.passphraseLength} words`],
    ["Swap Chars", passphraseOptions.leetSpeak],
    ["Delimiter", passphraseOptions.delimiter],
    ["Capitalize Random Word", passphraseOptions.capitalizeWord]
  );

  console.log(table.toString());
};

// Consume affirmations.dev subroutine - the cheeky one
const handleNiceAPI = async function () {
  console.clear();
  const apiURL = "https://www.affirmations.dev/";
  console.log("You got it, boss\n");
  const { affirmation } = await getNiceAffirmation(apiURL);

  const animateText = await chalkAnimation.glitch("Good times incoming...");
  const randomNum = await randomNumber(1, 6);
  const spinner = createSpinner().start({ color: "blue" });

  await sleep();
  spinner.stop();

  await animateText.replace("");
  await animateText.stop;

  console.clear();

  const figletData = await generateFiglet("Affirmed!", "Doom");
  console.log(gradient.pastel.multiline(figletData));

  // Randomize the gradient of the response:
  try {
    switch (randomNum) {
      case 1:
        console.log(gradient.pastel(affirmation));
        break;
      case 2:
        console.log(gradient.retro(affirmation));
        break;
      case 3:
        console.log(gradient.summer(affirmation));
        break;
      case 4:
        console.log(gradient.cristal(affirmation));
        break;
      case 5:
        console.log(gradient.teen(affirmation));
        break;
      case 6:
        console.log(gradient.mind(affirmation));
        break;
    }
  } catch (err) {
    console.error(err);
  }

  await sleep();
  // TODO: Inquirer list prompt for 'return to menu', 'give me another' or 'exit'
  const answer = await inquirer.prompt({
    name: "return_to_menu",
    type: "list",
    message: "Where to next?",
    choices: returnToMenuChoices,
  });

  try {
    switch (answer.return_to_menu) {
      case returnToMenuChoices[0]:
        console.log("Main Menu!");
        console.clear();
        await mainMenu();
        break;
      case returnToMenuChoices[1]:
        console.log("Right on. Coming right up...\n");
        await handleNiceAPI();
        break;
      case returnToMenuChoices[2]:
        console.log("Until next time.");
        break;
      default:
        console.log("We ran into a problem");
    }
  } catch (err) {
    console.error(err);
  }
};

const helpScreen = async function () {
  console.clear();

  try {
    const figletData = await generateFiglet("Help", "Small");
    console.log(gradient.pastel.multiline(figletData), "\n");
  } catch (err) {
    console.error(err);
  }

  console.log(chalk.bgRed(" 1. Email Address Generator \n"));
  console.log("Email Info Here");
  console.log(
    `${chalk.bold(
      "Format:"
    )} <local-part> + <designator>MM-DD-YY-<increment> @ <domain>`
  );
  console.log(chalk.bgRed(" 2. Password Generator \n"));
  console.log("Password Info Here");
  console.log(chalk.bgRed(" 3. Passphrase Generator \n"));
  console.log("Passphrase info Here");
  console.log(chalk.bgRed(" 4. Tell me something nice \n"));
  console.log("It tells you something nice, hope you like it. That's it.");

  await sleep();
  await returnToMainMenu();
};

// Reusable Y/N Return to main menu  - different from the one in APi section
const returnToMainMenu = async function () {
  const answer = await inquirer.prompt({
    name: "return_to_main",
    type: "confirm",
    message: "Return to main menu?",
    default: true,
  });

  try {
    switch (answer.return_to_main) {
      case true:
        mainMenu();
      case false:
        console.log("Goodbye");
        break;
      default:
        console.log("Something went wrong");
    }
  } catch (err) {
    console.error(err);
  }
};

await introScreen();
await mainMenu();
