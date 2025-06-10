import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../client";

const JOB_SPECS_TABLE = "job_specs";

// Fetch all job specs
export const useJobSpecs = () => {
  return useQuery({
    queryKey: ["job_specs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(JOB_SPECS_TABLE)
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

// Create a new job spec
export const useCreateJobSpec = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newJobSpec: {
      title: string;
      location: string;
      details: string;
    }) => {
      const { data, error } = await supabase
        .from(JOB_SPECS_TABLE)
        .insert([newJobSpec])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job_specs"] });
    },
  });
};

// Update a job spec
export const useUpdateJobSpec = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: {
        title?: string;
        location?: string;
        details?: string;
      };
    }) => {
      const { data, error } = await supabase
        .from(JOB_SPECS_TABLE)
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job_specs"] });
    },
  });
};

// Delete a job spec
export const useDeleteJobSpec = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from(JOB_SPECS_TABLE)
        .delete()
        .eq("id", id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job_specs"] });
    },
  });
};
