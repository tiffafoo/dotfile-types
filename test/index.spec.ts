import iniToTS from "../index";
import fs from "fs";
import rimraf from "rimraf";

const tempDir = "test/fixtures/tempDir";
const examplePath = "test/fixtures/example.properties";
const expectedFolderPath = "test/fixtures/expected/";

describe("iniToTS", () => {
  // Delete tempDir to return to clean slate
  afterAll(() => rimraf.sync(tempDir));

  it("should create a file", () => {
    const expectedPath = `${expectedFolderPath}/simple.d.ts`;
    const actualPath = `${tempDir}/simple.d.ts`;

    iniToTS(examplePath, actualPath);

    const expected = fs.readFileSync(expectedPath);
    const actual = fs.readFileSync(actualPath);

    expect(actual.equals(expected)).toBe(true);
  });

  it("should create a file with the proper rootName", () => {
    const expectedPath = `${expectedFolderPath}/withRootName.d.ts`;
    const actualPath = `${tempDir}/withRootName.d.ts`;

    iniToTS(examplePath, actualPath, {
      rootName: "Something"
    });

    const expected = fs.readFileSync(expectedPath);
    const actual = fs.readFileSync(actualPath);

    expect(actual.equals(expected)).toBe(true);
  });

  it("should create a file with a namespace", () => {
    const expectedPath = `${expectedFolderPath}/withNameSpace.d.ts`;
    const actualPath = `${tempDir}/withNameSpace.d.ts`;

    iniToTS(examplePath, actualPath, {
      rootName: "Bob",
      namespace: "Translations"
    });

    const expected = fs.readFileSync(expectedPath);
    const actual = fs.readFileSync(actualPath);

    expect(actual.equals(expected)).toBe(true);
  });
});
