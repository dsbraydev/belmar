import supabase from "../client";

export const fetchApplicants = async () => {
  try {
    const { data, error } = await supabase.from("applicants").select("*");
    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching applicants:", error);
    throw error;
  }
};

export const updateApplicant = async (data: any, id: string) => {
  try {
    const { error } = await supabase
      .from("applicants")
      .update(data)
      .eq("id", id)
      .select("*");

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error("Error updating applicant:", err);
    return { success: false };
  }
};

export const createApplicant = async (data: any) => {
  try {
    const { error } = await supabase.from("applicants").insert(data);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error("Error creating applicant:", err);
    return { success: false };
  }
};

export const deleteApplicant = async (id: string) => {
  try {
    const { error } = await supabase.from("applicants").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.error("Error deleting applicant:", err);
    return { success: false };
  }
};
