"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export function SignOutBtn() {
  const router = useRouter();
  const { signOut } = useAuthStore();
  const handleLogout = async () => {
    await signOut();
    router.push("/books/list");
  };
  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
