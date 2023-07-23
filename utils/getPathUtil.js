import path from "path";
import { fileURLToPath } from "url";

export const getFilename = function (metaURL) {
  const __filename = fileURLToPath(metaURL);
  return __filename;
};

export const getDirname = function (metaURL) {
  const __dirname = path.dirname(getFilename(metaURL));
  return __dirname;
};
