import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function BookFetchError() {
  return (
    <Alert variant="destructive" className="max-w-md mx-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <p className="mb-4">책 목록을 불러오는 중 오류가 발생했습니다.</p>
      </AlertDescription>
    </Alert>
  );
}
