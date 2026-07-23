import Container from "./Container";

type PageHeaderProps = {
  title: string;
  description: string;
};

export default function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="bg-surface py-28">

      <Container>

        <h1 className="text-5xl font-bold text-primary">
          {title}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
          {description}
        </p>

      </Container>

    </section>
  );
}