"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const headerLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Job Specs", href: "/dashboard/job-specs" },
  { name: "Applicants", href: "/dashboard/applicants" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {headerLinks.map((link: { name: string; href: string }) => {
        const isPage = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`hover:text-sageGreen hover:opacity-80 duration-500 ${isPage && "text-sageGreen"}`}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
