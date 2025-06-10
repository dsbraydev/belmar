import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../client";

const APPLICANTS_TABLE = "applicants";

// Fetch all applicants
export const useApplicants = () => {
  return useQuery({
    queryKey: ["applicants"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(APPLICANTS_TABLE)
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

// Create a new applicant
export const useCreateApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newApplicant: {
      name: string;
      surname: string;
      job_title?: string;
      location?: string;
      id_number?: number;
      photo?: string;
      cv?: string;
      category?: string;
      drivers_license?: boolean;
      transport?: boolean;
      notes?: string;
      salary?: number;
      experience_level?: number;
      job_spec_id?: string;
      status?: string;
    }) => {
      const { data, error } = await supabase
        .from(APPLICANTS_TABLE)
        .insert([newApplicant])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
    },
  });
};

// Update an applicant
export const useUpdateApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: {
        name?: string;
        surname?: string;
        job_title?: string;
        location?: string;
        id_number?: number;
        photo?: string;
        cv?: string;
        category?: string;
        drivers_license?: boolean;
        transport?: boolean;
        notes?: string;
        salary?: number;
        experience_level?: number;
        job_spec_id?: string;
        status?: string;
      };
    }) => {
      const { data, error } = await supabase
        .from(APPLICANTS_TABLE)
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
    },
  });
};

// Delete an applicant
export const useDeleteApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from(APPLICANTS_TABLE)
        .delete()
        .eq("id", id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
    },
  });
};
