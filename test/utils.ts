import os from "os";
import path from "path";
import fs from "fs";

// Prints: /tmp/ini-ts-itXde2 or C:\Users\...\AppData\Local\Temp\ini-ts-itXde2
export function makeTempDir(): string {
  const tempDirName = path.join(os.tmpdir(), "ini-ts-");
  return fs.mkdtempSync(tempDirName);
}
