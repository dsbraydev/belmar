import { useQuery } from "@tanstack/react-query";
import supabase from "../client";

// 🟢 GET: Fetch job_specs with related applicants
export const fetchJobSpecsWithApplicants = async () => {
  const { data, error } = await supabase
    .from("job_specs")
    .select("*, applicants(*)"); // Fetch job_specs with related applicants

  if (error) throw error;
  return data;
};

// ✅ Hook to get job_specs with applicants
export const useJobSpecsWithApplicants = () => {
  return useQuery({
    queryKey: ["job_specs_with_applicants"],
    queryFn: fetchJobSpecsWithApplicants,
  });
};

export const fetchJobSpecById = async (id: string | number) => {
  const { data, error } = await supabase
    .from("job_specs")
    .select("*, applicants(*)") // Fetch job with related applicants
    .eq("id", id) // Filter by the given id
    .single(); // Ensure a single object is returned

  if (error) throw error;
  return data;
};

export const useJobSpecById = (id: string | number) => {
  return useQuery({
    queryKey: ["job_spec", id],
    queryFn: () => fetchJobSpecById(id),
    enabled: !!id, // Ensure the query only runs if ID is available
  });
};
