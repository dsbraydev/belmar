"use client";
import { useJobSpecById } from "@/app/api/JobSpecs";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";

const JobSpec = () => {
  const { id } = useParams();

  const { data: jobSpec, isLoading } = useJobSpecById(id as string);

  if (isLoading) return <Loader />;

  return <div>Spec: {jobSpec.title}</div>;
};

export default JobSpec;
