"use strict";

// Object.defineProperty(exports, "__esModule", { value: true });
import { assembleEmail, generateDate } from "./emailFunctions.js";

export const generateEmails = (userName) => {
  const date = new Date();
  const { thisMonth, todayDate, thisYear } = generateDate(date);

  const user = {
    userName: userName,
    emailDomain: "big.moose",
    defaultPassword: "TestingPW!",
  };

  // console.log(user);
  // console.log(thisMonth, todayDate, thisYear);
  let email = assembleEmail(
    user.userName,
    thisMonth,
    todayDate,
    thisYear,
    5,
    user.emailDomain
  );
};
