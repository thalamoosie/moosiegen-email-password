"use strict";

import fs from "fs";

const outputDir = "./output";

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

const outputDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, (err) => {
      if (err) throw err;
      console.log(`Directory Created: ${outputDir}`);
    });
  } else console.log(`Directory already exists: ${outputDir}`);
};

const writeToFile = function (file, fileData, dir) {
  console.log("Write to File Invocation");
  outputDirectory(dir);

  const fileName = filenameFromDate(file, new Date());

  fs.writeFile(`${dir}/${fileName}.txt`, fileData, (err) => {
    if (err) throw err;
    else console.log(`File: ${fileName} written successfully`);
  });
};

// const file = filenameFromDate("testFilename", new Date());
const stubFile = "Bingo.txt";
const dataStub = "abcdefg\nhijklmnop\nqrstuvwxyz";
writeToFile("emailsRUs", dataStub, outputDir);
