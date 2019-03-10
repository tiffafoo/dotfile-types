import dotfileToTS from "../index";
import fs from "fs";
import path from "path";
import { makeTempDir } from "./utils";

console.log = jest.fn();
console.error = jest.fn();

const tempDir = makeTempDir();
const examplePath = path.resolve(__dirname, "./fixtures/example.properties");
const expectedFolderPath = path.resolve(__dirname, "./fixtures/expected");

describe("dotfileToTS", () => {
  beforeEach((console.error as jest.Mock).mockClear);

  it("should create a file", () => {
    const expectedPath = path.join(expectedFolderPath, "simple.d.ts");
    const actualPath = path.join(tempDir, "simple.d.ts");

    dotfileToTS(examplePath, actualPath)
      .then(() => {
        const expected = fs.readFileSync(expectedPath);
        const actual = fs.readFileSync(actualPath);

        expect(actual).toEqual(expected);
      })
      .catch(err => fail);
  });

  it("should create a file with the proper rootName", async () => {
    const expectedPath = path.join(expectedFolderPath, "withRootName.d.ts");
    const actualPath = path.join(tempDir, "withRootName.d.ts");

    await dotfileToTS(examplePath, actualPath, { rootName: "Something" })
      .then(() => {
        const expected = fs.readFileSync(expectedPath);
        const actual = fs.readFileSync(actualPath);
        expect(actual).toEqual(expected);
      })
      .catch(err => fail);
  });

  it("should create a file with a namespace", () => {
    const expectedPath = path.join(expectedFolderPath, "withNameSpace.d.ts");
    const actualPath = path.join(tempDir, "withNameSpace.d.ts");

    dotfileToTS(examplePath, actualPath, {
      rootName: "Bob",
      namespace: "Translations"
    })
      .then(() => {
        const expected = fs.readFileSync(expectedPath);
        const actual = fs.readFileSync(actualPath);

        expect(actual).toEqual(expected);
      })
      .catch(err => fail);
  });

  it("should not create a file when none exists", () => {
    const fakePath = path.join(expectedFolderPath, "fake.d.ts");
    const outputPath = path.join(tempDir, "shouldNotBeCreated.d.ts");

    dotfileToTS(fakePath, outputPath).catch(err => {
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(fs.readFileSync(outputPath)).toThrow();
    });
  });
});
