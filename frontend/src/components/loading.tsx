import { Layout } from "@/components/layout";
import { Spinner } from "@/components/ui/spinner";
import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <BookOpen className="w-16 h-16 text-primary mb-8 animate-pulse" />
        <Spinner size="lg" className="mb-4" />
        <h2 className="text-2xl font-semibold text-primary mb-2">Loading</h2>
        <p className="text-muted-foreground">페이지를 불러오는 중입니다.</p>
      </div>
    </Layout>
  );
}
