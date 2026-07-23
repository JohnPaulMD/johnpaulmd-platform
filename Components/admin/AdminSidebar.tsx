"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";

import { auth } from "@/lib/firebase";

const links = [
  {
    name: "Dashboard",
    href: "/admin/dashboards",
  },
  {
    name: "Homepage",
    href: "/admin/homepage",
  },
  {
    name: "General Settings",
    href: "/admin/settings",
  },
  {
    name: "Contact Page",
    href: "/admin/contact",
  },
  {
    name: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    name: "Research",
    href: "/admin/research",
  },
  {
    name: "Innovation",
    href: "/admin/innovation",
  },
  {
    name: "Reviews",
    href: "/admin/reviews",
  },
  {
    name: "CV Management",
    href: "/admin/cv",
  },
];

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [loggingOut, setLoggingOut] =
    useState(false);

  async function handleLogout() {
    try {
      setLoggingOut(true);

      await signOut(auth);

      router.replace("/admin/login");
    } catch (error) {
      console.error(error);
      setLoggingOut(false);
    }
  }

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-[#071A3D] p-8 text-white">
      <h1 className="mb-10 text-2xl font-bold">
        Manus Dei
      </h1>

      <nav className="space-y-3">
        {links.map((link) => {
          const active =
            pathname === link.href ||
            pathname.startsWith(
              `${link.href}/`
            );

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-white text-[#071A3D]"
                  : "hover:bg-white/10"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-6">
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-semibold text-red-300 transition hover:bg-white/10 hover:text-red-200 disabled:opacity-50"
        >
          <LogOut size={18} />

          {loggingOut
            ? "Signing out..."
            : "Logout"}
        </button>
      </div>
    </aside>
  );
}