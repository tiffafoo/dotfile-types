import execa, { Options } from "execa";
import fs from "fs";
import { makeTempDir } from "./utils";
import path from "path";

const tempDir = makeTempDir();
const examplePath = path.resolve(__dirname, "./fixtures/example.properties");
const expectedFolderPath = path.resolve(__dirname, "./fixtures/expected");

const main = (args: string[], options?: Options) =>
  execa("node", args, options);

describe("dotfile-types CLI", () => {
  it("should create a tempdir/simple.d.ts", () => {
    main(["lib/cli.js", examplePath, path.join(tempDir, "simple.d.ts")])
      .then(() => {
        const expected = fs.readFileSync(
          path.join(expectedFolderPath, "/simple.d.ts")
        );

        const actual = fs.readFileSync(path.join(tempDir, "simple.d.ts"));

        expect(actual).toEqual(expected);
      })
      .catch(err => fail);
  });

  it("should not create a file when given a non-existing input", () => {
    expect(
      main(["lib/cli.js", "idontexist", path.join(tempDir, "simple.d.ts")])
    ).rejects.toThrowError();
  });
});
