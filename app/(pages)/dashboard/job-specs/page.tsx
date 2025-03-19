"use client";
import { useJobSpecsWithApplicants } from "@/app/api/JobSpecs";
import Link from "next/link";
import Loader from "@/components/Loader";

export default function JobSpecsPage() {
  const { data, error, isLoading } = useJobSpecsWithApplicants();

  if (isLoading) return <Loader />;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.map((jobSpec) => (
        <div key={jobSpec.id}>
          <Link href={`/dashboard/job-specs/${jobSpec.id}`}>
            {jobSpec.title}
          </Link>
          <ul>
            {jobSpec.applicants?.map((applicant: any) => (
              <li key={applicant.id}>{applicant.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
