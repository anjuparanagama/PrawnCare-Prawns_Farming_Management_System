"use client";

import React from "react";

export default function ResponsiveTable({
  columns = [],
  data = [],
  loading = false,
  error = null,

  // row click
  onRowClick = null,
  rowClickable = false,

  // see all button
  showSeeAll = true,
  onSeeAll = null,
  seeAllText = "See All",

  // custom empty message
  emptyMessage = "No data available",

  // status badge
  statusColumn = null,

  // mobile title
  mobileTitle = "Data",
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return `${date.getFullYear()} - ${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )} - ${String(date.getDate()).padStart(2, "0")}`;
  };

  const statusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-200 text-green-800";

      case "Cancelled":
        return "bg-red-200 text-red-800";

      case "New":
        return "bg-yellow-200 text-yellow-800";

      case "Processing":
        return "bg-blue-200 text-blue-800";

      case "Delivered":
        return "bg-purple-200 text-purple-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderValue = (row, column) => {
    const value = row[column.key];

    if (column.type === "date") {
      return formatDate(value);
    }

    if (column.type === "currency") {
      return `Rs. ${(value || 0).toLocaleString()}`;
    }

    if (column.type === "status") {
      return (
        <span
          className={`
        inline-block px-2 py-1 rounded-full 
        text-xs font-semibold
        ${statusStyle(value)}
        `}
        >
          {value}
        </span>
      );
    }

    return value;
  };

  if (loading) {
    return <div className="p-5 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-5 text-center text-red-500">Error : {error}</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Desktop Table */}

      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-100 text-black">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
px-3 lg:px-6 py-3 
text-xs font-medium uppercase
tracking-wider
${column.align === "right" ? "text-right" : "text-left"}
`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-5">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    if (rowClickable && onRowClick) {
                      onRowClick(row);
                    }
                  }}
                  className={`
${index % 2 === 0 ? "bg-white" : "bg-gray-50"}

${rowClickable ? "cursor-pointer hover:bg-gray-100" : ""}

transition-colors
`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`
px-3 lg:px-6 py-4 text-sm

${column.align === "right" ? "text-right" : "text-left"}

text-gray-700
`}
                    >
                      {renderValue(row, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}

      <div className="sm:hidden">
        <div className="bg-blue-100 px-4 py-3">
          <h2 className="text-lg font-semibold">{mobileTitle}</h2>
        </div>

        <div className="divide-y">
          {data.map((row, index) => (
            <div
              key={index}
              onClick={() => {
                if (rowClickable && onRowClick) {
                  onRowClick(row);
                }
              }}
              className={`
p-4

${rowClickable ? "cursor-pointer hover:bg-gray-50" : ""}

`}
            >
              <div className="space-y-2">
                {columns.map((column) => (
                  <div key={column.key} className="flex justify-between">
                    <span className="text-xs text-gray-500">
                      {column.label}
                    </span>

                    <span className="text-sm font-medium text-gray-900">
                      {renderValue(row, column)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* See All */}

      {showSeeAll && (
        <div
          onClick={onSeeAll}
          className="
text-center 
text-sm 
font-medium
py-3
text-gray-600
border-t
cursor-pointer
hover:bg-gray-50
"
        >
          {seeAllText}
        </div>
      )}
    </div>
  );
}
