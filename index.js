const fs = require("fs");
const readline = require('readline');
const {
	json2ts
} = require("json-ts");
const set = require("lodash.set");

/**
 * Main function which will transform a .properties into a object and then into
 * interfaces usin json2ts
 * @param {string} filePath - The .properties file's location
 * @param {string} outPath - Location where you want the interface to be outputted
 * @param {JsonTsOptions} options
 */
function propertiesToTS(filePath, outPath, options) {
	const holderObj = {};

	const rl = readline.createInterface({
		input: fs.createReadStream(filePath, 'utf-8'),
		crlfDelay: Infinity
	});

	// Read lines asynchronously and return each line (string) of the file
	rl.on('line', (line) => {
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

		if (outPath) fs.writeFileSync(outPath, interfaces)
	})
}

module.exports = propertiesToTS;
