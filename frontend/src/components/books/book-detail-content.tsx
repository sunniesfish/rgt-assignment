import { Button } from "@/components/ui/button";
import { Book } from "@/types/book.type";
import { useRouter } from "next/navigation";

export interface BookDetailContentProps {
  book: Book;
  isAdmin: boolean;
}

export function BookDetailContent({ book, isAdmin }: BookDetailContentProps) {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">{book.title}</h2>
        {isAdmin && (
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/books/detail/${book.id}/edit`)}
          >
            Edit Information
          </Button>
        )}
      </div>
      <p className="text-xl text-gray-600 mb-4">{book.author}</p>
      <p className="mb-2">Published: {book.publishedDate}</p>
      <p className="mb-4">Stock: {book.metadata.stockQuantity}</p>
      <h3 className="text-xl font-semibold mb-2">Description</h3>
      <p className="text-gray-700">{book.description}</p>
    </>
  );
}
