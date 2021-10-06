import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export const serve = (port: number, filename: string, dir: string) => {
  const app = express();

  // Proxy  http://localhost:<port>/ to create-react-app
  app.use(
    createProxyMiddleware({
      target: "http://localhost:3000/",
      ws: true,
      logLevel: "silent",
    })
  );

  // Wrapping Express listen with a Promise
  // To handle Errors
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
