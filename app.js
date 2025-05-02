import express from "express";
const app = express();
export default app;

import foldersRouter from "#api/foldersRoutes";
import filesRouter from "#api/filesRoutes";

// Parse JSON request bodies
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/files", filesRouter);

app.use("/folders", foldersRouter);

// Catch-all error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("It's not you, it's me");
});
