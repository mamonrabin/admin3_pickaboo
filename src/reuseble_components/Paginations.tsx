import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

const Paginations = ({ page = 1,
  limit = 10,
  total = 0,
  setPage,
  setLimit,}:PaginationProps) => {

    const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="w-full flex md:flex-row flex-col   items-center justify-between gap-4">
      {/* Rows per page */}
      <div className="md:w-1/2 flex items-center gap-2 text-sm font-medium">
        <p>Rows per page</p>

        <select 
        value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        className="border rounded px-2 py-1">
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

        <p>Page {page} of {totalPages}</p>
      </div>

      
      <Pagination className="md:w-1/2">
        <PaginationContent className="">
       
          <PaginationItem>
            <PaginationPrevious onClick={() => page > 1 && setPage(page - 1)}
              className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
          </PaginationItem>
           {pages.map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={() => setPage(p)}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next */}
          <PaginationItem>
            <PaginationNext onClick={() => page < totalPages && setPage(page + 1)}
              className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginations;
