"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import Link from "next/link";

import {
  CheckCircle2,
  LoaderCircle,
  MessageSquareQuote,
} from "lucide-react";

import ReviewSubmissionForm from "@/components/reviews/ReviewSubmissionForm";

import {
  getReviewInvitation,
  ReviewInvitation,
} from "@/services/reviewInvitations/getReviewInvitation";

export default function ReviewInvitationPage() {
  const params = useParams();

  const token =
    typeof params.token === "string"
      ? params.token
      : "";

  const [
    invitation,
    setInvitation,
  ] =
    useState<ReviewInvitation | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [invalid, setInvalid] =
    useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    async function loadInvitation() {
      try {
        const data =
          await getReviewInvitation(
            token
          );

        if (!data) {
          setInvalid(true);
          return;
        }

        setInvitation(data);
      } catch (error) {
        console.error(
          "Failed to load review invitation:",
          error
        );

        setInvalid(true);
      } finally {
        setLoading(false);
      }
    }

    loadInvitation();
  }, [token]);

  if (!token) {
    return (
      <InvalidInvitation />
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#071A3D] text-white">

        <div className="flex min-h-screen items-center justify-center px-4">

          <div className="text-center">

            <LoaderCircle
              size={42}
              className="mx-auto animate-spin text-white/70"
            />

            <p className="mt-4 text-white/60">
              Checking your invitation...
            </p>

          </div>

        </div>

      </main>
    );
  }

  if (
    invalid ||
    !invitation
  ) {
    return (
      <InvalidInvitation />
    );
  }

  if (
    invitation.used ||
    invitation.status !== "Active"
  ) {
    return (
      <main className="min-h-screen bg-[#071A3D] text-white">

        <div className="flex min-h-screen items-center justify-center px-4 py-20">

          <div className="mx-auto max-w-xl text-center">

            <CheckCircle2
              size={54}
              className="mx-auto text-green-400"
            />

            <h1 className="mt-6 text-3xl font-bold">
              Review Already Submitted
            </h1>

            <p className="mt-4 leading-8 text-white/65">
              This review invitation has already been used
              or is no longer active.
            </p>

            <Link
              href="/review"
              className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-[#071A3D]"
            >
              View Client Reviews
            </Link>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#071A3D] text-white">

      {invitation.clientName && (

        <div className="px-4 pt-32 text-center sm:px-6 sm:pt-36">

          <p className="text-sm text-white/60">
            Review invitation for
          </p>

          <p className="mt-1 font-semibold text-white">
            {invitation.clientName}
          </p>

        </div>

      )}

      <ReviewSubmissionForm
        invitationId={
          invitation.id
        }
        clientName={
          invitation.clientName
        }
      />

    </main>
  );
}

function InvalidInvitation() {
  return (
    <main className="min-h-screen bg-[#071A3D] text-white">

      <div className="flex min-h-screen items-center justify-center px-4 py-20">

        <div className="mx-auto max-w-xl text-center">

          <MessageSquareQuote
            size={50}
            className="mx-auto text-white/40"
          />

          <h1 className="mt-6 text-3xl font-bold">
            Invalid Review Invitation
          </h1>

          <p className="mt-4 leading-8 text-white/65">
            This review invitation is invalid or is no
            longer available.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-[#071A3D]"
          >
            Return Home
          </Link>

        </div>

      </div>

    </main>
  );
}