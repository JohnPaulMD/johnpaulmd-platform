"use client";

import { useEffect, useState } from "react";

import type {
  ContactSettings as ContactSettingsData,
} from "@/services/contact/getContactSettings";

import {
  getContactSettings,
} from "@/services/contact/getContactSettings";

import {
  saveContactSettings,
} from "@/services/contact/saveContactSettings";

const defaultValues: ContactSettingsData = {
  title: "",
  subtitle: "",
  email: "",
  whatsapp: "",
  linkedin: "",
  github: "",
  twitter: "",
  address: "",
  businessHours: "",
};

export default function ContactSettings() {
  const [settings, setSettings] =
    useState<ContactSettingsData>(defaultValues);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    async function loadSettings() {
      const data =
        await getContactSettings();

      setSettings(data);

      setLoading(false);
    }

    loadSettings();
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

      await saveContactSettings(
        settings
      );

      alert(
        "Contact settings saved successfully."
      );
    } catch (error) {
      console.error(error);

      alert(
        "Unable to save contact settings."
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
    <div className="mx-auto max-w-4xl space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Contact Page Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your public contact information.
        </p>

      </div>

      <div className="grid gap-5">

        <input
          className="w-full rounded-lg border p-3"
          name="title"
          placeholder="Page Title"
          value={settings.title}
          onChange={handleChange}
        />

        <input
          className="w-full rounded-lg border p-3"
          name="subtitle"
          placeholder="Subtitle"
          value={settings.subtitle}
          onChange={handleChange}
        />

        <input
          className="w-full rounded-lg border p-3"
          name="email"
          placeholder="Email"
          value={settings.email}
          onChange={handleChange}
        />

        <input
          className="w-full rounded-lg border p-3"
          name="whatsapp"
          placeholder="WhatsApp Number"
          value={settings.whatsapp}
          onChange={handleChange}
        />

        <input
          className="w-full rounded-lg border p-3"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={settings.linkedin}
          onChange={handleChange}
        />

        <input
          className="w-full rounded-lg border p-3"
          name="github"
          placeholder="GitHub URL"
          value={settings.github}
          onChange={handleChange}
        />

        <input
          className="w-full rounded-lg border p-3"
          name="twitter"
          placeholder="X (Twitter) URL"
          value={settings.twitter}
          onChange={handleChange}
        />

        <textarea
          className="w-full rounded-lg border p-3"
          rows={3}
          name="address"
          placeholder="Office Address"
          value={settings.address}
          onChange={handleChange}
        />

        <textarea
          className="w-full rounded-lg border p-3"
          rows={2}
          name="businessHours"
          placeholder="Business Hours"
          value={settings.businessHours}
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