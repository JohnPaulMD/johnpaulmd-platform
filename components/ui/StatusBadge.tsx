type Status =
  | "Live"
  | "Beta"
  | "Coming Soon"
  | "In Development";

type Props = {
  status: Status;
};

export default function StatusBadge({
  status,
}: Props) {
  const styles = {
    Live: "bg-green-100 text-green-700",
    Beta: "bg-blue-100 text-blue-700",
    "Coming Soon":
      "bg-yellow-100 text-yellow-700",
    "In Development":
      "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}