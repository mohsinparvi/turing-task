"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data = [
  {
    id: "1",
    callType: "Voice Mail",
    direction: "Outbound",
    duration: "80 minutes 23 seconds",
    durationSeconds: 4823,
    from: "+33148288105",
    to: "+33166114113",
    via: "+33148288105",
    createdAt: "12-08-2022",
    status: "Archived",
  },
  {
    id: "2",
    callType: "Missed",
    direction: "Outbound",
    duration: "80 minutes 23 seconds",
    durationSeconds: 4823,
    from: "+33166114113",
    to: "+33148288105",
    via: "+33148288105",
    createdAt: "13-08-2022",
    status: "Archived",
  },
  {
    id: "3",
    callType: "Voice Mail",
    direction: "Outbound",
    duration: "80 minutes 23 seconds",
    durationSeconds: 4823,
    from: "+33148288105",
    to: "+33166114113",
    via: "+33148288105",
    createdAt: "12-08-2022",
    status: "Archived",
  },
  {
    id: "4",
    callType: "Missed",
    direction: "Outbound",
    duration: "80 minutes 23 seconds",
    durationSeconds: 4823,
    from: "+33166114113",
    to: "+33148288105",
    via: "+33148288105",
    createdAt: "13-08-2022",
    status: "Archived",
  },
  {
    id: "5",
    callType: "Voice Mail",
    direction: "Outbound",
    duration: "80 minutes 23 seconds",
    durationSeconds: 4823,
    from: "+33148288105",
    to: "+33166114113",
    via: "+33148288105",
    createdAt: "12-08-2022",
    status: "Archived",
  },
  {
    id: "6",
    callType: "Missed",
    direction: "Outbound",
    duration: "80 minutes 23 seconds",
    durationSeconds: 4823,
    from: "+33166114113",
    to: "+33148288105",
    via: "+33148288105",
    createdAt: "13-08-2022",
    status: "Archived",
  },
]

export type CallRecord = {
  id: string
  callType: string
  direction: string
  duration: string
  durationSeconds: number
  from: string
  to: string
  via: string
  createdAt: string
  status: string
}

export const columns: ColumnDef<CallRecord>[] = [
  {
    accessorKey: "callType",
    header: "CALL TYPE",
    cell: ({ row }) => {
      const callType = row.getValue("callType") as string
      const color = callType === "Voice Mail" ? "text-blue-500" : "text-red-500"
      return <div className={color}>{callType}</div>
    },
  },
  {
    accessorKey: "direction",
    header: "DIRECTION",
    cell: ({ row }) => <div>{row.getValue("direction")}</div>,
  },
  {
    accessorKey: "duration",
    header: "DURATION",
    cell: ({ row }) => {
      const duration = row.getValue("duration") as string
      const seconds = row.original.durationSeconds
      return (
        <div>
          {duration}
          <div className="text-xs text-gray-400">({seconds} seconds)</div>
        </div>
      )
    },
  },
  {
    accessorKey: "from",
    header: "FROM",
    cell: ({ row }) => <div>{row.getValue("from")}</div>,
  },
  {
    accessorKey: "to",
    header: "TO",
    cell: ({ row }) => <div>{row.getValue("to")}</div>,
  },
  {
    accessorKey: "via",
    header: "VIA",
    cell: ({ row }) => <div>{row.getValue("via")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "CREATED AT",
    cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => (
      <div className="text-green-500">{row.getValue("status")}</div>
    ),
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: () => {
      return (
        <Button variant="primary" size="sm" className="bg-blue-600 text-white">
          Add Note
        </Button>
      )
    },
  },
]

export function CallHistoryTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="text-2xl font-bold">Turing Technologies Frontend Test</div>
      </div>
      <div className="flex items-center py-4">
        <div className="flex items-center">
          <span className="mr-2">Filter by:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-2">
                Archived <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuCheckboxItem checked={true}>
                Archived
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Active
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          &lt;
        </Button>
        {Array.from({ length: table.getPageCount() }, (_, i) => (
          <Button
            key={i}
            variant={table.getState().pagination.pageIndex === i ? "filled" : "outline"}
            size="sm"
            onClick={() => table.setPageIndex(i)}
            className={table.getState().pagination.pageIndex === i ? "bg-blue-600 text-white" : ""}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          &gt;
        </Button>
      </div>
      <div className="text-center text-sm">
        {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} - {" "}
        {Math.min(
          (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
          table.getFilteredRowModel().rows.length
        )}{" "}
        of {table.getFilteredRowModel().rows.length} results
      </div>
    </div>
  )
}