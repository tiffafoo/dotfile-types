const propertiesToTS = require("../index");
const fs = require("fs");

describe("propertiesToTS", () => {
	// afterEach(() => {
	// 	fs.unlinkSync("test/fixtures/test.d.ts")
	// })
	it("should create a file", () => {
		propertiesToTS("test/fixtures/example.properties", "test/fixtures/simple.d.ts");
	})

	it("should create a file with the proper rootName", () => {
		propertiesToTS("test/fixtures/example.properties", "test/fixtures/withRootName.d.ts", {
			rootName: "Something"
		})
	})

	it("should create a file with a namespace", () => {
		propertiesToTS("test/fixtures/example.properties", "test/fixtures/withNameSpace.d.ts", {
			rootName: "Bob",
			namespace: "Translations"
		});
	})
})
