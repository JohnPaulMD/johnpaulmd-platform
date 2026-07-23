type Props = {
  playStore?: string;
  appStore?: string;
  website?: string;
  github?: string;
};

export default function InnovationActions({
  playStore,
  appStore,
  website,
  github,
}: Props) {
  if (!playStore && !appStore && !website && !github) {
    return null;
  }

  return (
    <section className="mt-12">

      <div className="flex flex-wrap gap-4">

        {playStore && (
          <a
            href={playStore}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-6 py-3 font-semibold text-white"
          >
            Google Play
          </a>
        )}

        {appStore && (
          <a
            href={appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-black px-6 py-3 font-semibold text-white"
          >
            App Store
          </a>
        )}

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-primary px-6 py-3 font-semibold text-primary"
          >
            Website
          </a>
        )}

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-6 py-3 font-semibold text-primary"
          >
            GitHub
          </a>
        )}

      </div>

    </section>
  );
}