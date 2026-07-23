"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  ArrowLeft,
  Download,
  FileText,
  Loader2,
} from "lucide-react";

import { db } from "@/lib/firebase";

interface CVData {
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
}

const defaultCVData: CVData = {
  title: "Professional CV",

  description:
    "View or download my current curriculum vitae covering education, research, professional experience and technical expertise.",

  fileName: "",

  fileUrl: "",
};

export default function CVPage() {
  const [
    cvData,
    setCVData,
  ] =
    useState<CVData>(
      defaultCVData
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* ================================= */
  /* LOAD CV FROM FIRESTORE */
  /* ================================= */

  useEffect(() => {
    async function loadCV() {
      try {
        setLoading(true);
        setError("");

        const cvRef = doc(
          db,
          "siteSettings",
          "cv"
        );

        const snapshot =
          await getDoc(cvRef);

        if (snapshot.exists()) {
          const data =
            snapshot.data();

          setCVData({
            title:
              data.title ||
              defaultCVData.title,

            description:
              data.description ||
              defaultCVData.description,

            fileName:
              data.fileName || "",

            fileUrl:
              data.fileUrl || "",
          });
        }
      } catch (error) {
        console.error(
          "Failed to load CV:",
          error
        );

        setError(
          "Unable to load the CV at the moment."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCV();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F7F3]">

      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}

      <section className="bg-[#071A3D] px-4 pb-14 pt-32 text-white sm:px-6 sm:pb-16 sm:pt-36 lg:pb-20">

        <div className="mx-auto max-w-5xl">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-white"
          >
            <ArrowLeft
              size={17}
            />

            Back to Home
          </Link>

          <div className="mt-10 max-w-3xl">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Curriculum Vitae
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">

              {loading
                ? defaultCVData.title
                : cvData.title}

            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">

              {loading
                ? defaultCVData.description
                : cvData.description}

            </p>

          </div>

        </div>

      </section>

      {/* ================================= */}
      {/* CV CONTENT */}
      {/* ================================= */}

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">

        <div className="mx-auto max-w-4xl">

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">

            {/* LOADING */}

            {loading && (

              <div className="py-12 text-center">

                <Loader2
                  size={38}
                  className="mx-auto animate-spin text-[#071A3D]"
                />

                <p className="mt-4 text-gray-500">
                  Loading CV...
                </p>

              </div>

            )}

            {/* ERROR */}

            {!loading &&
              error && (

              <div className="py-10 text-center">

                <FileText
                  size={45}
                  className="mx-auto text-gray-300"
                />

                <h2 className="mt-5 text-xl font-bold text-[#071A3D]">
                  CV unavailable
                </h2>

                <p className="mt-2 text-gray-500">
                  {error}
                </p>

              </div>

            )}

            {/* CV AVAILABLE */}

            {!loading &&
              !error &&
              cvData.fileUrl && (

              <div className="flex flex-col items-center text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#071A3D]/5">

                  <FileText
                    size={31}
                    className="text-[#071A3D]"
                  />

                </div>

                <h2 className="mt-6 text-2xl font-bold text-[#071A3D] sm:text-3xl">
                  JohnPaul Ozoigbo
                </h2>

                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
                  Manus Dei Solutions
                </p>

                <p className="mt-6 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                  The latest version of my
                  curriculum vitae is
                  available below.
                </p>

                {cvData.fileName && (

                  <div className="mt-6 rounded-xl bg-[#F8F7F3] px-5 py-3">

                    <p className="break-all text-sm font-medium text-gray-600">
                      {cvData.fileName}
                    </p>

                  </div>

                )}

                {/* DOWNLOAD */}

                <a
                  href={
                    cvData.fileUrl
                  }
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#071A3D] px-7 py-3.5 font-semibold text-white transition hover:bg-[#0B2858] sm:w-auto"
                >

                  <Download
                    size={18}
                  />

                  Download CV

                </a>

                {/* VIEW ONLINE */}

                <a
                  href={
                    cvData.fileUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-[#071A3D]/20 px-7 py-3.5 font-semibold text-[#071A3D] transition hover:bg-[#071A3D]/5 sm:w-auto"
                >
                  View CV
                </a>

              </div>

            )}

            {/* NO CV YET */}

            {!loading &&
              !error &&
              !cvData.fileUrl && (

              <div className="py-10 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#071A3D]/5">

                  <FileText
                    size={30}
                    className="text-[#071A3D]"
                  />

                </div>

                <h2 className="mt-6 text-2xl font-bold text-[#071A3D]">
                  CV Coming Soon
                </h2>

                <p className="mx-auto mt-3 max-w-lg leading-7 text-gray-500">
                  The current curriculum
                  vitae has not yet been
                  uploaded.
                </p>

              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}