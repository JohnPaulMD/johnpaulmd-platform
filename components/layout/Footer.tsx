"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  getGeneralSettings,
  type GeneralSettings,
} from "@/services/settings/getGeneralSettings";

const defaultSettings: GeneralSettings = {
  fullName: "JohnPaul Ozoigbo",

  brandName: "Manus Dei Solutions",

  professionalTitle:
    "Data Analyst • Dental Student • Researcher",

  email: "",

  phone: "",

  address: "",

  linkedin: "",

  github: "",

  twitter: "",
};

export default function Footer() {
  const [settings, setSettings] =
    useState<GeneralSettings>(
      defaultSettings
    );

  useEffect(() => {
    async function loadSettings() {
      try {
        const data =
          await getGeneralSettings();

        setSettings({
          ...defaultSettings,
          ...data,
        });
      } catch (error) {
        console.error(
          "Failed to load footer settings:",
          error
        );
      }
    }

    loadSettings();
  }, []);

  return (
    <footer className="border-t border-white/10 bg-[#071A3D] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* ================================= */}
          {/* BRAND */}
          {/* ================================= */}

          <div>
            <h2 className="text-xl font-bold text-yellow-400">
              {settings.brandName}
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
              Data that informs. Research that matters.
              Solutions that endure.
            </p>

            {settings.professionalTitle && (
              <p className="mt-3 text-sm leading-6 text-gray-500">
                {settings.professionalTitle}
              </p>
            )}
          </div>

          {/* ================================= */}
          {/* QUICK LINKS */}
          {/* ================================= */}

          <div>
            <h3 className="font-bold text-white">
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
              <Link
                href="/"
                className="transition hover:text-yellow-400"
              >
                Home
              </Link>

              <Link
                href="/dashboards"
                className="transition hover:text-yellow-400"
              >
                Dashboards
              </Link>

              <Link
                href="/research"
                className="transition hover:text-yellow-400"
              >
                Research
              </Link>

              <Link
                href="/innovation"
                className="transition hover:text-yellow-400"
              >
                Innovation
              </Link>

              <Link
                href="/review"
                className="transition hover:text-yellow-400"
              >
                Client Reviews
              </Link>

              <Link
                href="/contact"
                className="transition hover:text-yellow-400"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* ================================= */}
          {/* CONTACT */}
          {/* ================================= */}

          <div>
            <h3 className="font-bold text-white">
              Contact
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-400">
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-start gap-3 transition hover:text-yellow-400"
                >
                  <Mail
                    size={17}
                    className="mt-0.5 shrink-0"
                  />

                  <span className="break-all">
                    {settings.email}
                  </span>
                </a>
              )}

              {settings.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-start gap-3 transition hover:text-yellow-400"
                >
                  <Phone
                    size={17}
                    className="mt-0.5 shrink-0"
                  />

                  <span>
                    {settings.phone}
                  </span>
                </a>
              )}

              {settings.address && (
                <div className="flex items-start gap-3">
                  <MapPin
                    size={17}
                    className="mt-0.5 shrink-0"
                  />

                  <span>
                    {settings.address}
                  </span>
                </div>
              )}

              {!settings.email &&
                !settings.phone &&
                !settings.address && (
                  <p className="text-gray-500">
                    Contact information will appear
                    here.
                  </p>
                )}
            </div>
          </div>

          {/* ================================= */}
          {/* SOCIAL */}
          {/* ================================= */}

          <div>
            <h3 className="font-bold text-white">
              Connect
            </h3>

            <div className="mt-4 flex flex-wrap gap-3">
              {settings.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition hover:border-yellow-400/50 hover:text-yellow-400"
                >
                  <span className="text-sm font-bold">
                    in
                  </span>
                </a>
              )}

              {settings.github && (
                <a
                  href={settings.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition hover:border-yellow-400/50 hover:text-yellow-400"
                >
                  <span className="text-xs font-bold">
                    GH
                  </span>
                </a>
              )}

              {settings.twitter && (
                <a
                  href={settings.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 font-bold text-gray-400 transition hover:border-yellow-400/50 hover:text-yellow-400"
                >
                  X
                </a>
              )}

              {!settings.linkedin &&
                !settings.github &&
                !settings.twitter && (
                  <p className="text-sm text-gray-500">
                    Social links will appear here.
                  </p>
                )}
            </div>
          </div>
        </div>

        {/* ================================= */}
        {/* FOOTER BOTTOM */}
        {/* ================================= */}

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            {settings.fullName}. All rights
            reserved.
          </p>

          <p>{settings.brandName}</p>
        </div>
      </div>
    </footer>
  );
}