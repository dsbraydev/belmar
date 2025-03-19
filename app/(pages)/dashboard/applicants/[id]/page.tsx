"use client";
import { useApplicantById } from "@/app/api/Applicants";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";

export default function Applicant() {
  const { id } = useParams();

  const { data: applicant, isLoading } = useApplicantById(id as string);

  if (isLoading) return <Loader />;

  return <div>Applicant: {applicant.name}</div>;
}
