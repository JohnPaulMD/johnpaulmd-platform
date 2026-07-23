"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  getHomepageSettings,
  type HomepageSettings,
} from "@/services/homepage/getHomepageSettings";

import { saveHomepageSettings } from "@/services/homepage/saveHomepageSettings";

import uploadProfileImage from "@/services/homepage/uploadProfileImage";

export default function HomepageSettings() {
  const [settings, setSettings] =
    useState<HomepageSettings>({
      heroTitle1: "",
      heroTitle2: "",
      heroTitle3: "",
      description: "",
      expertise: [],
      profileImage: "",
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  useEffect(() => {
    async function load() {
      const data =
        await getHomepageSettings();

      setSettings(data);

      setLoading(false);
    }

    load();
  }, []);

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const url =
        await uploadProfileImage(
          file
        );

      setSettings((prev) => ({
        ...prev,
        profileImage: url,
      }));
    } catch (err) {
      console.error(err);

      alert(
        "Image upload failed."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);

      await saveHomepageSettings(
        settings
      );

      alert(
        "Homepage updated successfully."
      );
    } catch {
      alert(
        "Failed to save homepage."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">

      <h2 className="mb-8 text-2xl font-bold">
        Homepage Settings
      </h2>

      <div className="space-y-6">

        <div>

          <label className="mb-2 block font-medium">
            Hero Title 1
          </label>

          <input
            className="w-full rounded-lg border p-3"
            value={settings.heroTitle1}
            onChange={(e) =>
              setSettings({
                ...settings,
                heroTitle1:
                  e.target.value,
              })
            }
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Hero Title 2
          </label>

          <input
            className="w-full rounded-lg border p-3"
            value={settings.heroTitle2}
            onChange={(e) =>
              setSettings({
                ...settings,
                heroTitle2:
                  e.target.value,
              })
            }
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Hero Title 3
          </label>

          <input
            className="w-full rounded-lg border p-3"
            value={settings.heroTitle3}
            onChange={(e) =>
              setSettings({
                ...settings,
                heroTitle3:
                  e.target.value,
              })
            }
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows={5}
            className="w-full rounded-lg border p-3"
            value={settings.description}
            onChange={(e) =>
              setSettings({
                ...settings,
                description:
                  e.target.value,
              })
            }
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Expertise
          </label>

          <textarea
            rows={5}
            className="w-full rounded-lg border p-3"
            value={settings.expertise.join(
              "\n"
            )}
            onChange={(e) =>
              setSettings({
                ...settings,
                expertise:
                  e.target.value
                    .split("\n")
                    .map((x) =>
                      x.trim()
                    )
                    .filter(Boolean),
              })
            }
          />

          <p className="mt-2 text-sm text-gray-500">
            One item per line.
          </p>

        </div>

        <div>

          <label className="mb-3 block font-medium">
            Profile Image
          </label>

          {settings.profileImage && (

            <Image
              src={
                settings.profileImage
              }
              alt="Profile"
              width={180}
              height={220}
              className="mb-4 rounded-xl border object-cover"
            />

          )}

          <input
            type="file"
            accept="image/*"
            onChange={
              handleImageUpload
            }
          />

          {uploading && (

            <p className="mt-2 text-sm text-blue-600">
              Uploading...
            </p>

          )}

        </div>

        <button
          onClick={handleSave}
          disabled={
            saving || uploading
          }
          className="rounded-xl bg-[#071A3D] px-8 py-3 font-semibold text-white hover:bg-[#0B2858] disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : "Save Homepage"}
        </button>

      </div>

    </div>
  );
}