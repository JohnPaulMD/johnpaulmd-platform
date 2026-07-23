import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* ADMIN SIDEBAR */}
      <AdminSidebar />

      {/* MAIN ADMIN AREA */}
      <div className="min-w-0 flex-1">

        {/* ADMIN NAVBAR */}
        <AdminNavbar />

        {/* PAGE CONTENT */}
        <main className="p-4 sm:p-6 lg:p-10">
          {children}
        </main>

      </div>

    </div>
  );
}