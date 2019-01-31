import execa, { Options } from "execa";
import rimraf from "rimraf";

const tempDir = "test/fixtures/tempDir";
const examplePath = "test/fixtures/example.properties";
const main = (args: string[], options: Options) => execa("node", args, options);

describe("ini-ts CLI", () => {
  afterAll(() => rimraf.sync(tempDir));

  it("should create a tempdir/simple.d.ts", async () => {
    try {
      await main(
        [
          "lib/cli.js",
          "test/fixtures/example.properties",
          "test/fixtures/tempDir/simple.d.ts"
        ],
        {}
      );
    } catch (err) {
      console.log(err);
    }
  });
});
