import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../client";

// 🟢 GET: Fetch all applicants
export const fetchApplicants = async () => {
  const { data, error } = await supabase.from("applicants").select("*");
  if (error) throw error;
  return data;
};

// ✅ Hook to get applicants
export const useApplicants = () => {
  return useQuery({
    queryKey: ["applicants"],
    queryFn: fetchApplicants,
  });
};

// 🔵 CREATE: Add a new applicant
export const createApplicant = async (data: any) => {
  const { data: newApplicant, error } = await supabase
    .from("applicants")
    .insert(data)
    .select("*")
    .single();
  if (error) throw error;
  return newApplicant;
};

// ✅ Hook to create an applicant
export const useCreateApplicant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createApplicant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
      // Refresh cache
    },
  });
};

// 🟡 UPDATE: Edit an applicant
export const updateApplicant = async (id: string, data: any) => {
  const { data: updatedApplicant, error } = await supabase
    .from("applicants")
    .update(data)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return updatedApplicant;
};

// ✅ Hook to update an applicant
export const useUpdateApplicant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateApplicant(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
    },
  });
};

// 🔴 DELETE: Remove an applicant
export const deleteApplicant = async (id: string) => {
  const { error } = await supabase.from("applicants").delete().eq("id", id);
  if (error) throw error;
  return id;
};

// ✅ Hook to delete an applicant
export const useDeleteApplicant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteApplicant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
    },
  });
};

export const fetchApplicantById = async (id: string | number) => {
  const { data, error } = await supabase
    .from("applicants")
    .select("*")
    .eq("id", id)
    .single(); // Ensures only one result is returned

  if (error) throw error;
  return data;
};

export const useApplicantById = (id?: string | number) => {
  return useQuery({
    queryKey: ["applicant", id],
    queryFn: () =>
      id ? fetchApplicantById(id) : Promise.reject("No ID provided"),
    enabled: !!id, // Ensures the query only runs if ID is available
  });
};
