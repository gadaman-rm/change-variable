#! /usr/bin/env node
import fs from "fs";
import path from "path";
import { program } from "commander";

// Function to modify the variable in the given file
async function changeVariableInFile(filePath: string, variableName: string, newValue: string): Promise<void> {
  try {
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    const updatedContent = fileContent.replace(
      new RegExp(`(${variableName}:\\s*".*?"\\s*\\|\\s*".*?"\\s*=\\s*")[^"]*(")`),
      `$1${newValue}$2`
    );

    await fs.promises.writeFile(filePath, updatedContent, "utf-8");
    console.log(`Successfully changed ${variableName} to "${newValue}" in ${filePath}`);
  } catch (error) {
    console.error("Error reading or writing the file:", error);
  }
}

// Command-line interface
program
  .version("1.0.0")
  .argument("<filePath>", "Path to the file")
  .argument("<variableName>", "Variable name to change")
  .argument("<newValue>", "New value for the variable")
  .action(async (filePath, variableName, newValue) => {
    const absolutePath = path.resolve(filePath);
    await changeVariableInFile(absolutePath, variableName, newValue);
  });

program.parse();

//changeVariableInFile("./Storage.ts", "device", "PC");
