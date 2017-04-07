import { REPL } from "./repl";
import { Console } from "./console";
import { Memory } from "./memory";

/**
 * Describes an error occurring while executing a brainf*ck script
 */
export class InterpreterException extends Error {
  /**
   * Initializes a new exception with a message describing the error.
   * @param message The message describing the error
   */
  public constructor(message: string) {
    super(message);
  }
}

/**
 * An interpreter for the brainf*ck language.
 */
export class Interpreter {
  private memory: Memory;
  private pointer: number;

  /**
   * Initializes a new interpreter instance.
   */
  public constructor() {
    this.memory = new Memory();
    this.pointer = 0;
  }

  /**
   * Gets the pointer's current address.
   */
  public get pointerAddress() : number {
    return this.pointer;
  }

  /**
   * Gets the current value at the pointer's address.
   */
  public get pointerByteValue() : number {
    return this.memory.getMemoryValue(this.pointer);
  }

  /**
   * Gets the current char at the pointer's address.
   */
  public get pointerCharValue() : string {
    const byte = this.pointerByteValue;

    return String.fromCharCode(byte);
  }

  /**
   * Resets the interpreter.
   */
  public resetInterpreter() : void {
    this.memory.resetMemory();
    this.pointer = 0;
  }

  /**
   * Parses the given code to extract the loop block between the brackets.
   * @param code A brainf*ck code containing a loop block.
   */
  private extractLoopBlockContent(code: string) : string {
    let index = 0,
        openBracketCount = 0,
        buffer = "";

    do {
      let char = code.charAt(index);
      buffer += char;

      if (char == "[") {
        openBracketCount++;
      } else if (char == "]") {
        openBracketCount--;
      }

      index++;
    } while (openBracketCount > 0 && index < code.length);

    if (openBracketCount > 0) {
      throw new InterpreterException(`syntax error: ${openBracketCount} unclosed brackets`);
    }

    return buffer;
  }

  /**
   * Displays a repl (read-execute-print-loop) for the brainf*ck interpreter.
   */
  public repl() : void {
    new REPL(this).run();
  }

  /**
   * Runs the given brainf*ck code.
   * @param code The code to run in the interpreter
   */
  public run(code: string) : void {
    let index = 0;

    while (index < code.length) {
      let symbol = code.charAt(index);

      switch (symbol) {
        case "<":
          this.pointer -= 1;
          break;

        case ">":
          this.pointer += 1;
          break;

        case "-":
          this.memory.decrementMemoryValue(this.pointer);
          break;

        case "+":
          this.memory.incrementMemoryValue(this.pointer);
          break;

        case ".":
          const char = this.pointerCharValue;
        
          Console.writeChar(char);
          break;

        case ",":
          const input = Console.readChar();

          this.memory.setMemoryValue(this.pointer, input);
          break;

        case "[":
          const codeFromCurrentPosition = code.substr(index),
                loop = this.extractLoopBlockContent(codeFromCurrentPosition),
                loopContent = loop.substr(1, loop.length - 2);

          index += loop.length;

          while (this.memory.getMemoryValue(this.pointer)) {
            this.run(loopContent);
          }

          index--;
          break;

        case "#":
          this.repl();
          break;

        default:
          throw new InterpreterException(`invalid character "${char}"`);
      }

      index++;
    }
  }
}
