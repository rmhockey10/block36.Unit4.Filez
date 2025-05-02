import express from "express";
const router = express.Router();
export default router;

import { getFiles } from "#db/queries/FoldersNFiles";

router.get("/", async (req, res) => {
  const files = await getFiles();
  res.send(files);
});
