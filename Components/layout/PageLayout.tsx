type PageLayoutProps = {
  children: React.ReactNode;
};

export default function PageLayout({
  children,
}: PageLayoutProps) {
  return (
    <main className="min-h-screen bg-[#071A3D] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        {children}
      </div>
    </main>
  );
}