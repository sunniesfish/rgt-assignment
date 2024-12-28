"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ApiError } from "@/types/common.type";
import { authService } from "@/services/auth";

const signUpSchema = z.object({
  userId: z.string().min(1, "사용자 아이디를 입력해주세요"),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .max(100, "비밀번호가 너무 깁니다"),
  employeeId: z.string().min(1, "사원번호를 입력해주세요"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    getValues,
    clearErrors,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const checkUserId = async (userId: string) => {
    try {
      const result = await authService.checkUserId(userId);
      if (result) {
        console.log("if result", result);
        toast({
          title: "사용 가능한 아이디",
          description: "이 아이디를 사용하실 수 있습니다.",
        });
      } else {
        console.log("else result", result);
        toast({
          title: "확인 실패",
          description: "이 아이디는 이미 사용 중입니다.",
          variant: "destructive",
        });
      }
    } catch (err) {
      const error = err as ApiError;
      console.log("error", error);
      toast({
        title: "확인 실패",
        description: error.message || "아이디 중복 확인에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: SignUpFormData) => {
    clearErrors();

    try {
      await authService.signUp(data);
      router.push("/login");
    } catch (err) {
      const error = err as ApiError;
      setError("root", {
        type: "manual",
        message: error.message || "회원가입에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Username"
          {...register("userId")}
          aria-invalid={!!errors.userId}
        />
        <Button type="button" onClick={() => checkUserId(getValues("userId"))}>
          중복확인
        </Button>
      </div>
      {errors.userId && (
        <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>
      )}

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

      <div>
        <Input
          type="text"
          placeholder="Employee ID"
          {...register("employeeId")}
          aria-invalid={!!errors.employeeId}
        />
        {errors.employeeId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.employeeId.message}
          </p>
        )}
      </div>

      {errors.root && (
        <div className="text-red-500 text-sm">{errors.root.message}</div>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "계정 생성 중..." : "계정 생성"}
      </Button>
    </form>
  );
}
