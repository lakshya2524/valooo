import { db } from "./db";
import { responses, images, type InsertResponse, type Response, type InsertImage, type Image } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createResponse(response: InsertResponse): Promise<Response>;
  getResponses(): Promise<Response[]>;
  createImage(image: InsertImage): Promise<Image>;
  getImages(): Promise<Image[]>;
  getImagesByCategory(category: string): Promise<Image[]>;
  getImageById(id: number): Promise<Image | undefined>;
  deleteImage(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async createResponse(insertResponse: InsertResponse): Promise<Response> {
    const [response] = await db
      .insert(responses)
      .values(insertResponse)
      .returning();
    return response;
  }

  async getResponses(): Promise<Response[]> {
    return await db.select().from(responses);
  }

  async createImage(insertImage: InsertImage): Promise<Image> {
    const [image] = await db
      .insert(images)
      .values(insertImage)
      .returning();
    return image;
  }

  async getImages(): Promise<Image[]> {
    return await db.select().from(images);
  }

  async getImagesByCategory(category: string): Promise<Image[]> {
    return await db.select().from(images).where(eq(images.category, category));
  }

  async getImageById(id: number): Promise<Image | undefined> {
    const [image] = await db.select().from(images).where(eq(images.id, id));
    return image;
  }

  async deleteImage(id: number): Promise<boolean> {
    const result = await db.delete(images).where(eq(images.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
