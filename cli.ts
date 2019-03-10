#!/usr/bin/env node
"use strict";
import meow from "meow";
import dotfileToTS from "./index";

const cli = meow(
  `
	Usage
		$ dotfile-types [<file>] [<outDir>]

	Options
		--namespace=<namespace_name>	interfaces will be wrapped in a namespace
		--prefix=<prefix_string>			override the I prefix on interface names
		--rootName=<rootname_string>	overide the RootObject name of the top-level interface
	
	Examples
		$ dotfile-types US_EN.properties
		$ dotfile-types .env types
		$ dotfile-types --namespace API
		$ dotfile-types --prefix "" --rootName "Product"
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
 * Runs the dotfileToTS command
 */
function main() {
  if (input.length === 0) {
    showHelp();
    return;
  }

  dotfileToTS(input[0], input[1], options);
}

main();
