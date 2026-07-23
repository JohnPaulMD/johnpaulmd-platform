type Props = {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

export default function FilterButton({
  active,
  children,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-2 font-medium transition ${
        active
          ? "bg-primary text-white"
          : "border border-border bg-background text-text hover:border-accent"
      }`}
    >
      {children}
    </button>
  );
}