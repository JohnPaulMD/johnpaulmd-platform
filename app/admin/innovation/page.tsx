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
  Edit,
  Lightbulb,
  Plus,
  Trash2,
} from "lucide-react";

import { db } from "@/lib/firebase";

interface InnovationItem {
  id: string;

  title: string;
  slug: string;

  category: string;

  status:
    | "Concept"
    | "In Development"
    | "Completed";

  shortDescription: string;

  technologies: string[];

  featured: boolean;

  publishStatus:
    | "Draft"
    | "Published";
}

export default function AdminInnovationPage() {
  const router = useRouter();

  const [
    innovations,
    setInnovations,
  ] = useState<
    InnovationItem[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [
    deletingId,
    setDeletingId,
  ] = useState<
    string | null
  >(null);

  async function loadInnovations() {
    try {
      setLoading(true);

      const innovationQuery =
        query(
          collection(
            db,
            "innovations"
          ),

          orderBy(
            "createdAt",
            "desc"
          )
        );

      const snapshot =
        await getDocs(
          innovationQuery
        );

      const items:
        InnovationItem[] =
        snapshot.docs.map(
          (document) => {
            const data =
              document.data();

            return {
              id:
                document.id,

              title:
                data.title ||
                "Untitled Innovation",

              slug:
                data.slug || "",

              category:
                data.category ||
                "Innovation",

              status:
                data.status ||
                "Concept",

              shortDescription:
                data.shortDescription ||
                "",

              technologies:
                data.technologies ||
                [],

              featured:
                data.featured ||
                false,

              publishStatus:
                data.publishStatus ||
                "Draft",
            };
          }
        );

      setInnovations(items);
    } catch (error) {
      console.error(
        "Failed to load innovations:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  void Promise.resolve().then(
    loadInnovations
  );
}, []);

  async function handleDelete(
    id: string,
    title: string
  ) {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${title}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await deleteDoc(
        doc(
          db,
          "innovations",
          id
        )
      );

      setInnovations(
        (current) =>
          current.filter(
            (item) =>
              item.id !== id
          )
      );
    } catch (error) {
      console.error(
        "Failed to delete innovation:",
        error
      );

      alert(
        "Failed to delete innovation."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>

          <h1 className="text-4xl font-bold text-[#071A3D]">
            Innovation
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your innovation,
            technology and experimental
            projects.
          </p>

        </div>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/admin/innovation/new"
            )
          }
          className="flex items-center gap-2 rounded-xl bg-[#071A3D] px-6 py-3 font-semibold text-white transition hover:bg-[#0A2557]"
        >
          <Plus size={18} />

          New Innovation
        </button>

      </div>

      {/* LIBRARY */}

      <div className="rounded-3xl bg-white p-8 shadow-sm">

        <div className="mb-8">

          <h2 className="text-2xl font-bold text-[#071A3D]">
            Innovation Library
          </h2>

          <p className="mt-2 text-gray-500">
            Manage projects in your
            Innovation Lab.
          </p>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="py-16 text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#071A3D]" />

            <p className="mt-4 text-gray-500">
              Loading innovations...
            </p>

          </div>

        )}

        {/* EMPTY */}

        {!loading &&
          innovations.length ===
            0 && (

          <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">

            <Lightbulb
              size={38}
              className="mx-auto text-gray-400"
            />

            <h3 className="mt-4 font-semibold text-[#071A3D]">
              No innovations yet
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Create your first
              Innovation Lab project.
            </p>

          </div>

        )}

        {/* ITEMS */}

        {!loading &&
          innovations.length >
            0 && (

          <div className="space-y-4">

            {innovations.map(
              (innovation) => (

                <div
                  key={
                    innovation.id
                  }
                  className="rounded-2xl border border-gray-200 p-6 transition hover:shadow-sm"
                >

                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

                    <div className="min-w-0 flex-1">

                      <div className="mb-3 flex flex-wrap gap-2">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            innovation.publishStatus ===
                            "Published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {
                            innovation.publishStatus
                          }
                        </span>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                          {
                            innovation.status
                          }
                        </span>

                        {innovation.featured && (

                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            Featured
                          </span>

                        )}

                      </div>

                      <h3 className="text-xl font-bold text-[#071A3D]">
                        {
                          innovation.title
                        }
                      </h3>

                      <p className="mt-2 text-sm font-medium text-gray-500">
                        {
                          innovation.category
                        }
                      </p>

                      {innovation.shortDescription && (

                        <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
                          {
                            innovation.shortDescription
                          }
                        </p>

                      )}

                      {innovation.technologies.length >
                        0 && (

                        <div className="mt-4 flex flex-wrap gap-2">

                          {innovation.technologies.map(
                            (
                              technology,
                              index
                            ) => (

                              <span
                                key={`${technology}-${index}`}
                                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                              >
                                {
                                  technology
                                }
                              </span>

                            )
                          )}

                        </div>

                      )}

                    </div>

                    {/* ACTIONS */}

                    <div className="flex shrink-0 gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            `/admin/innovation/${innovation.id}/edit`
                          )
                        }
                        className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 font-semibold text-[#071A3D] transition hover:bg-gray-50"
                      >
                        <Edit
                          size={17}
                        />

                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={
                          deletingId ===
                          innovation.id
                        }
                        onClick={() =>
                          handleDelete(
                            innovation.id,
                            innovation.title
                          )
                        }
                        className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        <Trash2
                          size={17}
                        />

                        {deletingId ===
                        innovation.id
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