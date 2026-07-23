"use client";

import {
  useEffect,
  useState,
} from "react";

import { useParams } from "next/navigation";

import InnovationEditor, {
  InnovationData,
} from "@/components/admin/InnovationEditor";

import { getInnovationById } from "@/services/innovation/getInnovationById";

export default function EditInnovationPage() {
  const params = useParams();

  const id =
    typeof params.id === "string"
      ? params.id
      : "";

  const [
    innovation,
    setInnovation,
  ] =
    useState<InnovationData | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!id) return;

    async function loadInnovation() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getInnovationById(
            id
          );

        if (!data) {
          setError(
            "Innovation project not found."
          );

          return;
        }

        const innovationData: InnovationData = {
          ...data,
        };

        delete (
          innovationData as InnovationData & {
            id?: string;
          }
        ).id;

        setInnovation(
          innovationData
        );
      } catch (error) {
        console.error(
          "Failed to load innovation:",
          error
        );

        setError(
          "Unable to load this innovation project."
        );
      } finally {
        setLoading(false);
      }
    }

    loadInnovation();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#071A3D]" />

        <p className="mt-4 text-gray-500">
          Loading innovation...
        </p>

      </div>
    );
  }

  if (
    error ||
    !innovation
  ) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

        <h1 className="text-2xl font-bold text-[#071A3D]">
          Innovation unavailable
        </h1>

        <p className="mt-3 text-gray-500">
          {error}
        </p>

      </div>
    );
  }

  return (
    <div>

      <h1 className="mb-8 text-4xl font-bold text-[#071A3D]">
        Edit Innovation
      </h1>

      <InnovationEditor
        innovationId={id}
        initialData={innovation}
      />

    </div>
  );
}