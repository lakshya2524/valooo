import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // In production, __dirname is 'dist', so dist/public is the client build
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve static files from dist/public
  app.use(express.static(distPath));
  
  // Also serve uploads from the source uploads folder (for file persistence)
  const uploadsPath = path.resolve(process.cwd(), "client", "public", "uploads");
  if (fs.existsSync(uploadsPath)) {
    app.use("/uploads", express.static(uploadsPath));
  }

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
