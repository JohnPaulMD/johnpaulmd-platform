import type { Metadata } from "next";

import Link from "next/link";

import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Clock,
} from "lucide-react";

import {
  getContactSettings,
} from "@/services/contact/getContactSettings";

export const metadata: Metadata = {
  title: "Contact",

  description:
    "Contact JohnPaul Ozoigbo and Manus Dei Solutions for data analytics, statistical analysis, research support, dashboard development, academic consulting and innovative data solutions.",

  keywords: [
    "Contact JohnPaul Ozoigbo",
    "Manus Dei Solutions",
    "Data Analytics Services",
    "Statistical Analysis",
    "Research Support",
    "Dashboard Development",
    "Academic Consulting",
    "Data Analyst Nigeria",
  ],

  openGraph: {
    title: "Contact | JohnPaul Ozoigbo",

    description:
      "Get in touch with JohnPaul Ozoigbo and Manus Dei Solutions for research, data analytics, statistical analysis and dashboard development.",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Contact | JohnPaul Ozoigbo",

    description:
      "Get in touch with JohnPaul Ozoigbo and Manus Dei Solutions for research, data analytics, statistical analysis and dashboard development.",
  },
};

export default async function ContactPage() {
  const contact =
    await getContactSettings();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">

      {/* HEADER */}

      <div className="mb-14 text-center">

        <h1 className="text-4xl font-bold text-[#071A3D]">
          {contact.title}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
          {contact.subtitle}
        </p>

      </div>

      {/* CONTENT */}

      <div className="grid gap-10 lg:grid-cols-2">

        {/* LEFT CARD */}

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

          <h2 className="mb-8 text-2xl font-semibold text-[#071A3D]">
            Contact Information
          </h2>

          <div className="space-y-6">

            {contact.email && (
              <Link
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 transition hover:text-blue-600"
              >
                <Mail size={22} />

                <span>
                  {contact.email}
                </span>
              </Link>
            )}

            {contact.whatsapp && (
              <Link
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 transition hover:text-green-600"
              >
                <Phone size={22} />

                <span>
                  {contact.whatsapp}
                </span>
              </Link>
            )}

            {contact.linkedin && (
              <Link
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 transition hover:text-blue-700"
              >
                <Globe size={22} />

                <span>
                  LinkedIn
                </span>
              </Link>
            )}

            {contact.github && (
              <Link
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 transition hover:text-gray-800"
              >
                <Globe size={22} />

                <span>
                  GitHub
                </span>
              </Link>
            )}

            {contact.twitter && (
              <Link
                href={contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 transition hover:text-sky-600"
              >
                <Globe size={22} />

                <span>
                  X (Twitter)
                </span>
              </Link>
            )}

            {contact.address && (
              <div className="flex items-start gap-4">

                <MapPin
                  size={22}
                  className="mt-1"
                />

                <span>
                  {contact.address}
                </span>

              </div>
            )}

            {contact.businessHours && (
              <div className="flex items-start gap-4">

                <Clock
                  size={22}
                  className="mt-1"
                />

                <span>
                  {contact.businessHours}
                </span>

              </div>
            )}

          </div>

        </div>

        {/* RIGHT CARD */}

        <div className="rounded-3xl bg-[#071A3D] p-10 text-white shadow-lg">

          <h2 className="text-3xl font-bold">
            Let&apos;s Work Together
          </h2>

          <p className="mt-6 leading-8 text-white/85">
            Need help with research,
            statistical analysis,
            dashboard development,
            academic consulting,
            or innovative data solutions?

            <br />
            <br />

            Manus Dei Solutions is ready to
            collaborate with students,
            researchers,
            professionals,
            institutions,
            and businesses.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            {contact.email && (
              <Link
                href={`mailto:${contact.email}`}
                className="rounded-xl bg-white px-6 py-3 font-semibold text-[#071A3D] transition hover:bg-gray-100"
              >
                Email Us
              </Link>
            )}

            {contact.whatsapp && (
              <Link
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-[#071A3D]"
              >
                WhatsApp
              </Link>
            )}

          </div>

        </div>

      </div>

    </main>
  );
}