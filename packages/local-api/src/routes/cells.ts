import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "code" | "text";
}

// Wrap the router inside a function, so that it receives filename and dir as arguments
export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const filePath = path.join(dir, filename);
  const encoding = "utf-8";

  // Get a list of cells stored in a file (the file name is provided to the CLI)
  router.get("/cells", async (req, res) => {
    try {
      const fileContent = await fs.readFile(filePath, { encoding: encoding });

      res.send(JSON.parse(fileContent));
    } catch (err: any) {
      // File doesn't exist
      if (err.code === "ENOENT") {
        // Create a file
        await fs.writeFile(filePath, "[]", encoding);

        const defaultCells = [
          { id: "l7gq9", content: "", type: "code" },
          { id: "bhwh3", content: "", type: "text" },
        ];

        res.send(defaultCells);
      } else {
        throw err;
      }
    }
  });

  // Take a list of cells and store  them into a file.
  router.post("/cells", async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;

    await fs.writeFile(filePath, JSON.stringify(cells), encoding);

    res.send({ status: "ok" });
  });

  return router;
};
