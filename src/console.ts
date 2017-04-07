import * as readlineSync from "readline-sync";

/**
 * The class Console provides methods to interact with the shell the script is executed in.
 */
export abstract class Console {
  /**
   * Reads a single character from the input stream.
   */
  public static readChar() : string {
    return readlineSync.keyIn();
  }

  /**
   * Reads a complete line from stdin.
   * @param prompt A prompt to display at the beginning of the line. Defaults to "> "
   */
  public static readLine(prompt: string = "> ") : string {
    return readlineSync.prompt({
      prompt: prompt
    });
  }

  /**
   * Writes the given char to the stdout.
   * @param char The char to write to stdout.
   */
  public static writeChar(char: string) : void {
    process.stdout.write(char);
  }
}
