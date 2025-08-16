/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RefreshCcw } from "lucide-react";
import React, { useState, useMemo } from "react";

type Column<T> = {
  header: string;
  accessor: keyof T | string;
  render?: (row: T) => React.ReactNode;
  searchable?: boolean;
  sortable?: boolean;
  searchValue?: (row: T) => string; // NEW: to enable searching rendered content
};

interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  refresh?: () => void;
}

export function GenericTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 10,
  refresh,
}: GenericTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSort = (accessor: string) => {
    if (sortKey === accessor) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(accessor);
      setSortOrder("asc");
    }
  };

  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter((item) => {
      return columns
        .filter((col) => col.searchable)
        .some((col) => {
          const value =
            typeof col.searchValue === "function"
              ? col.searchValue(item)
              : item[col.accessor as keyof T];

          return String(value ?? "")
            .toLowerCase()
            .includes(search.toLowerCase());
        });
    });
  }, [data, search, columns]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey as keyof T];
      const bValue = b[sortKey as keyof T];

      if (aValue === bValue) return 0;

      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredData, sortKey, sortOrder]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="space-y-4">
      {/* Search + Refresh */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded w-full max-w-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {refresh && (
          <button
            onClick={refresh}
            type="button"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-300"
          >
            <RefreshCcw className="w-5 h-5" /> Refresh
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => col.sortable && handleSort(String(col.accessor))}
                  className={`px-4 py-3 font-semibold whitespace-nowrap ${
                    col.sortable ? "cursor-pointer hover:underline" : ""
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {sortKey === col.accessor && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">
                  No results found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-4 py-2">
                      {col.render
                        ? col.render(row)
                        : String(row[col.accessor as keyof T] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

