import { AuthGuard } from "@/components/auth/auth-guard";
import { Layout } from "@/components/layout";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <AuthGuard>
        <Layout showLogout>{children}</Layout>
      </AuthGuard>
    </>
  );
}
