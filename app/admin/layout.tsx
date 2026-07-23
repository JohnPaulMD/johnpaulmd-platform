"use client";

import {
  usePathname,
} from "next/navigation";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminGuard from "@/components/admin/AdminGuard";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname =
    usePathname();

  // The login page must remain accessible
  // without already being authenticated.

  if (
    pathname ===
    "/admin/login"
  ) {
    return (
      <>
        {children}
      </>
    );
  }

  // Every other /admin page is protected.

  return (
    <AdminGuard>

      <AdminLayout>
        {children}
      </AdminLayout>

    </AdminGuard>
  );
}