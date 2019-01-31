import fs from "fs";
import readline from "readline";
import { json2ts, JsonTsOptions } from "json-ts";
import set from "lodash.set";
import path from "path";

/**
 * Main function which will transform a .properties into a object and then into
 * interfaces usin json2ts
 * @param {string} filePath - The .properties file's location
 * @param {string} outPath - Location where you want the interface to be outputted
 * @param {JsonTsOptions?} options
 */
export default function iniToTS(
  filePath: string,
  outPath: string,
  options?: JsonTsOptions
) {
  console.log("filePath", filePath, "outPath", outPath, "options", options);
  const holderObj = {};

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath, "utf-8"),
    crlfDelay: Infinity
  });

  // Read lines asynchronously and return each line (string) of the file
  rl.on("line", (line: string) => {
    // Ignore Comments
    if (line.startsWith("#")) {
      return;
    }

    const indexOfAssignment = line.indexOf("=");
    const keysString = line.substring(0, indexOfAssignment);

    // Sets empty string at path of object.
    set(holderObj, keysString, "");
  });

  // When all the lines have been read, transform the object into interfaces
  rl.on("close", () => {
    const interfaces = json2ts(JSON.stringify(holderObj), options);

    if (outPath) {
      // Create outPath regardless of if it exists
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      // Overwrite outPath with interfaces
      fs.writeFileSync(outPath, interfaces);
      console.log(`✨ Successfully wrote types to ${outPath}`);
    }
  });
}
