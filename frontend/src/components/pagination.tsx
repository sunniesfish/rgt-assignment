"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import React from "react";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  baseUrl: string;
}

interface PageButtonProps {
  page: number;
  isCurrentPage: boolean;
  onClick: (page: number) => void;
}

const PageButton = ({ page, isCurrentPage, onClick }: PageButtonProps) => (
  <Button
    variant={isCurrentPage ? "secondary" : "outline"}
    size="sm"
    onClick={() => onClick(page)}
    className={`min-w-[2.5rem] ${
      isCurrentPage
        ? "bg-primary text-primary-foreground font-medium"
        : "hover:bg-secondary/80"
    }`}
  >
    {page}
  </Button>
);

const PageEllipsis = () => (
  <span className="px-2 text-muted-foreground">...</span>
);

export function Pagination({
  currentPage,
  lastPage,
  hasNextPage,
  hasPreviousPage,
  baseUrl,
}: PaginationProps) {
  const thisPage = Number(currentPage);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${baseUrl}?${params.toString()}`);
  };

  const getVisiblePages = () => {
    return Array.from({ length: lastPage }, (_, i) => i + 1).filter(
      (page) =>
        page === 1 ||
        page === lastPage ||
        (page >= thisPage - 2 && page <= thisPage + 2)
    );
  };

  const renderPageButtons = () => {
    const visiblePages = getVisiblePages();

    return visiblePages.map((page, index) => {
      const isCurrentPage = thisPage === page;
      const previousPage = visiblePages[index - 1];
      const needsEllipsis = index > 0 && previousPage !== page - 1;

      return (
        <React.Fragment key={`page-${page}`}>
          {needsEllipsis && <PageEllipsis />}
          <PageButton
            page={page}
            isCurrentPage={isCurrentPage}
            onClick={handlePageChange}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button
        variant="outline"
        size="sm"
        disabled={!hasPreviousPage}
        onClick={() => handlePageChange(thisPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex gap-1">{renderPageButtons()}</div>

      <Button
        variant="outline"
        size="sm"
        disabled={!hasNextPage}
        onClick={() => handlePageChange(thisPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
