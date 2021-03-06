#!/usr/bin/env node

import { Interpreter } from "./interpreter";
import { REPL } from "./repl";
import * as fs from "fs";
import * as yargs from "yargs";

const argv = yargs.usage("Usage: $0 [file]")
                  .describe("help", "shows this help")
                  .alias("help", "h")
                  .argv;

const unnamedArguments = argv._;

if (unnamedArguments.length == 1) {
  const file = unnamedArguments[0],
        interpreter = new Interpreter(),
        code = fs.readFileSync(file)
                 .toString()
                 .replace(/\s/g, "");

  interpreter.run(code);
  console.log();
} else {
  const repl = new REPL();
  repl.run();
}
