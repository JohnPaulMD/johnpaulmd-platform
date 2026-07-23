import { Dashboard } from "@/types/dashboards";

const dashboardData: Dashboard[] = [
  {
    id: 1,

    slug: "hospital-performance-dashboard",

    title: "Hospital Performance Dashboard",

    category: "Healthcare Analytics",

    software: "Power BI",

    description:
      "Interactive dashboard for monitoring hospital performance.",

    image: "/dashboards/hospital-dashboard.png",

    featured: true,

    technologies: [
      "Power BI",
      "SQL",
      "Excel",
    ],

    projectOverview:
      "This dashboard was developed to monitor key hospital performance indicators including patient admissions, discharge rates and departmental efficiency.",

    objectives: [
      "Monitor admissions",
      "Track bed occupancy",
      "Evaluate departmental performance",
    ],

    keyInsights: [
      "Admissions increased by 18%",
      "Emergency waiting time reduced",
      "Cardiology recorded the highest patient volume",
    ],

    embedUrl: "",

    liveUrl: "",

    githubUrl: "",
  },

  {
    id: 2,

    slug: "student-performance-dashboard",

    title: "Student Performance Dashboard",

    category: "Education Analytics",

    software: "Tableau",

    description:
      "Interactive dashboard for analysing student performance and academic outcomes.",

    image: "/dashboards/student-dashboard.png",

    featured: false,

    technologies: [
      "Tableau",
      "Excel",
    ],

    projectOverview:
      "This dashboard provides insights into student performance trends, subject outcomes and overall academic achievement.",

    objectives: [
      "Monitor academic performance",
      "Compare subject results",
      "Identify learning trends",
    ],

    keyInsights: [
      "Overall pass rate improved",
      "Mathematics recorded the highest average score",
      "Attendance correlated with better performance",
    ],

    embedUrl: "",

    liveUrl: "",

    githubUrl: "",
  },
];

export default dashboardData;