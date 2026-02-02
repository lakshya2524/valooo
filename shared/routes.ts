import { z } from 'zod';
import { insertResponseSchema, insertImageSchema, responses, images, imageCategories } from './schema';

export const api = {
  response: {
    create: {
      method: 'POST' as const,
      path: '/api/respond',
      input: insertResponseSchema,
      responses: {
        201: z.custom<typeof responses.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/responses',
      responses: {
        200: z.array(z.custom<typeof responses.$inferSelect>()),
      },
    },
  },
  images: {
    create: {
      method: 'POST' as const,
      path: '/api/images',
      input: insertImageSchema,
      responses: {
        201: z.custom<typeof images.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/images',
      responses: {
        200: z.array(z.custom<typeof images.$inferSelect>()),
      },
    },
    listByCategory: {
      method: 'GET' as const,
      path: '/api/images/:category',
      responses: {
        200: z.array(z.custom<typeof images.$inferSelect>()),
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/images/:id',
      responses: {
        204: z.void(),
        404: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export { imageCategories };
