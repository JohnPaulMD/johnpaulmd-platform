type Props = {
  objectives?: string[];
};

export default function ProjectObjectives({
  objectives,
}: Props) {
  if (!objectives?.length) return null;

  return (
    <section className="mt-20">

      <h2 className="mb-6 text-3xl font-bold text-primary">
        Objectives
      </h2>

      <ul className="space-y-4">

        {objectives.map((objective) => (

          <li
            key={objective}
            className="flex items-start gap-3"
          >

            <span className="text-accent font-bold">
              ✓
            </span>

            <span className="text-muted">
              {objective}
            </span>

          </li>

        ))}

      </ul>

    </section>
  );
}