import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignOutBtn } from "./auth/sign-out-btn";

export function Layout({
  children,
  showAdminLogin = false,
  showLogout = false,
}: {
  children: React.ReactNode;
  showAdminLogin?: boolean;
  showLogout?: boolean;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            <Link href={showLogout ? "/admin/books/list" : "/books/list"}>
              RGT Book Management System
            </Link>
          </h1>
          {showAdminLogin && (
            <Link href="/login">
              <Button variant="outline">Admin Login</Button>
            </Link>
          )}
          {showLogout && <SignOutBtn />}
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
