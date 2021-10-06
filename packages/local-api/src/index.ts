import express from "express";

export const serve = (port: number, filename: string, dir: string) => {
  const app = express();

  // Wrapping Express listen with a Promise
  // To handle Errors
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
