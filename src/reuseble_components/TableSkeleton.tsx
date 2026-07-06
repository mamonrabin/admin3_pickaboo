import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index}>
          <TableCell><Skeleton className="h-4 w-6" /></TableCell>
          <TableCell><Skeleton className="h-4 w-32" /></TableCell>
          <TableCell><Skeleton className="h-4 w-32" /></TableCell>
          <TableCell><Skeleton className="h-20 w-20 rounded-md" /></TableCell>
          <TableCell><Skeleton className="h-9 w-20 rounded-md" /></TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableSkeleton;