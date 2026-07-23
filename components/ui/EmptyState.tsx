type Props = {
  title: string;
  description: string;
};

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-12 text-center">
      <h2 className="text-2xl font-bold text-primary">
        {title}
      </h2>

      <p className="mt-3 text-muted">
        {description}
      </p>
    </div>
  );
}