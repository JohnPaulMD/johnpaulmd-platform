"use client";

import { useState } from "react";

import DashboardGeneralTab from "./tabs/DashboardGeneralTab";
import DashboardContentTab from "./tabs/DashboardContentTab";
import DashboardTechnologyTab from "./tabs/DashboardTechnologyTab";
import DashboardMediaTab from "./tabs/DashboardMediaTab";
import DashboardEmbedTab from "./tabs/DashboardEmbedTab";
import DashboardPublishTab from "./tabs/DashboardPublishTab";

export interface DashboardData {
  title: string;
  slug: string;
  category: string;
  software: string;

  description: string;
  overview: string;

  objectives: string[];
  insights: string[];

  technologies: string[];

  image: string;

  platform: string;

  liveUrl: string;
  embedUrl: string;
  githubUrl: string;
  websiteUrl: string;

  featured: boolean;

  status: "Draft" | "Published";
}

export const defaultDashboardData: DashboardData = {
  title: "",
  slug: "",
  category: "",
  software: "Power BI",

  description: "",
  overview: "",

  objectives: [],
  insights: [],

  technologies: [],

  image: "",

  platform: "Power BI",

  liveUrl: "",
  embedUrl: "",
  githubUrl: "",
  websiteUrl: "",

  featured: false,

  status: "Draft",
};

interface DashboardEditorProps {
  initialData?: DashboardData;

  dashboardId?: string;
}

const tabs = [
  "General",
  "Content",
  "Technology",
  "Media",
  "Embed",
  "Publish",
];

export default function DashboardEditor({
  initialData,
  dashboardId,
}: DashboardEditorProps) {
  const [activeTab, setActiveTab] =
    useState("General");

  const [dashboard, setDashboard] =
    useState<DashboardData>(
      initialData || defaultDashboardData
    );

  return (
    <div className="space-y-8">

      {/* Tabs */}

      <div className="flex flex-wrap gap-3">

        {tabs.map((tab) => (

          <button
            key={tab}
            type="button"
            onClick={() =>
              setActiveTab(tab)
            }
            className={`rounded-xl px-5 py-3 font-semibold transition ${
              activeTab === tab
                ? "bg-[#071A3D] text-white"
                : "border border-gray-200 bg-white text-[#071A3D] hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>

        ))}

      </div>

      {/* General */}

      {activeTab === "General" && (

        <DashboardGeneralTab
          dashboard={dashboard}
          setDashboard={setDashboard}
        />

      )}

      {/* Content */}

      {activeTab === "Content" && (

        <DashboardContentTab
          dashboard={dashboard}
          setDashboard={setDashboard}
        />

      )}

      {/* Technology */}

      {activeTab === "Technology" && (

        <DashboardTechnologyTab
          dashboard={dashboard}
          setDashboard={setDashboard}
        />

      )}

      {/* Media */}

      {activeTab === "Media" && (

        <DashboardMediaTab
          dashboard={dashboard}
          setDashboard={setDashboard}
        />

      )}

      {/* Embed */}

      {activeTab === "Embed" && (

        <DashboardEmbedTab
          dashboard={dashboard}
          setDashboard={setDashboard}
        />

      )}

      {/* Publish */}

      {activeTab === "Publish" && (

        <DashboardPublishTab
          dashboard={dashboard}
          setDashboard={setDashboard}
          dashboardId={dashboardId}
        />

      )}

    </div>
  );
}