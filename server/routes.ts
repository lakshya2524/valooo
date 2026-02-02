import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

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
    const deleted = await storage.deleteImage(id);
    if (!deleted) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(204).send();
  });

  return httpServer;
}
