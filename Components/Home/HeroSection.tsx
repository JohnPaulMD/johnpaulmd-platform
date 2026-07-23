"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import Button from "@/components/ui/Button";

import {
  getGeneralSettings,
  type GeneralSettings,
} from "@/services/settings/getGeneralSettings";

import {
  getHomepageSettings,
  type HomepageSettings,
} from "@/services/homepage/getHomepageSettings";

const defaultGeneral: GeneralSettings = {
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

const defaultHomepage: HomepageSettings = {
  heroTitle1:
    "Turning Data into Decisions.",
  heroTitle2:
    "Advancing Research.",
  heroTitle3:
    "Building Intelligent Solutions.",
  description:
    "Helping researchers, healthcare professionals, businesses and organizations transform complex data into evidence-based decisions through analytics, scientific research and digital innovation.",
  expertise: [
    "Data Analytics",
    "Medical Research",
    "Digital Innovation",
  ],
  profileImage:
    "/profile/johnpaul.png",
};

export default function HeroSection() {
  const [general, setGeneral] =
    useState(defaultGeneral);

  const [homepage, setHomepage] =
    useState(defaultHomepage);

  useEffect(() => {
    async function load() {
      try {
        const [
          generalData,
          homepageData,
        ] = await Promise.all([
          getGeneralSettings(),
          getHomepageSettings(),
        ]);

        setGeneral(generalData);
        setHomepage(homepageData);
      } catch (error) {
        console.error(error);
      }
    }

    load();
  }, []);

  return (
    <main className="relative overflow-hidden bg-surface">
      {/* Background */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      {/* Hero */}

      <section className="mx-auto flex min-h-[78vh] max-w-7xl items-center px-6 pb-12 pt-28">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">

          {/* LEFT */}

          <div className="flex flex-col">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl">
                {homepage.heroTitle1}
              </h1>

              <h2 className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                {homepage.heroTitle2}
              </h2>

              <h2 className="text-2xl font-bold text-accent sm:text-3xl md:text-4xl">
                {homepage.heroTitle3}
              </h2>
            </div>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              {homepage.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {homepage.expertise.map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-accent/30 bg-background px-4 py-2 text-sm font-medium text-primary shadow-sm"
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
              <Button
                text="Explore My Work"
                href="/dashboards"
              />

              <Button
                text="Contact Us"
                href="/contact"
                variant="secondary"
              />
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex justify-center lg:justify-end">
            <div className="flex w-full max-w-[320px] flex-col items-center">

              <div className="relative">

                <div className="absolute -inset-3 rounded-[26px] bg-accent/20 blur-2xl" />

                <Image
                  src={
                    homepage.profileImage ||
                    "/profile/johnpaul.png"
                  }
                  alt={general.fullName}
                  width={285}
                  height={355}
                  priority
                  className="relative h-auto w-[190px] rounded-[24px] object-cover shadow-2xl sm:w-[215px] md:w-[235px] lg:w-[255px]"
                />

              </div>

              <div className="mt-5 text-center">

                <h2 className="text-xl font-bold text-primary sm:text-2xl">
                  {general.fullName}
                </h2>

                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                  {general.brandName}
                </p>

              </div>

              <p className="mt-4 text-center text-sm font-medium leading-6 text-muted sm:text-base">
                {general.professionalTitle}
              </p>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}