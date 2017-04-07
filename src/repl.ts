import { Interpreter } from "./interpreter";
import { Console } from "./console";
import * as sprintf from "sprintf-js";
import * as yargs from "yargs";

/**
 * The REPL class provides a brainf*ck repl.
 */
export class REPL {
  private static level: number = 0;
  private commandCount: number;

  /**
   * Initializes a new brainf*ck repl. If an interpreter is given, the code executed in the repl will be run in the given instance.
   * @param interpreter An optional interpreter instance to run brainf*ck code in
   */
  public constructor(private interpreter?: Interpreter) {
    if (!interpreter) {
      this.interpreter = new Interpreter();
    }

    this.commandCount = 0;
  }

  /**
   * Gets the prompt to display for the repl.
   */
  private get prompt() : string {
    let level = "main";

    if (REPL.level > 1) {
      for (let i = 1; i < REPL.level; i++) {
        level = "sub" + level;
      }
    }

    const commandCount = sprintf.sprintf("%03d", this.commandCount);

    return `ibr(${level}):${commandCount}> `;
  }

  /**
   * Checks if the given command is brainf*ck code.
   * @param command The command to check.
   */
  private commandIsCode(command: string) : boolean {
    const symbols = ["<", ">", "-", "+", ",", ".", "[", "]", "#"];

    for (const symbol of symbols) {
      const regex = new RegExp(`\\${symbol}`, "g");
      command = command.replace(regex, "");
    }

    return command.length == 0;
  }

  /**
   * Displays the repl.
   */
  public run() : void {
    REPL.level++;

    let done = false;
    
    do {
      const input = Console.readLine(this.prompt);
      this.commandCount++;

      if (this.commandIsCode(input)) {
        this.interpreter.run(input);
      } else if (input.length > 0) {
        const args = yargs.parse(input)
                          ._;

        const command = args.shift();

        switch (command) {
          case "pointer":
            console.log(`=> address: ${this.interpreter.pointerAddress}, byte: ${this.interpreter.pointerByteValue}, char: '${this.interpreter.pointerCharValue}'`);
            break;

          case "panic":
            process.exit(0);
            break;

          case "exit":
          case "continue":
            done = true;
            break;

          case "help":
          case "h":
            const help = [
              ["h, help", "shows this help"],
              ["pointer", "displays the pointer's current value"],
              ["exit, continue", "exits the repl and returns to the interpreter"],
              ["panic", "exit the interpreter completely"]
            ];

            let longestOptionLength = 0;
            for (const option of help) {
              longestOptionLength = Math.max(longestOptionLength, option[0].length);
            }

            for (const option of help) {
              const formattedHelp = sprintf.sprintf(`  %-${longestOptionLength}s  %s`, option[0], option[1]);

              console.log(formattedHelp);
            }

            break;

          default:
            break;
        }
      }
    } while (!done);

    REPL.level--;
  }
}
