"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";

import { auth } from "@/lib/firebase";

export default function AdminLogoutButton() {
  const router = useRouter();

  const [loggingOut, setLoggingOut] =
    useState(false);

  async function handleLogout() {
    try {
      setLoggingOut(true);

      await signOut(auth);

      router.replace("/admin/login");
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );

      setLoggingOut(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loggingOut}
      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
    >
      <LogOut size={18} />

      {loggingOut
        ? "Signing out..."
        : "Logout"}
    </button>
  );
}