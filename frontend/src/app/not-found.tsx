"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleGoBack = (): void => {
    router.back();
  };

  return (
    <Layout showAdminLogin={isAuthenticated}>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <BookOpen className="w-24 h-24 text-primary mb-8" />
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          페이지가 존재하지 않습니다!?
        </p>
        <Button onClick={handleGoBack}>이전 페이지로 돌아가기</Button>
      </div>
    </Layout>
  );
}
