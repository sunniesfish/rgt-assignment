import Image from "next/image";
import Link from "next/link";
import { BookSearchData } from "@/types/book.type";

interface BookListProps {
  books: BookSearchData[];
  isAdmin?: boolean;
}

export function BookList({ books, isAdmin = false }: BookListProps) {
  return (
    <div className="flex flex-col gap-4">
      {books.map((book) => (
        <Link
          href={
            isAdmin
              ? `/admin/books/detail/${book.id}`
              : `/books/detail/${book.id}`
          }
          key={book.id}
        >
          <div className="flex border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out w-full">
            <div className="w-32 h-32 flex-shrink-0">
              <Image
                src={
                  book.coverImageThumbnail?.length > 0
                    ? book.coverImageThumbnail
                    : "/images/no-image.png"
                }
                alt={book.title}
                width={128}
                height={128}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-1 items-center p-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600">{book.author}</p>
              </div>
              <div className="flex flex-col items-end ml-4">
                <p className="text-sm font-medium">{book.price}원</p>
                <p className="text-sm text-gray-600">
                  재고: {book.stockQuantity}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
