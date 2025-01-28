import { Skeleton } from '@/src/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/src/components/ui/table'

interface DataTableLoadingProps {
  columnCount: number
  rowCount?: number
}

export function DataTableLoadingWithoutFilter({
  columnCount,
  rowCount = 10,
}: DataTableLoadingProps) {
  return (
    <div className="w-full space-y-3 overflow-auto">
      <div className="rounded-md">
        {/* Removed the border class from this div */}
        <Table>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent">
                {Array.from({ length: columnCount }).map((_, i) => (
                  <TableCell key={i}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
