import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.dirname(projectRoot);
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const processes = [
  spawn(npmCommand, ["run", "dev"], {
    cwd: path.join(rootDirectory, "frontend"),
    stdio: "inherit",
    shell: process.platform === "win32",
  }),
  spawn(npmCommand, ["run", "start:dev"], {
    cwd: path.join(rootDirectory, "backend"),
    stdio: "inherit",
    shell: process.platform === "win32",
  }),
];

let shuttingDown = false;

function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of processes) {
    child.kill("SIGTERM");
  }
  process.exitCode = exitCode;
}

for (const child of processes) {
  child.on("error", () => shutdown(1));
  child.on("exit", (code) => {
    if (!shuttingDown && code !== 0) shutdown(code ?? 1);
  });
}

process.on("SIGINT", () => shutdown());
process.on("SIGTERM", () => shutdown());
