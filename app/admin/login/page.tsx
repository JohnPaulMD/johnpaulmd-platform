"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "Please enter your email and password."
      );

      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.push(
        "/admin/dashboards"
      );
    } catch (error) {
      console.error(
        "Admin login failed:",
        error
      );

      setError(
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F7F3] px-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg md:p-10">

        <div className="mb-8">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            Administration
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#071A3D]">
            Admin Login
          </h1>

          <p className="mt-3 leading-7 text-gray-500">
            Sign in to manage your
            dashboards and website content.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="admin@example.com"
              autoComplete="email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#071A3D]"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#071A3D]"
            />

          </div>

          {error && (

            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </div>

          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#071A3D] px-6 py-3.5 font-semibold text-white transition hover:bg-[#0A2557] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>

      </div>

    </main>
  );
}