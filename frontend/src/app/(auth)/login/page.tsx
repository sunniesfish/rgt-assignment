import Link from "next/link";
import { Layout } from "@/components/layout";
import { SignInForm } from "@/components/auth/sign-in-form";

export default function LoginPage() {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">로그인</h2>
        <SignInForm />
        <p className="mt-4 text-center">
          계정이 없으신가요?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </Layout>
  );
}
