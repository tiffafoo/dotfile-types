import os from "os";
import path from "path";
import fs from "fs";

// Prints: /tmp/dotfile-types-itXde2 or C:\Users\...\AppData\Local\Temp\dotfile-types-itXde2
export function makeTempDir(): string {
  const tempDirName = path.join(os.tmpdir(), "dotfile-types-");
  return fs.mkdtempSync(tempDirName);
}
