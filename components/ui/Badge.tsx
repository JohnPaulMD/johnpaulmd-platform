import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "filled" | "outline";
};

export default function Badge({
  children,
  variant = "filled",
}: Props) {
  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-medium ${
        variant === "filled"
          ? "bg-surface text-primary"
          : "border border-border text-primary"
      }`}
    >
      {children}
    </span>
  );
}