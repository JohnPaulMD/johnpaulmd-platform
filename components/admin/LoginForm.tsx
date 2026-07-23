"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.push("/admin/dashboards");
    } catch {
      setError("Invalid email or password.");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md space-y-6 rounded-3xl border border-border bg-white p-10 shadow-sm"
    >
      <h1 className="text-3xl font-bold text-primary">
        Admin Login
      </h1>

      <input
        type="email"
        placeholder="Email"

        value={email}

        onChange={(e) =>
          setEmail(e.target.value)
        }

        className="w-full rounded-xl border border-border px-4 py-3"
      />

      <input
        type="password"

        placeholder="Password"

        value={password}

        onChange={(e) =>
          setPassword(e.target.value)
        }

        className="w-full rounded-xl border border-border px-4 py-3"
      />

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      <button
        type="submit"

        disabled={loading}

        className="w-full rounded-xl bg-primary py-3 font-semibold text-white"
      >
        {loading
          ? "Signing in..."
          : "Login"}
      </button>
    </form>
  );
}