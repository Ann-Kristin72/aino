import AdminErrorBoundary from "@/src/components/AdminErrorBoundary";
import SuperAdminDashboard from "@/src/components/admin/SuperAdminDashboard";

export default function Page() {
  return (
    <AdminErrorBoundary>
      <SuperAdminDashboard />
    </AdminErrorBoundary>
  );
} 