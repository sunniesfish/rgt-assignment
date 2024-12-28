import { Layout } from "@/components/layout";

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout showAdminLogin>{children}</Layout>;
}
