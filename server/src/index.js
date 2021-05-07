import express from "express";
import cors from "cors";
(() => {
  const server = express();
  const port = 8080;
  server.use(cors());
  server.get("/", (req, res) => {
    res.send("Hello World!");
  });
  server.get("/data", (req, res) => {});
  server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
