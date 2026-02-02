import { z } from 'zod';
import { insertResponseSchema, responses } from './schema';

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
};
