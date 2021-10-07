import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  DEVELOPMENT_MODE: boolean
) => {
  const app = express();

  if (DEVELOPMENT_MODE) {
    /* Scenario 1: DEVELOPMENT MODE
     If it isn't a request to fetch/save cells then
     => Proxy  http://localhost:<port>/ to create-react-app */
    app.use(
      createProxyMiddleware({
        target: "http://localhost:3000/",
        ws: true,
        logLevel: "silent",
      })
    );
  } else {
    /* Scenario 2: PRODUCTION MODE
     When the CLI is installed locally
     => Serve the built files */

    // Find the path to a node module
    const modulePath = require.resolve("local-client/build/index.html");

    app.use(express.static(path.dirname(modulePath)));
  }

  // Wrapping Express listen with a Promise
  // To handle Errors
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
