import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertResponse } from "@shared/routes";

export function useCreateResponse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertResponse) => {
      // Small artificial delay to make the interaction feel more substantial
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const res = await fetch(api.response.create.path, {
        method: api.response.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error('Failed to submit response');
      }
      
      return api.response.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      // If we had a list of responses, we'd invalidate it here
      // queryClient.invalidateQueries({ queryKey: [api.response.list.path] });
    }
  });
}
