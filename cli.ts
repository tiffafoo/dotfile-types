#!/usr/bin/env node
"use strict";
import meow from "meow";
import iniToTS from "./index";

const cli = meow(
  `
	Usage
		$ ini-ts [<file>] [<outDir>]

	Options
		--namespace=<namespace_name>	interfaces will be wrapped in a namespace
		--prefix=<prefix_string>			override the I prefix on interface names
		--rootName=<rootname_string>	overide the RootObject name of the top-level interface
	
	Examples
		$ ini-ts US_EN.properties
		$ ini-ts .env types
		$ ini-ts --namespace API
		$ ini-ts --prefix "" --rootName "Product"
	`,
  {
    flags: {
      outDir: {
        type: "string",
        default: ""
      },
      namespace: {
        type: "string"
      },
      prefix: {
        type: "string"
      },
      rootName: {
        type: "string"
      }
    }
  }
);

const { input, flags: options, showHelp } = cli;

/**
 * Runs the iniToTS command
 */
async function main() {
  if (input.length === 0) {
    showHelp();
    return;
  }

  iniToTS(input[0], input[1], options);
}

main();
