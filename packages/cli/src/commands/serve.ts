import { serve } from "local-api";
import path from "path";
import { Command } from "commander";

export const serveCommand = new Command()
  // [filename]: optional value
  .command("serve [filename]")
  .description("Open a file for editing")
  // <number>: required value
  // TODO: display options on command --help
  .option("-p, --port <number>", "port to run server on", "4005")
  .action((filename = "notebook.js", options: { port: string }) => {
    // path of the dir where the file is saved
    const dir = path.join(process.cwd(), path.dirname(filename));

    const port = parseInt(options.port);

    serve(port, path.basename(filename), dir);
  });
