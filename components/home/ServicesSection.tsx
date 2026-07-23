import SectionHeader from "@/components/ui/SectionHeader";

export default function ServicesSection() {
  const services = [
    {
      category: "Data Analytics",
      items: [
        "Data Analytics",
        "Statistical Analysis",
      ],
    },

    {
      category: "Research Services",
      items: [
        "Questionnaire Design & Data Collection",
        "Research Writing",
        "Content Analysis",
      ],
    },
  ];

  const tools = [
    "SPSS",
    "R",
    "Python",
    "Excel",
    "Power BI",
    "Tableau",
    "SQL",
  ];

  return (
    <section className="bg-background py-14 sm:py-16 lg:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* ================================= */}
        {/* SECTION HEADER */}
        {/* ================================= */}

        <SectionHeader
          eyebrow="Services"
          title="What We Do"
          description="Professional services in data analytics, statistical analysis and research support."
        />

        {/* ================================= */}
        {/* SERVICES */}
        {/* ================================= */}

        <div className="mx-auto grid max-w-5xl gap-10 sm:gap-12 md:grid-cols-2">

          {services.map((group) => (

            <div
              key={group.category}
              className="rounded-2xl border border-border bg-surface p-5 text-center sm:p-6 md:text-left lg:border-0 lg:bg-transparent lg:p-0"
            >

              {/* CATEGORY */}

              <h3 className="mb-5 text-xl font-bold text-primary sm:text-2xl lg:mb-6">
                {group.category}
              </h3>

              {/* SERVICES LIST */}

              <div className="space-y-4 sm:space-y-5">

                {group.items.map((item) => (

                  <div
                    key={item}
                    className="flex items-start justify-center gap-3 md:justify-start"
                  >

                    {/* CHECK */}

                    <span className="mt-0.5 shrink-0 text-base font-bold text-accent sm:mt-1 sm:text-lg">
                      ✓
                    </span>

                    {/* SERVICE */}

                    <p className="text-center text-base leading-7 text-text sm:text-lg md:text-left">
                      {item}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

        {/* ================================= */}
        {/* TECHNICAL EXPERTISE */}
        {/* ================================= */}

        <div className="mx-auto mt-14 max-w-5xl border-t border-border pt-10 sm:mt-16 sm:pt-12 lg:mt-20">

          <h3 className="mb-6 text-center text-xl font-bold text-primary sm:text-2xl">
            Technical Expertise
          </h3>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4">

            {tools.map((tool) => (

              <span
                key={tool}
                className="rounded-full border border-accent/30 bg-surface px-4 py-2 text-xs font-semibold text-primary transition hover:border-accent hover:bg-accent hover:text-white sm:px-5 sm:text-sm"
              >
                {tool}
              </span>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}