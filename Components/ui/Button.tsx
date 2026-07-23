import Link from "next/link";

type ButtonProps = {
  text: string;
  href?: string;
  variant?: "primary" | "secondary";
};

export default function Button({
  text,
  href = "#",
  variant = "primary",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold transition duration-300";

  const variants = {
    primary:
      "bg-yellow-500 text-black hover:bg-yellow-400",

    secondary:
      "border border-[#071A3D] text-[#071A3D] hover:bg-[#071A3D] hover:text-white",
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {text}
    </Link>
  );
}