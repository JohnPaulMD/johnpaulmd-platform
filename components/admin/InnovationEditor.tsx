"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { createInnovation } from "@/services/innovation/createInnovation";
import { updateInnovation } from "@/services/innovation/updateInnovation";

export interface InnovationData {
  title: string;
  slug: string;

  category: string;

  status:
    | "Concept"
    | "In Development"
    | "Completed";

  shortDescription: string;

  overview: string;

  problem: string;

  solution: string;

  technologies: string[];

  image: string;

  liveUrl: string;

  githubUrl: string;

  websiteUrl: string;

  featured: boolean;

  publishStatus:
    | "Draft"
    | "Published";
}

interface InnovationEditorProps {
  innovationId?: string;

  initialData?: InnovationData;
}

const defaultInnovationData:
  InnovationData = {
  title: "",
  slug: "",

  category: "",

  status: "Concept",

  shortDescription: "",

  overview: "",

  problem: "",

  solution: "",

  technologies: [],

  image: "",

  liveUrl: "",

  githubUrl: "",

  websiteUrl: "",

  featured: false,

  publishStatus: "Draft",
};

export default function InnovationEditor({
  innovationId,
  initialData,
}: InnovationEditorProps) {
  const router = useRouter();

  const [
    innovation,
    setInnovation,
  ] = useState<InnovationData>(() =>
    initialData
      ? { ...initialData }
      : { ...defaultInnovationData }
  );

  const [
    technology,
    setTechnology,
  ] = useState("");

  const [saving, setSaving] =
    useState(false);

  const [saveError, setSaveError] =
    useState("");

  const isEditing =
    Boolean(innovationId);

function updateField<
    K extends keyof InnovationData
  >(
    field: K,
    value: InnovationData[K]
  ) {
    setInnovation(
      (previous) => ({
        ...previous,

        [field]: value,
      })
    );
  }

  function handleTitleChange(
    title: string
  ) {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /^-+|-+$/g,
        ""
      );

    setInnovation(
      (previous) => ({
        ...previous,

        title,

        slug:
          isEditing &&
          previous.slug
            ? previous.slug
            : slug,
      })
    );
  }

  function addTechnology() {
    const value =
      technology.trim();

    if (!value) return;

    setInnovation(
      (previous) => ({
        ...previous,

        technologies: [
          ...previous.technologies,
          value,
        ],
      })
    );

    setTechnology("");
  }

  function removeTechnology(
    index: number
  ) {
    setInnovation(
      (previous) => ({
        ...previous,

        technologies:
          previous.technologies.filter(
            (_, i) =>
              i !== index
          ),
      })
    );
  }

  async function handleSave() {
    if (
      !innovation.title.trim()
    ) {
      setSaveError(
        "Please enter an innovation title."
      );

      return;
    }

    if (
      !innovation.slug.trim()
    ) {
      setSaveError(
        "Please enter an innovation slug."
      );

      return;
    }

    try {
      setSaving(true);
      setSaveError("");

      if (
        isEditing &&
        innovationId
      ) {
        await updateInnovation(
          innovationId,
          innovation
        );

        alert(
          "Innovation updated successfully!"
        );
      } else {
        await createInnovation(
          innovation
        );

        alert(
          "Innovation saved successfully!"
        );
      }

      router.push(
        "/admin/innovation"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Innovation save failed:",
        error
      );

      setSaveError(
        isEditing
          ? "Failed to update innovation."
          : "Failed to save innovation."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* GENERAL */}

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-8 text-2xl font-bold text-[#071A3D]">
          General Information
        </h2>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Innovation Title
            </label>

            <input
              value={
                innovation.title
              }
              onChange={(event) =>
                handleTitleChange(
                  event.target.value
                )
              }
              placeholder="Enter innovation title"
              className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Slug
            </label>

            <input
              value={
                innovation.slug
              }
              onChange={(event) =>
                updateField(
                  "slug",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
            />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-semibold text-gray-700">
                Category
              </label>

              <input
                value={
                  innovation.category
                }
                onChange={(event) =>
                  updateField(
                    "category",
                    event.target.value
                  )
                }
                placeholder="e.g. Health Technology"
                className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
              />

            </div>

            <div>

              <label className="mb-2 block font-semibold text-gray-700">
                Project Status
              </label>

              <select
                value={
                  innovation.status
                }
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target.value as
                      | "Concept"
                      | "In Development"
                      | "Completed"
                  )
                }
                className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
              >

                <option value="Concept">
                  Concept
                </option>

                <option value="In Development">
                  In Development
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-8 text-2xl font-bold text-[#071A3D]">
          Project Content
        </h2>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Short Description
            </label>

            <textarea
              rows={3}
              value={
                innovation.shortDescription
              }
              onChange={(event) =>
                updateField(
                  "shortDescription",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 p-4 text-gray-900"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Project Overview
            </label>

            <textarea
              rows={8}
              value={
                innovation.overview
              }
              onChange={(event) =>
                updateField(
                  "overview",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 p-4 text-gray-900"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Problem
            </label>

            <textarea
              rows={5}
              value={
                innovation.problem
              }
              onChange={(event) =>
                updateField(
                  "problem",
                  event.target.value
                )
              }
              placeholder="What problem does this project address?"
              className="w-full rounded-xl border border-gray-300 p-4 text-gray-900"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Solution
            </label>

            <textarea
              rows={5}
              value={
                innovation.solution
              }
              onChange={(event) =>
                updateField(
                  "solution",
                  event.target.value
                )
              }
              placeholder="Describe your proposed solution."
              className="w-full rounded-xl border border-gray-300 p-4 text-gray-900"
            />

          </div>

        </div>

      </section>

      {/* TECHNOLOGY */}

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold text-[#071A3D]">
          Technologies
        </h2>

        <div className="flex gap-3">

          <input
            value={technology}
            onChange={(event) =>
              setTechnology(
                event.target.value
              )
            }
            placeholder="e.g. Next.js"
            className="flex-1 rounded-xl border border-gray-300 p-3 text-gray-900"
          />

          <button
            type="button"
            onClick={
              addTechnology
            }
            className="rounded-xl bg-[#071A3D] px-6 font-semibold text-white"
          >
            Add
          </button>

        </div>

        <div className="mt-6 flex flex-wrap gap-3">

          {innovation.technologies.map(
            (
              item,
              index
            ) => (

              <div
                key={`${item}-${index}`}
                className="flex items-center gap-3 rounded-full bg-[#071A3D] px-5 py-2 text-white"
              >

                {item}

                <button
                  type="button"
                  onClick={() =>
                    removeTechnology(
                      index
                    )
                  }
                >
                  ✕
                </button>

              </div>

            )
          )}

        </div>

      </section>

      {/* LINKS */}

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-8 text-2xl font-bold text-[#071A3D]">
          Project Links
        </h2>

        <div className="space-y-6">

          <input
            value={
              innovation.liveUrl
            }
            onChange={(event) =>
              updateField(
                "liveUrl",
                event.target.value
              )
            }
            placeholder="Live project URL"
            className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
          />

          <input
            value={
              innovation.githubUrl
            }
            onChange={(event) =>
              updateField(
                "githubUrl",
                event.target.value
              )
            }
            placeholder="GitHub repository URL"
            className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
          />

          <input
            value={
              innovation.websiteUrl
            }
            onChange={(event) =>
              updateField(
                "websiteUrl",
                event.target.value
              )
            }
            placeholder="Project website URL"
            className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
          />

        </div>

      </section>

      {/* PUBLISH */}

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-8 text-2xl font-bold text-[#071A3D]">
          Publish
        </h2>

        <div className="space-y-6">

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold text-gray-800">
                Featured Innovation
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Highlight this project
                on the website.
              </p>

            </div>

            <input
              type="checkbox"
              checked={
                innovation.featured
              }
              onChange={(event) =>
                updateField(
                  "featured",
                  event.target.checked
                )
              }
              className="h-5 w-5"
            />

          </div>

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold text-gray-800">
                Publish Status
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Control public
                visibility.
              </p>

            </div>

            <select
              value={
                innovation.publishStatus
              }
              onChange={(event) =>
                updateField(
                  "publishStatus",
                  event.target.value as
                    | "Draft"
                    | "Published"
                )
              }
              className="rounded-xl border border-gray-300 p-3 text-gray-900"
            >

              <option value="Draft">
                Draft
              </option>

              <option value="Published">
                Published
              </option>

            </select>

          </div>

          {saveError && (

            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {saveError}
            </div>

          )}

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/admin/innovation"
                )
              }
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={
                handleSave
              }
              disabled={
                saving
              }
              className="rounded-xl bg-[#071A3D] px-8 py-3 font-semibold text-white disabled:opacity-50"
            >
              {saving
                ? isEditing
                  ? "Updating..."
                  : "Saving..."
                : isEditing
                ? "Update Innovation"
                : "Save Innovation"}
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}