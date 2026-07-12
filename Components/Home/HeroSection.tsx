export default function HeroSection() {
  return (
    <main className="min-h-screen bg-[#071A3D] text-white">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
            Manus Dei Solutions
          </p>

          <h1 className="mt-6 text-5xl font-bold md:text-7xl">
            JohnPaul Ozoigbo
          </h1>

          <p className="mt-6 text-xl text-gray-300">
            Data Analyst • Medical Student • Researcher
          </p>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-400">
            Transforming data into decisions, research into evidence,
            and ideas into intelligent solutions.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black transition hover:bg-yellow-400">
              View Dashboards
            </button>

            <Button
  text="Innovation Lab"
  variant="secondary"
/>
          </div>
        </div>
      </section>
    </main>
  );
}