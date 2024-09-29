#!/usr/bin/env node
import { promisify } from "util";
import cp from "child_process";
import path from "path";
import fs from "fs";

// convert libs to promises
const exec = promisify(cp.exec);
const rm = promisify(fs.rm);

if (process.argv.length < 3) {
  console.log("You have to provide a name to your app.");
  console.log("For example :");
  console.log("    npx generic-nodejs-express-api my-app");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const gitRepo = "https://github.com/npm-packages-collection/generic-nodejs-express-api.git";

// create project directory
if (fs.existsSync(projectPath)) {
  console.log(`The project ${projectName} already exists in the current directory, please give it another name.`);
  process.exit(1);
} else {
  fs.mkdirSync(projectPath);
}

// Simple spinner function
function startSpinner(message) {
  const spinnerChars = ["⠟", "⠯", "⠷", "⠾", "⠽", "⠻"];
  let index = 0;
  process.stdout.write(message);
  return setInterval(() => {
    process.stdout.write(`\r${message} ${spinnerChars[index]}`);
    index = (index + 1) % spinnerChars.length;
  }, 100);
}

// Stop spinner function
function stopSpinner(spinner, successMessage) {
  clearInterval(spinner);
  process.stdout.write(`\r${successMessage}\n`);
}

try {
  const gitSpinner = startSpinner("Downloading files...");
  // clone the repo into the project folder
  await exec(`git clone --depth 1 ${gitRepo} ${projectPath} --quiet`);
  stopSpinner(gitSpinner, "Downloading files... Done!");

  const cleanSpinner = startSpinner("Cleaning up unnecessary files...");
  // remove the git history and install scripts
  const rmGit = rm(path.join(projectPath, ".git"), { recursive: true, force: true });
  const rmBin = rm(path.join(projectPath, "bin"), { recursive: true, force: true });
  await Promise.all([rmGit, rmBin]);
  stopSpinner(cleanSpinner, "Cleaning up unnecessary files... Done!");

  process.chdir(projectPath);

  const npmSpinner = startSpinner("Installing dependencies...");
  await exec("npm install");
  stopSpinner(npmSpinner, "Installing dependencies... Done!");

  console.log("The setup is complete!");
  console.log("You can now start your app with:");
  console.log(`    cd ${projectName}`);
  console.log(`    npm run dev`);
  console.log("If you want to run https server, you can use:");
  console.log(`    cd ${projectName}`);
  console.log(`    npm run certs`);
  console.log(`    npm run dev:https`);

} catch (error) {
  fs.rmSync(projectPath, { recursive: true, force: true });
  console.error("An error occurred during installation:", error);
}
