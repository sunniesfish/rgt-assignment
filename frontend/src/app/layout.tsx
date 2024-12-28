import type { Metadata } from "next";
import QueryProvider from "@/config/react-query-provider";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: "RGT 도서관리 시스템",
    template: "%s | RGT 도서관리 시스템",
  },
  description: "RGT의 도서를 관리하고 검색할 수 있는 도서관리 시스템입니다.",
  keywords: ["도서", "도서관리", "RGT", "책", "도서검색"],
  authors: [{ name: "RGT" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://rgt-pi.vercel.app/",
    siteName: "RGT 도서관리 시스템",
    title: "RGT 도서관리 시스템",
    description: "도서를 관리하고 검색할 수 있는 도서관리 시스템입니다.",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
