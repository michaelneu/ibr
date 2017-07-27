![ibr logo](logo.png)

# ibr - an **I**nteractive **B**rainf*ck **R**EPL

A simple brainfuck interpreter which allows you to debug your brainfuck programs, using a REPL where you can execute further brainfuck-code. 

To do so, the `#` symbol was added to the brianfuck syntax. When the interpreter reads a `#` symbol, it launches a REPL. Inside the REPL, you can execute any brainfuck code, like incrementing the current pointer, or use any method described by the `help` command.


## Usage

ibr is built using TypeScript. The `package.json` contains scripts to support your brainfuck development needs:

```bash
# install dependencies
$ yarn install

# optionally: compile the typescript files to plain javascript
$ yarn build

# start in pure repl mode
$ yarn start

# start a brainfuck file
$ yarn start script.bf
```


## License

This project was purely educational and thus licensed under [GPLv3](LICENSE). If you seriously want to use ibr in your commercial project, please let me know, and I'll happily change the license to a more open one. Using a brainfuck interpreter in a commercial project sounds hillarious, and thus would be eligible for a more open license.
