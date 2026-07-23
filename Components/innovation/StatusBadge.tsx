type Props = {
  status: string;
};

export default function StatusBadge({
  status,
}: Props) {
  const colors = {
    Live: "bg-green-100 text-green-700",

    Beta: "bg-blue-100 text-blue-700",

    "Coming Soon":
      "bg-yellow-100 text-yellow-700",

    "In Development":
      "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold ${
        colors[
          status as keyof typeof colors
        ]
      }`}
    >
      {status}
    </span>
  );
}