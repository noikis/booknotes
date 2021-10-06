"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
var local_api_1 = require("local-api");
var commander_1 = require("commander");
exports.serveCommand = new commander_1.Command()
    // [filename]: optional value
    .command("serve [filename]")
    .description("Open a file for editing")
    // <number>: required value
    // TODO: display options on command --help
    .option("-p, --port <number>", "port to run server on", "4005")
    .action(function (filename, options) {
    if (filename === void 0) { filename = "notebook.js"; }
    (0, local_api_1.serve)(parseInt(options.port), filename, "/");
});
