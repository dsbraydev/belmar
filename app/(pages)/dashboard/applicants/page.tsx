"use client";
import { useApplicants } from "@/app/api/Applicants";
import Loader from "@/components/Loader";
import Link from "next/link";

export default function ApplicantsPage() {
  const { data: applicants, isLoading, error } = useApplicants();

  if (isLoading) return <Loader />;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="font-montserrat">Applicants Page</h1>
      <ul>
        {applicants?.map((applicant) => (
          <li key={applicant.id}>
            <Link href={`/dashboard/applicants/${applicant.id}`}>
              {applicant.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
