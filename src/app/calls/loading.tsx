"use client";

import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 bg-blue-600" />
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-10 w-24 rounded-md bg-blue-600" />
      </header>

      {/* Title */}
      <div className="p-4">
        <Skeleton className="h-8 w-72 mb-8" />
      </div>

      {/* Filter */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2">
          <span>Filter by:</span>
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      {/* Table */}
      <div className="px-4 overflow-x-auto">
        <div className="min-w-full border rounded-md">
          {/* Table Header */}
          <div className="grid grid-cols-9 bg-gray-50 border-b">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="p-3">
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>

          {/* Table Rows */}
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-9 border-b animate-pulse"
            >
              <div className="p-3">
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="p-3">
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="p-3">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24 mt-1" />
              </div>
              <div className="p-3">
                <Skeleton className="h-5 w-28" />
              </div>
              <div className="p-3">
                <Skeleton className="h-5 w-28" />
              </div>
              <div className="p-3">
                <Skeleton className="h-5 w-28" />
              </div>
              <div className="p-3">
                <Skeleton className="h-5 w-36" />
              </div>
              <div className="p-3">
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              <div className="p-3">
                <Skeleton className="h-9 w-24 rounded-md bg-blue-100" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6 pb-6">
        <Skeleton className="h-8 w-8 rounded-md" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-md" />
        ))}
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      {/* Results count */}
      <div className="flex justify-center pb-6">
        <Skeleton className="h-5 w-32" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
