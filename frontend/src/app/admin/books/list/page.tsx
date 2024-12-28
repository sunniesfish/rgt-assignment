import { bookService } from "@/services/book";
import AdminBooks from "./component";
import { BookFetchError } from "@/components/books/book-fetch-error";

interface SearchParams {
  page?: string;
  title?: string | string[];
  author?: string | string[];
}

export default async function AdminBooksPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  try {
    const params = await searchParams;
    const pageNumber = parseInt(params.page || "1", 10);
    const title = Array.isArray(params.title) ? params.title[0] : params.title;
    const author = Array.isArray(params.author)
      ? params.author[0]
      : params.author;

    const books = await bookService.getBooks({
      page: pageNumber,
      title,
      author,
    });

    return <AdminBooks booksData={books} pageNo={pageNumber} />;
  } catch (error) {
    console.error("도서 목록 조회 실패:", error);
    return <BookFetchError />;
  }
}
