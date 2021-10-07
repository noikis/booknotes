"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
var express_1 = __importDefault(require("express"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
var path_1 = __importDefault(require("path"));
var cells_1 = require("./routes/cells");
var serve = function (port, filename, dir, DEVELOPMENT_MODE) {
    var app = (0, express_1.default)();
    if (DEVELOPMENT_MODE) {
        /* Scenario 1: DEVELOPMENT MODE
         If it isn't a request to fetch/save cells then
         => Proxy  http://localhost:<port>/ to create-react-app */
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: "http://localhost:3000/",
            ws: true,
            logLevel: "silent",
        }));
    }
    else {
        /* Scenario 2: PRODUCTION MODE
         When the CLI is installed locally
         => Serve the built files */
        // Find the path to a node module
        var modulePath = require.resolve("local-client/build/index.html");
        app.use(express_1.default.static(path_1.default.dirname(modulePath)));
    }
    app.use((0, cells_1.createCellsRouter)(filename, dir));
    // Wrapping Express listen with a Promise
    // To handle Errors
    return new Promise(function (resolve, reject) {
        app.listen(port, resolve).on("error", reject);
    });
};
exports.serve = serve;
