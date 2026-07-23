type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-16 max-w-3xl ${
        align === "center"
          ? "mx-auto text-center"
          : "text-left"
      }`}
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
        {eyebrow}
      </p>

      <h2 className="text-4xl font-bold text-primary md:text-5xl">
        {title}
      </h2>

      <p className="mt-5 text-lg leading-8 text-muted">
        {description}
      </p>
    </div>
  );
}