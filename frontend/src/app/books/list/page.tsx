import { bookService } from "@/services/book";
import Books from "./component";
import { Metadata } from "next";

interface SearchParams {
  page?: string;
  title?: string | string[];
  author?: string | string[];
}

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const title = Array.isArray(params.title) ? params.title[0] : params.title;
  const author = Array.isArray(params.author)
    ? params.author[0]
    : params.author;
  const pageNumber = parseInt(params.page || "1", 10);

  const books = await bookService.getBooks({
    page: pageNumber,
    title,
    author,
  });

  return <Books booksData={books} pageNo={pageNumber} />;
}

export const metadata: Metadata = {
  title: "도서 목록",
  description: "RGT의 모든 도서 목록을 확인하고 검색할 수 있습니다.",
  openGraph: {
    title: "도서 목록 | RGT 도서관리 시스템",
    description: "RGT의 모든 도서 목록을 확인하고 검색할 수 있습니다.",
  },
};
