type ButtonProps = {
  text: string;
  variant?: "primary" | "secondary";
};

export default function Button({
  text,
  variant = "primary",
}: ButtonProps) {
  const baseStyles =
    "rounded-full px-8 py-4 font-semibold transition";

  const variants = {
    primary:
      "bg-yellow-500 text-black hover:bg-yellow-400",

    secondary:
      "border border-white text-white hover:bg-white hover:text-[#071A3D]",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`}>
      {text}
    </button>
  );
}