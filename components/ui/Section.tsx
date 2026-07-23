import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  background?: "background" | "surface";
  className?: string;
};

export default function Section({
  children,
  background = "background",
  className = "",
}: SectionProps) {
  return (
    <section
      className={`py-24 ${
        background === "surface"
          ? "bg-surface"
          : "bg-background"
      } ${className}`}
    >
      {children}
    </section>
  );
}