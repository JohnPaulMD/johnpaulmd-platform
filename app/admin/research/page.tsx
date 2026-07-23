"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import {
  BookOpen,
  Edit,
  Plus,
  Trash2,
} from "lucide-react";

import { db } from "@/lib/firebase";

interface ResearchItem {
  id: string;

  title: string;

  slug: string;

  category: string;

  shortDescription: string;

  authors: string[];

  featured: boolean;

  publishStatus:
    | "Draft"
    | "Published";
}

export default function AdminResearchPage() {
  const router = useRouter();

  const [
    researchItems,
    setResearchItems,
  ] = useState<ResearchItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    deletingId,
    setDeletingId,
  ] = useState<string | null>(
    null
  );

  /* ================================= */
  /* LOAD RESEARCH */
  /* ================================= */

  async function loadResearch() {
    try {
      setLoading(true);

      setError("");

      const researchQuery =
        query(
          collection(
            db,
            "research"
          ),
          orderBy(
            "createdAt",
            "desc"
          )
        );

      const snapshot =
        await getDocs(
          researchQuery
        );

      const items:
        ResearchItem[] =
        snapshot.docs.map(
          (document) => {
            const data =
              document.data();

            return {
              id:
                document.id,

              title:
                data.title ||
                "Untitled Research",

              slug:
                data.slug ||
                "",

              category:
                data.category ||
                "Research",

              shortDescription:
                data.shortDescription ||
                data.abstract ||
                "",

              authors:
                Array.isArray(
                  data.authors
                )
                  ? data.authors
                  : [],

              featured:
                Boolean(
                  data.featured
                ),

              publishStatus:
                data.publishStatus ===
                "Published"
                  ? "Published"
                  : "Draft",
            };
          }
        );

      setResearchItems(
        items
      );
    } catch (error) {
      console.error(
        "Failed to load research:",
        error
      );

      setError(
        "Could not load research projects."
      );
    } finally {
      setLoading(false);
    }
  }

  /* ================================= */
  /* INITIAL LOAD */
  /* ================================= */

  useEffect(() => {
    void Promise.resolve().then(
      loadResearch
    );
  }, []);

  /* ================================= */
  /* DELETE RESEARCH */
  /* ================================= */

  async function handleDelete(
    id: string,
    title: string
  ) {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${title}"? This action cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await deleteDoc(
        doc(
          db,
          "research",
          id
        )
      );

      setResearchItems(
        (current) =>
          current.filter(
            (item) =>
              item.id !== id
          )
      );
    } catch (error) {
      console.error(
        "Failed to delete research:",
        error
      );

      alert(
        "Research project could not be deleted."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-8">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>

          <h1 className="text-4xl font-bold text-[#071A3D]">
            Research
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your research projects,
            publications and academic work.
          </p>

        </div>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/admin/research/new"
            )
          }
          className="flex items-center gap-2 rounded-xl bg-[#071A3D] px-6 py-3 font-semibold text-white transition hover:bg-[#0A2557]"
        >

          <Plus size={18} />

          New Research

        </button>

      </div>

      {/* ================================= */}
      {/* RESEARCH LIBRARY */}
      {/* ================================= */}

      <div className="rounded-3xl bg-white p-8 shadow-sm">

        <div className="mb-8">

          <h2 className="text-2xl font-bold text-[#071A3D]">
            Research Library
          </h2>

          <p className="mt-2 text-gray-500">
            Manage research projects displayed
            on your website.
          </p>

        </div>

        {/* ================================= */}
        {/* LOADING */}
        {/* ================================= */}

        {loading && (

          <div className="py-16 text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#071A3D]" />

            <p className="mt-4 text-gray-500">
              Loading research...
            </p>

          </div>

        )}

        {/* ================================= */}
        {/* ERROR */}
        {/* ================================= */}

        {!loading &&
          error && (

            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">

              {error}

            </div>

          )}

        {/* ================================= */}
        {/* EMPTY STATE */}
        {/* ================================= */}

        {!loading &&
          !error &&
          researchItems.length ===
            0 && (

            <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">

              <BookOpen
                size={38}
                className="mx-auto text-gray-400"
              />

              <h3 className="mt-4 font-semibold text-[#071A3D]">
                No research projects yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Create your first research
                project.
              </p>

            </div>

          )}

        {/* ================================= */}
        {/* RESEARCH ITEMS */}
        {/* ================================= */}

        {!loading &&
          !error &&
          researchItems.length >
            0 && (

            <div className="space-y-4">

              {researchItems.map(
                (research) => (

                  <div
                    key={
                      research.id
                    }
                    className="rounded-2xl border border-gray-200 p-6 transition hover:shadow-sm"
                  >

                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

                      {/* ================================= */}
                      {/* RESEARCH INFORMATION */}
                      {/* ================================= */}

                      <div className="min-w-0 flex-1">

                        <div className="mb-3 flex flex-wrap gap-2">

                          {/* PUBLISH STATUS */}

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              research.publishStatus ===
                              "Published"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >

                            {
                              research.publishStatus
                            }

                          </span>

                          {/* CATEGORY */}

                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">

                            {
                              research.category
                            }

                          </span>

                          {/* FEATURED */}

                          {research.featured && (

                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                              Featured
                            </span>

                          )}

                        </div>

                        {/* TITLE */}

                        <h3 className="text-xl font-bold text-[#071A3D]">

                          {
                            research.title
                          }

                        </h3>

                        {/* AUTHORS */}

                        {research.authors.length >
                          0 && (

                          <p className="mt-2 text-sm font-medium text-gray-500">

                            {research.authors.join(
                              ", "
                            )}

                          </p>

                        )}

                        {/* DESCRIPTION */}

                        {research.shortDescription && (

                          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">

                            {
                              research.shortDescription
                            }

                          </p>

                        )}

                      </div>

                      {/* ================================= */}
                      {/* ACTIONS */}
                      {/* ================================= */}

                      <div className="flex shrink-0 gap-3">

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              `/admin/research/${research.id}/edit`
                            )
                          }
                          className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 font-semibold text-[#071A3D] transition hover:bg-gray-50"
                        >

                          <Edit
                            size={17}
                          />

                          Edit

                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          disabled={
                            deletingId ===
                            research.id
                          }
                          onClick={() =>
                            handleDelete(
                              research.id,
                              research.title
                            )
                          }
                          className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                          <Trash2
                            size={17}
                          />

                          {deletingId ===
                          research.id
                            ? "Deleting..."
                            : "Delete"}

                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

      </div>

    </div>
  );
}