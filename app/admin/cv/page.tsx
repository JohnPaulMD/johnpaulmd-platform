"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import {
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Save,
  Upload,
} from "lucide-react";

import {
  db,
} from "@/lib/firebase";

import uploadCV from "@/services/cv/uploadCV";

/* ================================= */
/* TYPES */
/* ================================= */

interface CVData {
  title: string;

  description: string;

  fileName: string;

  fileUrl: string;

  publicId: string;
}

/* ================================= */
/* DEFAULT DATA */
/* ================================= */

const defaultCVData: CVData = {
  title:
    "Professional CV",

  description:
    "View or download my current curriculum vitae covering education, research, professional experience and technical expertise.",

  fileName: "",

  fileUrl: "",

  publicId: "",
};

export default function AdminCVPage() {
  const inputRef =
    useRef<HTMLInputElement>(
      null
    );

  const [
    cvData,
    setCVData,
  ] =
    useState<CVData>(
      defaultCVData
    );

  const [
    selectedFile,
    setSelectedFile,
  ] =
    useState<File | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  /* ================================= */
  /* LOAD CURRENT CV */
  /* ================================= */

  useEffect(() => {
    async function loadCV() {
      try {
        setLoading(true);

        setError("");

        const cvRef =
          doc(
            db,
            "siteSettings",
            "cv"
          );

        const snapshot =
          await getDoc(
            cvRef
          );

        if (
          snapshot.exists()
        ) {
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
              data.fileName ||
              "",

            fileUrl:
              data.fileUrl ||
              "",

            publicId:
              data.publicId ||
              "",
          });
        }
      } catch (error) {
        console.error(
          "Failed to load CV:",
          error
        );

        setError(
          "Unable to load the current CV information."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCV();
  }, []);

  /* ================================= */
  /* SELECT PDF */
  /* ================================= */

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setSuccess("");
    setError("");

    const file =
      event.target
        .files?.[0];

    if (!file) {
      return;
    }

    /* PDF ONLY */

    if (
      file.type !==
      "application/pdf"
    ) {
      setSelectedFile(
        null
      );

      setError(
        "Please select a PDF document."
      );

      event.target.value =
        "";

      return;
    }

    /* MAXIMUM 10 MB */

    const maximumSize =
      10 * 1024 * 1024;

    if (
      file.size >
      maximumSize
    ) {
      setSelectedFile(
        null
      );

      setError(
        "The CV must be 10 MB or smaller."
      );

      event.target.value =
        "";

      return;
    }

    setSelectedFile(
      file
    );
  }

  /* ================================= */
  /* SAVE CV */
  /* ================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      !cvData.title.trim()
    ) {
      setError(
        "Please enter a CV title."
      );

      return;
    }

    try {
      setSaving(true);

      setSuccess("");

      setError("");

      let fileUrl =
        cvData.fileUrl;

      let fileName =
        cvData.fileName;

      let publicId =
        cvData.publicId;

      /* ================================= */
      /* UPLOAD NEW PDF IF SELECTED */
      /* ================================= */

      if (selectedFile) {
        const uploaded =
          await uploadCV(
            selectedFile
          );

        fileUrl =
          uploaded.url;

        fileName =
          selectedFile.name;

        publicId =
          uploaded.publicId;
      }

      /* ================================= */
      /* SAVE INFORMATION TO FIRESTORE */
      /* ================================= */

      const cvRef =
        doc(
          db,
          "siteSettings",
          "cv"
        );

      await setDoc(
        cvRef,
        {
          title:
            cvData.title.trim(),

          description:
            cvData.description.trim(),

          fileName,

          fileUrl,

          publicId,

          updatedAt:
            serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      /* ================================= */
      /* UPDATE LOCAL STATE */
      /* ================================= */

      setCVData(
        (current) => ({
          ...current,

          fileName,

          fileUrl,

          publicId,
        })
      );

      setSelectedFile(
        null
      );

      if (
        inputRef.current
      ) {
        inputRef.current.value =
          "";
      }

      setSuccess(
        selectedFile
          ? "CV uploaded successfully."
          : "CV information updated successfully."
      );
    } catch (error) {
      console.error(
        "Failed to update CV:",
        error
      );

      if (
        error instanceof
        Error
      ) {
        setError(
          error.message
        );
      } else {
        setError(
          "Unable to update the CV. Please try again."
        );
      }
    } finally {
      setSaving(false);
    }
  }

  /* ================================= */
  /* LOADING */
  /* ================================= */

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">

        <div className="text-center">

          <Loader2
            size={38}
            className="mx-auto animate-spin text-[#071A3D]"
          />

          <p className="mt-4 text-gray-500">
            Loading CV settings...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="mb-8">

        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
          Website Settings
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#071A3D] md:text-4xl">
          CV Management
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-gray-500">
          Upload, replace and manage the
          curriculum vitae available on
          your public website.
        </p>

      </div>

      {/* ================================= */}
      {/* CURRENT CV */}
      {/* ================================= */}

      <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#071A3D]/5">

              <FileText
                size={26}
                className="text-[#071A3D]"
              />

            </div>

            <div>

              <p className="text-sm font-semibold text-gray-400">
                Current CV
              </p>

              <h2 className="mt-1 break-all font-bold text-[#071A3D]">

                {cvData.fileName ||
                  "No CV uploaded yet"}

              </h2>

            </div>

          </div>

          {/* VIEW CURRENT */}

          {cvData.fileUrl && (

            <a
              href={
                cvData.fileUrl
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#071A3D]/20 px-5 py-3 text-sm font-semibold text-[#071A3D] transition hover:bg-[#071A3D]/5"
            >

              <Download
                size={17}
              />

              View Current CV

            </a>

          )}

        </div>

      </div>

      {/* ================================= */}
      {/* FORM */}
      {/* ================================= */}

      <form
        onSubmit={
          handleSubmit
        }
        className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
      >

        {/* ================================= */}
        {/* CV INFORMATION */}
        {/* ================================= */}

        <div className="border-b border-gray-100 p-6 md:p-8">

          <h2 className="text-xl font-bold text-[#071A3D]">
            CV Information
          </h2>

          <div className="mt-6 space-y-6">

            {/* TITLE */}

            <div>

              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Page Title
              </label>

              <input
                id="title"
                type="text"
                value={
                  cvData.title
                }
                onChange={(
                  event
                ) =>
                  setCVData(
                    (
                      current
                    ) => ({
                      ...current,

                      title:
                        event
                          .target
                          .value,
                    })
                  )
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#071A3D] focus:ring-2 focus:ring-[#071A3D]/10"
              />

            </div>

            {/* DESCRIPTION */}

            <div>

              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Description
              </label>

              <textarea
                id="description"
                rows={4}
                value={
                  cvData.description
                }
                onChange={(
                  event
                ) =>
                  setCVData(
                    (
                      current
                    ) => ({
                      ...current,

                      description:
                        event
                          .target
                          .value,
                    })
                  )
                }
                className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 leading-7 text-gray-900 outline-none transition focus:border-[#071A3D] focus:ring-2 focus:ring-[#071A3D]/10"
              />

            </div>

          </div>

        </div>

        {/* ================================= */}
        {/* DOCUMENT UPLOAD */}
        {/* ================================= */}

        <div className="p-6 md:p-8">

          <h2 className="text-xl font-bold text-[#071A3D]">
            CV Document
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Upload a PDF document to add
            or replace the CV currently
            available on your website.
          </p>

          {/* UPLOAD AREA */}

          <div
            onClick={() => {
              if (!saving) {
                inputRef.current?.click();
              }
            }}
            className={`mt-6 flex min-h-[220px] items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
              saving
                ? "cursor-not-allowed border-gray-300 bg-gray-50 opacity-70"
                : "cursor-pointer border-gray-300 bg-gray-50 hover:border-[#071A3D]/50 hover:bg-[#071A3D]/5"
            }`}
          >

            {saving ? (

              <div>

                <Loader2
                  size={35}
                  className="mx-auto animate-spin text-[#071A3D]"
                />

                <p className="mt-4 font-bold text-[#071A3D]">
                  Uploading CV...
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Please wait while the
                  document is uploaded.
                </p>

              </div>

            ) : (

              <div>

                <Upload
                  size={36}
                  className="mx-auto text-[#071A3D]"
                />

                <p className="mt-4 font-bold text-[#071A3D]">

                  {selectedFile
                    ? selectedFile.name
                    : cvData.fileUrl
                    ? "Click to replace current CV"
                    : "Click to upload CV"}

                </p>

                <p className="mt-2 text-sm text-gray-500">
                  PDF document only
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Maximum file size: 10 MB
                </p>

              </div>

            )}

          </div>

          {/* HIDDEN INPUT */}

          <input
            ref={
              inputRef
            }
            type="file"
            hidden
            accept="application/pdf,.pdf"
            disabled={
              saving
            }
            onChange={
              handleFileChange
            }
          />

          {/* SELECTED FILE */}

          {selectedFile &&
            !saving && (

            <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">

              <p className="text-sm font-semibold text-blue-700">
                Selected:{" "}
                {
                  selectedFile.name
                }
              </p>

              {cvData.fileUrl && (

                <p className="mt-1 text-xs text-blue-600">
                  This document will replace
                  the CV currently displayed
                  on your website after you
                  click Save Changes.
                </p>

              )}

            </div>

          )}

        </div>

        {/* ================================= */}
        {/* ERROR */}
        {/* ================================= */}

        {error && (

          <div className="px-6 pb-5 md:px-8">

            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </div>

          </div>

        )}

        {/* ================================= */}
        {/* SUCCESS */}
        {/* ================================= */}

        {success && (

          <div className="px-6 pb-5 md:px-8">

            <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">

              <CheckCircle2
                size={19}
                className="shrink-0"
              />

              {success}

            </div>

          </div>

        )}

        {/* ================================= */}
        {/* SAVE */}
        {/* ================================= */}

        <div className="flex justify-end border-t border-gray-100 bg-gray-50 p-6 md:px-8">

          <button
            type="submit"
            disabled={
              saving
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#071A3D] px-6 py-3 font-semibold text-white transition hover:bg-[#0B2858] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >

            {saving ? (

              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Saving...
              </>

            ) : (

              <>
                <Save
                  size={18}
                />

                Save Changes
              </>

            )}

          </button>

        </div>

      </form>

    </div>
  );
}