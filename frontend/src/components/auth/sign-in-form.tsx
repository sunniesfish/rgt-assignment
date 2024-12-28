"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { authService } from "@/services/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/types/common.type";
import { useAuthStore } from "@/store/auth-store";

const signInSchema = z.object({
  userId: z.string().min(1, "아이디를 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const router = useRouter();
  const { setAuthenticated } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    clearErrors();

    try {
      await authService.signIn(data);
      setAuthenticated(true);
      router.push("/admin/books/list");
    } catch (err: unknown) {
      const error = err as ApiError;
      if (error.code === "INVALID_CREDENTIALS") {
        setError("userId", {
          type: "manual",
          message: "아이디 또는 비밀번호가 올바르지 않습니다",
        });
        setError("password", {
          type: "manual",
          message: "아이디 또는 비밀번호가 올바르지 않습니다",
        });
      } else if (error.code === "USER_NOT_FOUND") {
        setError("userId", {
          type: "manual",
          message: "존재하지 않는 사용자입니다",
        });
      } else {
        setError("root", {
          type: "manual",
          message: error.message || "로그인에 실패했습니다",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder="Username"
          {...register("userId")}
          aria-invalid={!!errors.userId}
        />
        {errors.userId && (
          <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>
        )}
      </div>
      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      {errors.root && (
        <div className="text-red-500 text-sm">{errors.root.message}</div>
      )}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
}
