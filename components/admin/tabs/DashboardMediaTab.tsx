"use client";

import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import type { DashboardData } from "../DashboardEditor";

import uploadDashboardImage from "@/services/dashboards/uploadDashboardImage";

interface Props {
  dashboard: DashboardData;

  setDashboard: Dispatch<
    SetStateAction<DashboardData>
  >;
}

export default function DashboardMediaTab({
  dashboard,
  setDashboard,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  async function handleImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setSuccess("");

    // Check file type

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(file.type)
    ) {
      setError(
        "Please select a JPG, PNG or WEBP image."
      );

      e.target.value = "";

      return;
    }

    // Maximum size: 5 MB

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Image is too large. Maximum size is 5 MB."
      );

      e.target.value = "";

      return;
    }

    try {
      setUploading(true);

      const imageUrl =
        await uploadDashboardImage(
          file
        );

      setDashboard((prev) => ({
        ...prev,
        image: imageUrl,
      }));

      setSuccess(
        "Dashboard cover uploaded successfully."
      );
    } catch (err) {
      console.error(
        "Dashboard image upload failed:",
        err
      );

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Image could not be uploaded. Please try again."
        );
      }
    } finally {
      setUploading(false);

      e.target.value = "";
    }
  }

  function removeImage() {
    setDashboard((prev) => ({
      ...prev,
      image: "",
    }));

    setSuccess("");
    setError("");
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow">

      {/* Heading */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold">
          Dashboard Cover
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Upload a cover image for this
          dashboard.
        </p>

      </div>

      {/* Upload Area */}

      <div
        onClick={() => {
          if (!uploading) {
            inputRef.current?.click();
          }
        }}
        className={`flex h-72 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed bg-[#F8F7F3] transition ${
          uploading
            ? "cursor-not-allowed border-gray-300 opacity-70"
            : "cursor-pointer border-gray-300 hover:border-[#071A3D]"
        }`}
      >

        {uploading ? (

          /* Uploading */

          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#071A3D]" />

            <p className="mt-4 font-semibold text-[#071A3D]">
              Uploading image...
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Please wait while your image
              uploads.
            </p>

          </div>

        ) : dashboard.image ? (

          /* Existing Image */

          <Image
            src={dashboard.image}
            alt={
              dashboard.title ||
              "Dashboard cover"
            }
            width={1200}
            height={700}
            unoptimized
            className="h-full w-full object-cover"
          />

        ) : (

          /* Empty */

          <div className="px-5 text-center">

            <div className="text-4xl">
              📷
            </div>

            <p className="mt-4 font-semibold text-[#071A3D]">
              Click to upload dashboard cover
            </p>

            <p className="mt-2 text-sm text-gray-500">
              JPG • PNG • WEBP
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Maximum file size: 5 MB
            </p>

          </div>

        )}

      </div>

      {/* Hidden Input */}

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/jpeg,image/png,image/webp"
        disabled={uploading}
        onChange={handleImage}
      />

      {/* Error */}

      {error && (

        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>

      )}

      {/* Success */}

      {success && (

        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
          {success}
        </div>

      )}

      {/* Image Controls */}

      {dashboard.image &&
        !uploading && (

          <div className="mt-5 flex flex-wrap gap-3">

            <button
              type="button"
              onClick={() =>
                inputRef.current?.click()
              }
              className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-[#071A3D] transition hover:bg-gray-50"
            >
              Replace Image
            </button>

            <button
              type="button"
              onClick={removeImage}
              className="rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
            >
              Remove Image
            </button>

          </div>

        )}

    </div>
  );
}