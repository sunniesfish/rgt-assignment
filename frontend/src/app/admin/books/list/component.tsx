"use client";

import { PaginatedResponse } from "@/types/common.type";
import { BookList } from "@/components/books/book-list";
import { SearchForm } from "@/components/books/search-form";
import { Button } from "@/components/ui/button";
import { BookSearchData } from "@/types/book.type";
import { useBooksQuery } from "@/hooks/book.hook";
import { Spinner } from "@/components/ui/spinner";
import { Pagination } from "@/components/pagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AdminBooks({
  booksData,
  pageNo,
}: {
  booksData: PaginatedResponse<BookSearchData>;
  pageNo: number;
}) {
  const searchParams = useSearchParams();
  const {
    data: booksPage,
    isLoading,
    isError,
    error,
  } = useBooksQuery(
    pageNo,
    {
      author: searchParams.get("author") || "",
      title: searchParams.get("title") || "",
      limit: 10,
      page: pageNo,
      order: "DESC",
    },
    booksData
  );
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Book Management</h2>
        <Link href="/admin/books/list/new">
          <Button>Create New Book</Button>
        </Link>
      </div>
      <SearchForm baseUrl="/admin/books/list" />
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <BookList books={booksPage?.data ?? []} isAdmin />
          <Pagination
            currentPage={pageNo ?? 1}
            lastPage={booksPage?.meta.lastPage ?? 1}
            hasNextPage={booksPage?.meta.hasNextPage ?? false}
            hasPreviousPage={booksPage?.meta.hasPreviousPage ?? false}
            baseUrl="/admin/books/list"
          />
        </>
      )}
    </>
  );
}
