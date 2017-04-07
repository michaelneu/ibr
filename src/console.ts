import * as readlineSync from "readline-sync";

export class Console {
  public static readChar() : string {
    return readlineSync.keyIn();
  }

  public static writeChar(char: string) : void {
    process.stdout.write(char);
  }
}
