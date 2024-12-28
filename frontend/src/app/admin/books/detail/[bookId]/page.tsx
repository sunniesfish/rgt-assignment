import { BookDetail } from "@/components/books/book-detail";
import { BookFetchError } from "@/components/books/book-fetch-error";
import { bookService } from "@/services/book";

export default async function AdminBookDetailPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const bookId = await params;
  try {
    const book = await bookService.getBookById(bookId.bookId);
    console.log("book detail page", book);
    return <BookDetail book={book} isAdmin={true} />;
  } catch (error) {
    console.log(error);
    return <BookFetchError />;
  }
}
