"use strict";

import fs from "fs";
import path from "path";
import os from "node:os";

const outputDir = "msgn-output";
const userHomeDir = os.homedir();

console.log(userHomeDir);

// Creates a filename from a date - Takes a filename, a current date and an extension
/**
 *
 * @param file Name of file to have date appended to end
 * @param date Date object
 * @returns String formatted as such: filename-formattedISODate.extension
 */
const filenameFromDate = function (file, date) {
  const formattedDate = date.toISOString().replace(/:|\./gi, "-");
  return `${file}-${formattedDate}`;
};

/**
 *
 * @param {*} dir Directory path
 */
const outputDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, (err) => {
      if (err) throw err;
      console.log(`Directory Created: ${dir}`);
    });
  } else console.log(`Directory already exists: ${dir}`);
};

const directory = path.join(userHomeDir, outputDir);

/**
 *
 * @param {*} file Filename - Prepended before date.toISOString() format
 * @param {*} data Data to write out in writable stream
 * @param {*} dir Directory to be written out to
 * @param {*} extension File extension - must be 'csv' or 'txt'
 *
 * Writes data out to a txt or CSV file based on the above parameters
 */

const writeToFile = function (file, data, dir, extension = "txt") {
  console.log("Write to File Invocation");

  outputDirectory(dir);

  const fileName = filenameFromDate(file, new Date());
  const filePath = path.join(dir, `${fileName}`);

  if (extension === "txt") {
    console.log("Write to txt invocation");
    const writeStream = fs.createWriteStream(filePath.concat(".txt"), {
      encoding: "utf8",
    });

    try {
      writeStream.on("finish", () => {
        console.log(`File: ${filePath} written successfully`);
      });
      writeStream.write(data);
      writeStream.end();
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }
  if (extension === "csv") {
    console.log("write to CSV");
    const writeStream = fs.createWriteStream(filePath.concat(".csv"));
    const headerKeys = Object.keys(data[0]);

    try {
      writeStream.write(headerKeys.join(",") + "\n");
      data.forEach((row) => {
        writeStream.write(`${row.emailAddress},${row.password}\n`);
      });
      writeStream.end();
    } catch (err) {
      console.error(`Error writing file: ${err}`);
    }
  }
};

const dataStub = "abcdefg\nhijklmnop\nqrstuvwxyz";

const csvData2 = [
  { emailAddress: "email@email.com", password: "Testing1234!" },
  { emailAddress: "wow@wowwowow.com", password: "Testing1234!" },
];
writeToFile("emailsRUs", dataStub, directory);
writeToFile("bigCSVfile", csvData2, directory, "csv");
