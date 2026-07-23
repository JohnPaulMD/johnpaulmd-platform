"use client";

import { useEffect, useState } from "react";

import type {
  GeneralSettings,
} from "@/services/settings/getGeneralSettings";

import {
  getGeneralSettings,
} from "@/services/settings/getGeneralSettings";

import {
  saveGeneralSettings,
} from "@/services/settings/saveGeneralSettings";

const defaults: GeneralSettings = {
  fullName: "",
  brandName: "",
  professionalTitle: "",
  email: "",
  phone: "",
  address: "",
  linkedin: "",
  github: "",
  twitter: "",
};

export default function GeneralSettings() {
  const [settings, setSettings] =
    useState<GeneralSettings>(defaults);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    async function load() {
      const data =
        await getGeneralSettings();

      setSettings(data);

      setLoading(false);
    }

    load();
  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setSettings({
      ...settings,
      [e.target.name]:
        e.target.value,
    });
  }

  async function handleSave() {
    try {
      setSaving(true);

      await saveGeneralSettings(
        settings
      );

      alert(
        "General settings saved successfully."
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to save settings."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          General Site Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage the global information used across your website.
        </p>

      </div>

      <div className="grid gap-5">

        <input
          className="rounded-lg border p-3"
          name="fullName"
          placeholder="Full Name"
          value={settings.fullName}
          onChange={handleChange}
        />

        <input
          className="rounded-lg border p-3"
          name="brandName"
          placeholder="Brand Name"
          value={settings.brandName}
          onChange={handleChange}
        />

        <input
          className="rounded-lg border p-3"
          name="professionalTitle"
          placeholder="Professional Title"
          value={settings.professionalTitle}
          onChange={handleChange}
        />

        <input
          className="rounded-lg border p-3"
          name="email"
          placeholder="Email"
          value={settings.email}
          onChange={handleChange}
        />

        <input
          className="rounded-lg border p-3"
          name="phone"
          placeholder="Phone Number"
          value={settings.phone}
          onChange={handleChange}
        />

        <textarea
          className="rounded-lg border p-3"
          rows={3}
          name="address"
          placeholder="Office Address"
          value={settings.address}
          onChange={handleChange}
        />

        <input
          className="rounded-lg border p-3"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={settings.linkedin}
          onChange={handleChange}
        />

        <input
          className="rounded-lg border p-3"
          name="github"
          placeholder="GitHub URL"
          value={settings.github}
          onChange={handleChange}
        />

        <input
          className="rounded-lg border p-3"
          name="twitter"
          placeholder="X (Twitter) URL"
          value={settings.twitter}
          onChange={handleChange}
        />

      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded-lg bg-[#071A3D] px-6 py-3 font-semibold text-white transition hover:bg-[#0B2A5C] disabled:opacity-50"
      >
        {saving
          ? "Saving..."
          : "Save Changes"}
      </button>

    </div>
  );
}