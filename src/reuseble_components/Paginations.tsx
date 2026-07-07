/* eslint-disable prefer-const */
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

const Paginations = ({
  page = 1,
  limit = 10,
  total = 0,
  setPage,
  setLimit,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show limited page numbers with ellipsis
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
      {/* Rows per page - Left side */}
      <div className="flex items-center gap-2 sm:gap-3 text-sm w-full sm:w-auto justify-center sm:justify-start">
        <span className="text-gray-600 font-medium whitespace-nowrap">Rows per page</span>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 text-sm bg-white hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 cursor-pointer w-16 sm:w-auto"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="text-gray-600 whitespace-nowrap">
          Page <span className="font-semibold text-gray-800">{page}</span> of{" "}
          <span className="font-semibold text-gray-800">{totalPages}</span>
        </span>
      </div>

      {/* Pagination - Right side */}
      <Pagination className="w-full sm:w-auto">
        <PaginationContent className="flex flex-wrap justify-center gap-1">
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && setPage(page - 1)}
              className={`${
                page === 1
                  ? "pointer-events-none opacity-40 cursor-not-allowed"
                  : "hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
              } border border-gray-200 rounded-lg transition-all duration-200 px-2 sm:px-3`}
            >
              <ChevronLeft size={16} />
              <span className="sr-only">Previous</span>
            </PaginationPrevious>
          </PaginationItem>

          {/* Page Numbers */}
          {visiblePages.map((p, index) => (
            <PaginationItem key={index}>
              {p === "..." ? (
                <PaginationEllipsis className="text-gray-400 px-1" />
              ) : (
                <PaginationLink
                  isActive={p === page}
                  onClick={() => setPage(Number(p))}
                  className={`cursor-pointer transition-all duration-200 rounded-lg min-w-[32px] sm:min-w-[36px] h-8 sm:h-9 flex items-center justify-center ${
                    p === page
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                      : "hover:bg-gray-100 text-gray-700 hover:text-gray-900 border border-transparent hover:border-gray-300"
                  }`}
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={() => page < totalPages && setPage(page + 1)}
              className={`${
                page === totalPages
                  ? "pointer-events-none opacity-40 cursor-not-allowed"
                  : "hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
              } border border-gray-200 rounded-lg transition-all duration-200 px-2 sm:px-3`}
            >
              <ChevronRight size={16} />
              <span className="sr-only">Next</span>
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginations;