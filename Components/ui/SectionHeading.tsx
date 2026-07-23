type SectionHeadingProps = {
  title: string;
  subtitle: string;
};

export default function SectionHeading({
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="mb-16">
      <h2 className="text-5xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}