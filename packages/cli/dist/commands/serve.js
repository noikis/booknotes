"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
var local_api_1 = require("local-api");
var path_1 = __importDefault(require("path"));
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
    var port = parseInt(options.port);
    // path of the dir where the file is saved
    var dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
    (0, local_api_1.serve)(port, path_1.default.basename(filename), dir);
});
