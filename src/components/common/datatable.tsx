"use client";
import React, { useEffect } from "react";
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
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCallData } from "@/services/call-service";
import { CallRecord } from "@/lib/types";
import { formatDuration } from "@/lib/helpers";

export const columns: ColumnDef<CallRecord>[] = [
  {
    accessorKey: "call_type",
    header: "CALL TYPE",
    cell: ({ row }) => {
      const callType = row.getValue("call_type") as string;

      const colorMap: Record<string, string> = {
        answered: "text-green-500",
        missed: "text-red-500",
        voicemail: "text-blue-500",
      };

      return (
        <div className={`${colorMap[callType] || "text-blue"} capitalize`}>
          {callType}
        </div>
      );
    },
  },
  {
    accessorKey: "direction",
    header: "DIRECTION",
    cell: ({ row }) => (
      <p className="text-blue-800 capitalize">{row.getValue("direction")}</p>
    ),
  },
  {
    accessorKey: "duration",
    header: "DURATION",
    cell: ({ row }) => {
      const seconds = row.original.duration;
      const time = formatDuration(Number(seconds));
      return (
        <div>
          {time}
          <div className="text-xs text-blue-800">({seconds} seconds)</div>
        </div>
      );
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
    accessorKey: "created_at",
    header: "CREATED AT",
    cell: ({ row }) => <div>{row.getValue("created_at")}</div>,
  },
  {
    accessorKey: "is_archived",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("is_archived") as string;

      return (
        <div
          className={`${
            status ? "  text-cyan-300 bg-cyan-50" : " text-gray-600 bg-gray-100"
          } text-blue capitalize rounded-md p-2 text-center`}
        >
          {status ? "Archived" : "UnArchived"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: () => {
      return (
        <Button variant="default" size="sm" className="bg-blue-600 text-white">
          Add Note
        </Button>
      );
    },
  },
];

export function CallHistoryTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [callsData, setCallsData] = React.useState<CallRecord[]>([]);
  const [originalData, setOriginalData] = React.useState<CallRecord[]>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  // const [isLoading, setIsLoading] = React.useState(false);
  const [filter, setFilter] = React.useState("All");

  const table = useReactTable({
    data: callsData,
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
        pageIndex: pageIndex,
        pageSize: 10,
      },
    },
  });

  const getData = async (page: number, pageSize: number) => {
    try {
      const response = await getCallData(page, pageSize);
      setOriginalData(response.nodes);
      setCallsData(response.nodes);
      setPageSize(response.totalCount);
    } catch (error) {
      console.log("Error fetching call data:", error);
    }
  };

  useEffect(() => {
    getData(pageIndex, pageSize);
  }, [pageIndex]);

  useEffect(() => {
    let filteredData = originalData;
    if (filter === "Archived") {
      filteredData = originalData.filter((call) => call.is_archived);
    } else if (filter === "Unarchive") {
      filteredData = originalData.filter((call) => !call.is_archived);
    }
    setCallsData(filteredData);
  }, [filter, originalData]);

  const handlePageChange = (newPage: number) => {
    setPageIndex(newPage);
    getData(newPage, 10);
  };

  const totalPages = Math.ceil(pageSize / 10);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="text-2xl font-bold">
          Turing Technologies Frontend Test
        </div>
      </div>
      <div className="flex items-center py-4">
        <div className="flex items-center">
          <span className="mr-2">Filter by:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-2">
                {filter} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuCheckboxItem
                checked={filter === "Archived"}
                onSelect={() => setFilter("Archived")}
              >
                Archived
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filter === "Unarchive"}
                onSelect={() => setFilter("Unarchive")}
              >
                Unarchive
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filter === "All"}
                onSelect={() => setFilter("All")}
              >
                All
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
                  );
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
          onClick={() => handlePageChange(pageIndex - 1)}
          disabled={pageIndex === 0}
        >
          &lt;
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            variant={pageIndex === i ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(i)}
            className={pageIndex === i ? "bg-blue-600 text-white" : ""}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(pageIndex + 1)}
          disabled={pageIndex === totalPages - 1}
        >
          &gt;
        </Button>
      </div>
      <div className="text-center text-sm">
        {pageIndex * pageSize + 1} -{" "}
        {Math.min(
          (pageIndex + 1) * pageSize,
          table.getFilteredRowModel().rows.length
        )}{" "}
        of {table.getFilteredRowModel().rows.length} results
      </div>
    </div>
  );
}
