"use client";

import {
  ReactNode,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import { auth } from "@/lib/firebase";

interface AdminGuardProps {
  children: ReactNode;
}

// ==========================================
// AUTHORIZED ADMIN FIREBASE UIDs
// ==========================================

const ADMIN_UIDS = [
  "guMigTgusQXFayDHXXkFQigTaNB3",
  "dZhjF4TjdDNOvKp7K4mRWeQ4dxh2",
];

export default function AdminGuard({
  children,
}: AdminGuardProps) {
  const router = useRouter();

  const pathname =
    usePathname();

  const [checking, setChecking] =
    useState(true);

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (
          user: User | null
        ) => {
          // ==================================
          // NOT LOGGED IN
          // ==================================

          if (!user) {
            setAuthorized(false);

            setChecking(false);

            if (
              pathname !==
              "/admin/login"
            ) {
              router.replace(
                "/admin/login"
              );
            }

            return;
          }

          // ==================================
          // CHECK ADMIN UID
          // ==================================

          const isAdmin =
            ADMIN_UIDS.includes(
              user.uid
            );

          if (!isAdmin) {
            setAuthorized(false);

            setChecking(false);

            // Sign unauthorized Firebase
            // users out immediately.

            try {
              await signOut(auth);
            } catch (error) {
              console.error(
                "Failed to sign out unauthorized user:",
                error
              );
            }

            router.replace(
              "/admin/login"
            );

            return;
          }

          // ==================================
          // AUTHORIZED ADMIN
          // ==================================

          setAuthorized(true);

          setChecking(false);
        }
      );

    return () =>
      unsubscribe();
  }, [
    pathname,
    router,
  ]);

  // ==========================================
  // LOADING
  // ==========================================

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#071A3D]" />

          <p className="mt-4 text-sm font-medium text-gray-500">
            Verifying administrator access...
          </p>

        </div>

      </div>
    );
  }

  // ==========================================
  // UNAUTHORIZED
  // ==========================================

  if (!authorized) {
    return null;
  }

  // ==========================================
  // AUTHORIZED
  // ==========================================

  return (
    <>
      {children}
    </>
  );
}