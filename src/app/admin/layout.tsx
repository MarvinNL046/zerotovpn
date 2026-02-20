import AdminLayoutClient from "./admin-layout-client";

// Never pre-render admin pages — they require Stack Auth at runtime
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
