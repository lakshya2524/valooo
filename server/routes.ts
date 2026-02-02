import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "client/public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'amrit-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: fileStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.response.create.path, async (req, res) => {
    try {
      const input = api.response.create.input.parse(req.body);
      const response = await storage.createResponse(input);
      res.status(201).json(response);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get(api.response.list.path, async (req, res) => {
    const responses = await storage.getResponses();
    res.json(responses);
  });

  app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      const category = req.body.category;
      if (!category) {
        return res.status(400).json({ message: 'Category is required' });
      }

      const imageUrl = `/uploads/${req.file.filename}`;
      const image = await storage.createImage({ url: imageUrl, category });
      res.status(201).json(image);
    } catch (err) {
      res.status(500).json({ message: 'Upload failed' });
    }
  });

  app.post(api.images.create.path, async (req, res) => {
    try {
      const input = api.images.create.input.parse(req.body);
      const image = await storage.createImage(input);
      res.status(201).json(image);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get(api.images.list.path, async (req, res) => {
    const images = await storage.getImages();
    res.json(images);
  });

  app.get(api.images.listByCategory.path, async (req, res) => {
    const { category } = req.params;
    const images = await storage.getImagesByCategory(category);
    res.json(images);
  });

  app.delete(api.images.delete.path, async (req, res) => {
    const id = Number(req.params.id);
    const image = await storage.getImageById(id);
    
    if (image && image.url.startsWith('/uploads/')) {
      const filePath = path.join(uploadDir, path.basename(image.url));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    const deleted = await storage.deleteImage(id);
    if (!deleted) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(204).send();
  });

  return httpServer;
}
