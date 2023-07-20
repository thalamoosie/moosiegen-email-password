import { assert, expect } from "chai";

import {
  assembleEmail,
  generateDate,
} from "../components/email-generator/emailFunctions.js";
import { generateEmails } from "../components/email-generator/emailGenerator.js";

const testUser = {
  userName: "testuser",
  month: "06",
  day: "04",
  year: "2023",
  upperLimit: 1,
  domain: "testmoose.com",
  id: "mz",
};

const testDate = new Date();

describe("Date Generator for email function(s) - Positive Tests", function () {
  it("will return type of object", function () {
    const res = generateDate(testDate);
    expect(res).to.be.an("object");
  });
  it("returns a an object containing 3 properties", function () {
    const res = Object.keys(generateDate(testDate));
    expect(res).to.have.lengthOf(3);
  });
});

describe("Email Generator: assembleEmail - Positive Tests", function () {
  it("Creates 1 email address matching the set parameters", function () {
    const res = assembleEmail(
      testUser.userName,
      testUser.month,
      testUser.day,
      testUser.year,
      testUser.upperLimit,
      testUser.domain,
      testUser.id
    );
    expect(res[0]).to.equal("testuser+mz06.04.2023-01@testmoose.com");
  });
  it("Creates the desired number of email addresses", function () {
    const res = assembleEmail(
      testUser.userName,
      testUser.month,
      testUser.day,
      testUser.year,
      22,
      testUser.domain,
      testUser.id
    );
    expect(res).to.have.lengthOf(22);
  });
  it("returns type array", function () {
    const res = assembleEmail(
      testUser.userName,
      testUser.month,
      testUser.day,
      testUser.year,
      testUser.upperLimit,
      testUser.domain,
      testUser.id
    );
    // expect(res[0]).to.equal("testuser+mz06.04.2023-01@testmoose.com");
    expect(res[0]).to.equal(
      `${testUser.userName}+${testUser.id}${testUser.month}.${testUser.day}.${testUser.year}-01@${testUser.domain}`
    );
  });
});
