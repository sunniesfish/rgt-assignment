import Link from "next/link";
import { Layout } from "@/components/layout";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function RegisterPage() {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">회원가입</h2>
        <SignUpForm />
        <p className="mt-4 text-center">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </Layout>
  );
}
