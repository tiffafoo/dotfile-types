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
export default async function dotfileToTS(
  filePath: string,
  outPath: string,
  options?: JsonTsOptions
) {
  const holderObj = {};

  try {
    fs.accessSync(filePath);
  } catch (err) {
    console.error(
      "❌Could not access:",
      filePath,
      " . Please check if it exists"
    );
    return;
  }

  try {
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

    rl.on("close", () => {
      const interfaces = json2ts(JSON.stringify(holderObj), options);

      if (outPath) {
        // Check if going to a different directory or absolute
        if (/\//.test(outPath)) {
          const dirNameOutPath = path.dirname(outPath);
          // This works in Node 9
          if (!fs.existsSync(dirNameOutPath)) {
            fs.mkdirSync(dirNameOutPath);
          }
        }

        // Overwrite outPath with interfaces
        fs.writeFileSync(outPath, interfaces);
        console.log(`✨ Successfully wrote types to ${outPath}`);
      }
    });
  } catch (err) {
    console.error(
      "❌ Could not write type. Make sure you gave correct input, output and options!",
      err
    );
  }
}
