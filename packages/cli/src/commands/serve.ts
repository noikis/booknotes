import path from "path";
import { Command } from "commander";

import { serve } from "local-api";
import { printError, printInfo } from "../helpers";

export const serveCommand = new Command()
  // [filename]: optional value
  .command("serve [filename]")
  .description("Open a file for editing")
  // <number>: required value
  // TODO: display options on command --help
  .option("-p, --port <number>", "port to run server on", "4005")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      const port = parseInt(options.port);
      // path of the dir where the file is saved
      const dir = path.join(process.cwd(), path.dirname(filename));

      await serve(port, path.basename(filename), dir);

      printInfo(`Opened ${filename}.`);
      printInfo(
        `Navigate to https://localhost:${options.port} to edit the file`
      );
    } catch (err: any) {
      // PORT ERROR
      if (err.code === "EADDRINUSE") {
        printError("Port is in use. Try running on a different port.");
      } else {
        printError(`Error:  ${err.message}`);
      }

      // Unsuccessful Run
      process.exit(1);
    }
  });
