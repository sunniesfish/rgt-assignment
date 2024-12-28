"use client";

import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";
import Loading from "../loading";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }
  return children;
}
