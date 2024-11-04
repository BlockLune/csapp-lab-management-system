"use client";

import { useParams } from "next/navigation";

export default function LabSolutionPage() {
  const { labId } = useParams();

  return <p>Lab {labId}</p>;
}
