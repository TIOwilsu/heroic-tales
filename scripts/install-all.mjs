import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.dirname(scriptsDirectory);
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

for (const packageDirectory of ["frontend", "backend"]) {
  const directory = path.join(rootDirectory, packageDirectory);
  console.log(`Installing dependencies in ${packageDirectory}/`);
  execFileSync(npmCommand, ["install"], {
    cwd: directory,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
}

console.log("Frontend and backend dependencies installed.");
