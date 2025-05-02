import express from "express";
const router = express.Router();
export default router;

import {
  getFolders,
  getFolderByIdIncludingFiles,
  createFile,
} from "#db/queries/FoldersNFiles";

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

router.param("id", async (req, res, next, id) => {
  const folder = await getFolderByIdIncludingFiles(id);
  if (!folder) return res.status(404).send("folder not found.");

  req.folder = folder;
  next();
});

router.get("/:id", (req, res) => {
  //this is not async because there are no 'await' functions in this callback function.
  res.send(req.folder);
});

router.post("/:id/files", async (req, res) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res.status(400).send("Invalid request parameter");
  }

  if (!req.body) return res.status(400).send("Request body must be provided");

  // if (!req.body.name || !req.body.size)
  //   return res.status(400).send("Required info missing");

  const { name, size } = req.body;
  if (!name || !size) return res.status(400).send("Required info missing");

  // const newFile = await createFile(req.body);
  const newFile = await createFile(name, size, req.folder.id);
  return res.status(201).send(newFile);
});
