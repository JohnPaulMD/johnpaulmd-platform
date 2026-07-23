type Props = {
  technologies: string[];
};

export default function TechnologyStack({
  technologies,
}: Props) {
  return (
    <div className="mt-12">

      <h2 className="mb-5 text-2xl font-bold text-primary">
        Technologies
      </h2>

      <div className="flex flex-wrap gap-3">

        {technologies.map((tech) => (

          <span
            key={tech}
            className="rounded-full border border-border bg-surface px-4 py-2"
          >
            {tech}
          </span>

        ))}

      </div>

    </div>
  );
}