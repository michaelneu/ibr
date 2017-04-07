/**
 * Describes an error occurring while accessing the memory of the interpreter.
 */
export class MemoryException extends Error {
  /**
   * Initializes a new exception with a message describing the error.
   * @param message The message describing the error
   */
  public constructor(message: string) {
    super(message);
  }
}

/**
 * Represents the infinite memory of the brianf*ck interpreter.
 */
export class Memory {
  private memory: Map<number, number>;

  /**
   * Initializes a new memory instance.
   */
  public constructor() {
    this.memory = new Map<number, number>();
  }

  /**
   * Ensures the memory address is initialized with 0.
   * @param address The memory address to initialize
   */
  private ensureMemoryInitialized(address: number) : void {
    if (isNaN(address)) {
      throw new TypeError("invalid memory position. only numbers allowed");
    }

    if (!this.memory.has(address)) {
      this.memory.set(address, 0);
    }
  }

  /**
   * Gets the value of the memory at the given address.
   * @param address The address to get the value from
   */
  public getMemoryValue(address: number) : number {
    this.ensureMemoryInitialized(address);
    
    return this.memory.get(address);
  }

  /**
   * Sets the value of the memory at the given address
   * @param address The address to set the value to
   * @param value The new value of the memory at the given address
   */
  public setMemoryValue(address: number, value: number | string) : void {
    if (typeof value == "string") {
      if (value.length != 1) {
        throw new MemoryException(`expected a string of length 1, received '${value}'`);
      } else {
        value = value.charCodeAt(0);
      }
    } else if (isNaN(value)) {
      throw new MemoryException("invalid value given. only numbers allowed");
    }

    this.ensureMemoryInitialized(address);
    this.memory.set(address, value);
  }
  
  /**
   * Increments the value of the memory at the given address by 1.
   * @param address The memory address to increment the value of
   */
  public incrementMemoryValue(address: number) : void {
    const previousValue = this.getMemoryValue(address);

    this.memory.set(address, previousValue + 1);
  }
  
  /**
   * Decrements the value of the memory at the given address by 1.
   * @param address The memory address to decrement the value of
   */
  public decrementMemoryValue(address: number) : void {
    const previousValue = this.memory.get(address);

    this.memory.set(address, previousValue - 1);
  }

  /**
   * Resets the memory.
   */
  public resetMemory() : void {
    this.memory.clear();
  }
}
