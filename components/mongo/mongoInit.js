import { MongoClient } from "mongodb";

const uri =
  "mongodb://localhost:27017";

export const mongoInit = async function () {
  const client = new MongoClient(uri);
  return client;
};
