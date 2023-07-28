#! /usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";
import args from "args";

args
  .option("letter", "The letter you want to find in the file")
  .option("file", "The file you want to read from");
const flags = args.parse(process.argv);
console.log(process.argv);
console.log(flags);

// yargs(hideBin(process.argv))
//   .command(
//     "file",
//     "filename to run ",
//     () => {},
//     (argv) => {
//       console.info(argv);
//     }
//   )
//   .demandCommand(1)
//   .parse();

const findCharsInFile = async (file, char) => {
  try {
    // aa
    const read = fs.createReadStream(file);
    read.on("data", function (chunk) {
      const chunkString = chunk.toString();
      let accumulator = 0;
      for (let i in chunkString) {
        if (chunkString[i] === char) {
          accumulator += 1;
        }
      }
      const multiString = `File ${file} has ${accumulator} occurences of the character ${char}`;
      const singleString = `File ${file} has ${accumulator} occurence of the character ${char}`;
      if (accumulator <= 0) console.log(multiString);
      if (accumulator === 1) console.log(singleString);
      if (accumulator > 1) console.log(multiString);

      return accumulator;
    });
  } catch (err) {
    console.error(`Error reading file: ${err}`);
  }
};

// await findCharsInFile(flags.file, flags.letter);

// const [char, file] = process.argv.splice(2);

// console.log(char, file);
