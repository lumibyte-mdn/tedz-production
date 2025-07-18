'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  ColumnMeta,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { IconPlus } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { useState } from 'react';

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  loading?: boolean;
  withAddButton?: boolean;
  onAdd?: () => void;
}

export function DataTable<TData>({
  columns,
  data,
  loading,
  withAddButton = false,
  onAdd,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination,
      columnFilters,
    },
  });

  return (
    <div>
      <div className='flex items-center py-4 gap-4'>
        <Input
          placeholder='Search...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='max-w-60 text-sm'
        />
        {withAddButton && (
          <Button onClick={onAdd}>
            <IconPlus />
            Create New
          </Button>
        )}
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta as ColumnMeta<
                    TData,
                    any
                  >;
                  return (
                    <TableHead
                      key={header.id}
                      className='hover:!bg-gray-100 dark:hover:!bg-gray-800'
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ width: meta?.width || 'auto' }}
                    >
                      <div
                        className={cn(
                          'select-none text-nowrap flex-between relative p-3',
                          header.column.getCanSort()
                            ? 'cursor-pointer'
                            : 'cursor-default'
                        )}
                        style={{ width: meta?.width || 'auto' }}
                      >
                        <span className='mr-2'>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </span>

                        {header.column.getCanSort() && (
                          <span
                            className={cn(
                              'absolute right-3 top-0 bottom-0 w-3 h-full before:content-["▲"] after:content-["▼"] before:absolute after:absolute before:left-0 after:left-0 before:bottom-1/2 after:top-1/2 before:text-gray-300 after:text-gray-300 before:!leading-none after:!leading-none before:text-xs after:text-xs dark:before:text-gray-500 dark:after:text-gray-500',
                              header.column.getIsSorted() === 'asc' &&
                                'before:text-primary dark:before:text-primary',
                              header.column.getIsSorted() === 'desc' &&
                                'after:text-primary dark:after:text-primary'
                            )}
                          />
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center '
                >
                  <div className='flex items-center w-fit mx-auto gap-2'>
                    <Loader2 className='animate-spin h-6 w-6 mx-auto' />
                    <span className='ml-2'>Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn('whitespace-nowrap ps-5 py-3')}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 pt-4'>
        <Pagination>
          <PaginationContent className='w-fit ml-auto'>
            {table.getCanPreviousPage() && (
              <PaginationItem>
                <PaginationPrevious onClick={() => table.previousPage()} />
              </PaginationItem>
            )}
            {table.getCanNextPage() && (
              <PaginationItem>
                <PaginationNext onClick={() => table.nextPage()} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
