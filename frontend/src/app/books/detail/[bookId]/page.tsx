import { Metadata } from "next";
import { BookDetail } from "@/components/books/book-detail";
import { BookFetchError } from "@/components/books/book-fetch-error";
import { bookService } from "@/services/book";

interface Props {
  params: Promise<{ bookId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const bookParams = await params;
  const book = await bookService.getBookById(bookParams.bookId);

  return {
    title: book.title,
    description: book.description,
    openGraph: {
      title: `${book.title} | RGT 도서관리 시스템`,
      description: `작가 : ${book.author} 설명 : ${book.description}`,
      images: [
        {
          url: book.coverImage,
          width: 800,
          height: 600,
          alt: book.title,
        },
      ],
    },
  };
}

interface BookDetailPageProps {
  bookId: string;
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<BookDetailPageProps>;
}) {
  const bookId = await params;
  try {
    const book = await bookService.getBookById(bookId.bookId);
    return <BookDetail book={book} />;
  } catch (error) {
    console.log(error);
    return <BookFetchError />;
  }
}
