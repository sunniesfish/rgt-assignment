"use client";

import { Book } from "@/types/book.type";
import Image from "next/image";
import { BookDetailContent } from "./book-detail-content";
import { useBookQuery } from "@/hooks/book.hook";
import Loading from "../loading";
export interface BookDetailProps {
  book: Book;
  isAdmin?: boolean;
}

export function BookDetail({ book, isAdmin = false }: BookDetailProps) {
  console.log("book detail", book);
  const { data: bookData } = useBookQuery(book.id, book);
  return (
    <>
      {!bookData ? (
        <Loading />
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Image
              src={"/images/no-image.png"}
              alt={bookData?.title ?? ""}
              width={400}
              height={600}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-2/3">
            <BookDetailContent book={book} isAdmin={isAdmin} />
          </div>
        </div>
      )}
    </>
  );
}
