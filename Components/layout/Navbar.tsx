"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

import { Menu, X } from "lucide-react";

import {
  getGeneralSettings,
  type GeneralSettings,
} from "@/services/settings/getGeneralSettings";

export default function Navbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [settings, setSettings] =
    useState<GeneralSettings>({
      fullName: "",
      brandName: "Manus Dei Solutions",
      professionalTitle: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
      twitter: "",
    });

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Dashboards",
      href: "/dashboards",
    },
    {
      name: "Research",
      href: "/research",
    },
    {
      name: "Client Reviews",
      href: "/review",
    },
    {
      name: "Innovation Lab",
      href: "/innovation",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  // ==========================================
  // LOAD WEBSITE SETTINGS
  // ==========================================

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getGeneralSettings();
        setSettings(data);
      } catch (error) {
        console.error(
          "Failed to load navbar settings:",
          error
        );
      }
    }

    void Promise.resolve().then(
      loadSettings
    );
  }, []);

  // ==========================================
  // ACTIVE NAVIGATION LINK
  // ==========================================

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ================================= */}
      {/* MAIN NAVBAR */}
      {/* ================================= */}

      <div className="mx-auto mt-4 w-[94%] max-w-7xl md:mt-6">
        <div className="flex items-center justify-between rounded-full border border-white/20 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-xl sm:px-6 lg:px-8 lg:py-4">
          {/* ================================= */}
          {/* LOGO / BRAND */}
          {/* ================================= */}

          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 sm:gap-4"
          >
            <Image
              src="/brand/logo-icon.png"
              alt={`${settings.brandName} logo`}
              width={58}
              height={58}
              priority
              className="h-11 w-11 shrink-0 object-contain sm:h-14 sm:w-14"
            />

            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-[#071A3D] sm:text-xl">
                {settings.brandName}
              </h1>
            </div>
          </Link>

          {/* ================================= */}
          {/* DESKTOP NAVIGATION */}
          {/* ================================= */}

          <nav className="hidden items-center gap-7 xl:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative whitespace-nowrap text-[14px] font-medium transition-all duration-300 ${
                    active
                      ? "text-[#071A3D]"
                      : "text-gray-600 hover:text-[#071A3D]"
                  }`}
                >
                  {link.name}

                  {active && (
                    <span className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-[#D4AF37]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ================================= */}
          {/* DESKTOP CV BUTTON */}
          {/* ================================= */}

          <Link
            href="/cv"
            className="hidden whitespace-nowrap rounded-full bg-[#071A3D] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#0B2858] xl:block"
          >
            Download CV
          </Link>

          {/* ================================= */}
          {/* MOBILE MENU BUTTON */}
          {/* ================================= */}

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((current) => !current)
            }
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            className="ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#071A3D] text-white transition hover:bg-[#0B2858] xl:hidden"
          >
            {mobileMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>

        {/* ================================= */}
        {/* MOBILE / TABLET MENU */}
        {/* ================================= */}

        {mobileMenuOpen && (
          <div className="mt-3 overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-2xl xl:hidden">
            <nav className="flex flex-col">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-medium transition ${
                      active
                        ? "bg-[#071A3D] text-white"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#071A3D]"
                    }`}
                  >
                    <span>{link.name}</span>

                    {active && (
                      <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="my-4 border-t border-gray-100" />

            <Link
              href="/cv"
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="block w-full rounded-xl bg-[#071A3D] px-5 py-3.5 text-center font-semibold text-white transition hover:bg-[#0B2858]"
            >
              Download CV
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}