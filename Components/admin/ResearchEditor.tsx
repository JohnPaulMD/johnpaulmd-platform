"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { createResearch } from "@/services/research/createResearch";
import { updateResearch } from "@/services/research/updateResearch";

export interface ResearchData {
  title: string;
  slug: string;

  category: string;

  status:
    | "Ongoing"
    | "Completed";

  shortDescription: string;
  abstract: string;

  authors: string[];
  keywords: string[];

  year: string;

  image: string;

  publicationUrl: string;
  doiUrl: string;

  featured: boolean;

  publishStatus:
    | "Draft"
    | "Published";
}

interface ResearchEditorProps {
  researchId?: string;

  initialData?: ResearchData;
}

const defaultResearchData: ResearchData = {
  title: "",
  slug: "",

  category: "",

  status: "Ongoing",

  shortDescription: "",
  abstract: "",

  authors: [],
  keywords: [],

  year: new Date()
    .getFullYear()
    .toString(),

  image: "",

  publicationUrl: "",
  doiUrl: "",

  featured: false,

  publishStatus: "Draft",
};

export default function ResearchEditor({
  researchId,
  initialData,
}: ResearchEditorProps) {
  const router = useRouter();

  const [research, setResearch] =
    useState<ResearchData>(() =>
      initialData
        ? { ...initialData }
        : { ...defaultResearchData }
    );

  const [author, setAuthor] =
    useState("");

  const [keyword, setKeyword] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [saveError, setSaveError] =
    useState("");

  const isEditing = Boolean(
    researchId
  );

function updateField<
    K extends keyof ResearchData
  >(
    field: K,
    value: ResearchData[K]
  ) {
    setResearch((previous) => ({
      ...previous,

      [field]: value,
    }));
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

    setResearch((previous) => ({
      ...previous,

      title,

      slug:
        isEditing &&
        previous.slug
          ? previous.slug
          : slug,
    }));
  }

  function addAuthor() {
    const value =
      author.trim();

    if (!value) return;

    setResearch((previous) => ({
      ...previous,

      authors: [
        ...previous.authors,
        value,
      ],
    }));

    setAuthor("");
  }

  function removeAuthor(
    index: number
  ) {
    setResearch((previous) => ({
      ...previous,

      authors:
        previous.authors.filter(
          (_, i) =>
            i !== index
        ),
    }));
  }

  function addKeyword() {
    const value =
      keyword.trim();

    if (!value) return;

    setResearch((previous) => ({
      ...previous,

      keywords: [
        ...previous.keywords,
        value,
      ],
    }));

    setKeyword("");
  }

  function removeKeyword(
    index: number
  ) {
    setResearch((previous) => ({
      ...previous,

      keywords:
        previous.keywords.filter(
          (_, i) =>
            i !== index
        ),
    }));
  }

  async function handleSave() {
    if (
      !research.title.trim()
    ) {
      setSaveError(
        "Please enter a research title."
      );

      return;
    }

    if (
      !research.slug.trim()
    ) {
      setSaveError(
        "Please enter a research slug."
      );

      return;
    }

    try {
      setSaving(true);

      setSaveError("");

      if (
        isEditing &&
        researchId
      ) {
        await updateResearch(
          researchId,
          research
        );

        alert(
          "Research updated successfully!"
        );
      } else {
        await createResearch(
          research
        );

        alert(
          "Research saved successfully!"
        );
      }

      router.push(
        "/admin/research"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Research save failed:",
        error
      );

      setSaveError(
        isEditing
          ? "Failed to update research. Please try again."
          : "Failed to save research. Please try again."
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
              Research Title
            </label>

            <input
              value={
                research.title
              }
              onChange={(event) =>
                handleTitleChange(
                  event.target.value
                )
              }
              placeholder="Enter research title"
              className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Slug
            </label>

            <input
              value={
                research.slug
              }
              onChange={(event) =>
                updateField(
                  "slug",
                  event.target.value
                )
              }
              placeholder="research-project-slug"
              className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
            />

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            <div>

              <label className="mb-2 block font-semibold text-gray-700">
                Category
              </label>

              <input
                value={
                  research.category
                }
                onChange={(event) =>
                  updateField(
                    "category",
                    event.target.value
                  )
                }
                placeholder="e.g. Anatomy"
                className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
              />

            </div>

            <div>

              <label className="mb-2 block font-semibold text-gray-700">
                Research Status
              </label>

              <select
                value={
                  research.status
                }
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target.value as
                      | "Ongoing"
                      | "Completed"
                  )
                }
                className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
              >

                <option value="Ongoing">
                  Ongoing
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

            </div>

            <div>

              <label className="mb-2 block font-semibold text-gray-700">
                Year
              </label>

              <input
                value={
                  research.year
                }
                onChange={(event) =>
                  updateField(
                    "year",
                    event.target.value
                  )
                }
                placeholder="2026"
                className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
              />

            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-8 text-2xl font-bold text-[#071A3D]">
          Research Content
        </h2>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Short Description
            </label>

            <textarea
              rows={3}
              value={
                research.shortDescription
              }
              onChange={(event) =>
                updateField(
                  "shortDescription",
                  event.target.value
                )
              }
              placeholder="Brief description of the research..."
              className="w-full rounded-xl border border-gray-300 p-4 text-gray-900"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Abstract / Overview
            </label>

            <textarea
              rows={10}
              value={
                research.abstract
              }
              onChange={(event) =>
                updateField(
                  "abstract",
                  event.target.value
                )
              }
              placeholder="Enter the research abstract or project overview..."
              className="w-full rounded-xl border border-gray-300 p-4 text-gray-900"
            />

          </div>

        </div>

      </section>

      {/* AUTHORS */}

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold text-[#071A3D]">
          Authors
        </h2>

        <div className="flex gap-3">

          <input
            value={author}
            onChange={(event) =>
              setAuthor(
                event.target.value
              )
            }
            placeholder="Author name"
            className="flex-1 rounded-xl border border-gray-300 p-3 text-gray-900"
          />

          <button
            type="button"
            onClick={addAuthor}
            className="rounded-xl bg-[#071A3D] px-6 font-semibold text-white"
          >
            Add
          </button>

        </div>

        <div className="mt-5 space-y-3">

          {research.authors.map(
            (item, index) => (

              <div
                key={`${item}-${index}`}
                className="flex items-center justify-between rounded-xl bg-[#F8F7F3] p-4 text-gray-800"
              >

                <span>
                  {item}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    removeAuthor(
                      index
                    )
                  }
                  className="font-bold text-red-500"
                >
                  ✕
                </button>

              </div>

            )
          )}

        </div>

      </section>

      {/* KEYWORDS */}

      <section className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold text-[#071A3D]">
          Keywords
        </h2>

        <div className="flex gap-3">

          <input
            value={keyword}
            onChange={(event) =>
              setKeyword(
                event.target.value
              )
            }
            placeholder="e.g. Oxidative stress"
            className="flex-1 rounded-xl border border-gray-300 p-3 text-gray-900"
          />

          <button
            type="button"
            onClick={addKeyword}
            className="rounded-xl bg-[#071A3D] px-6 font-semibold text-white"
          >
            Add
          </button>

        </div>

        <div className="mt-6 flex flex-wrap gap-3">

          {research.keywords.map(
            (item, index) => (

              <div
                key={`${item}-${index}`}
                className="flex items-center gap-3 rounded-full bg-[#071A3D] px-5 py-2 text-white"
              >

                {item}

                <button
                  type="button"
                  onClick={() =>
                    removeKeyword(
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
          Publication Links
        </h2>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Publication URL
            </label>

            <input
              type="url"
              value={
                research.publicationUrl
              }
              onChange={(event) =>
                updateField(
                  "publicationUrl",
                  event.target.value
                )
              }
              placeholder="https://..."
              className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              DOI URL
            </label>

            <input
              type="url"
              value={
                research.doiUrl
              }
              onChange={(event) =>
                updateField(
                  "doiUrl",
                  event.target.value
                )
              }
              placeholder="https://doi.org/..."
              className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
            />

          </div>

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
                Featured Research
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Display this research project on the home page.
              </p>

            </div>

            <input
              type="checkbox"
              checked={
                research.featured
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
                Control whether this research is publicly visible.
              </p>

            </div>

            <select
              value={
                research.publishStatus
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
                  "/admin/research"
                )
              }
              disabled={saving}
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-[#071A3D] px-8 py-3 font-semibold text-white transition hover:bg-[#0A2557] disabled:cursor-not-allowed disabled:opacity-60"
            >

              {saving
                ? isEditing
                  ? "Updating..."
                  : "Saving..."
                : isEditing
                ? "Update Research"
                : "Save Research"}

            </button>

          </div>

        </div>

      </section>

    </div>
  );
}