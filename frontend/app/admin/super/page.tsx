import AdminErrorBoundary from "../../../components/AdminErrorBoundary";
import SuperAdminDashboard from "../../../components/admin/SuperAdminDashboard";

export default function Page() {
  return (
    <AdminErrorBoundary>
      <SuperAdminDashboard />
    </AdminErrorBoundary>
  );
} 