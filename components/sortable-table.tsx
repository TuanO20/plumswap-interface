"use client"

import type React from "react"

import { useState } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface SortableTableProps<T> {
  data: T[]
  columns: {
    key: string
    header: string
    cell: (item: T) => React.ReactNode
    sortable?: boolean
    sortKey?: keyof T
  }[]
  onRowClick?: (item: T) => void
  className?: string
}

export function SortableTable<T>({ data, columns, onRowClick, className }: SortableTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full border-collapse", className)}>
        <thead>
          <tr className="border-b border-border">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-4 py-3 text-sm font-medium text-muted-foreground",
                  column.key === "name" ? "text-left" : "text-right",
                  column.sortable && "cursor-pointer hover:text-foreground",
                )}
                onClick={() => column.sortable && column.sortKey && handleSort(column.sortKey)}
              >
                <div className={cn("flex items-center gap-1", column.key === "name" ? "justify-start" : "justify-end")}>
                  {column.header}
                  {column.sortable &&
                    column.sortKey &&
                    sortColumn === column.sortKey &&
                    (sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr
              key={index}
              className={cn("border-b border-border", onRowClick && "cursor-pointer hover:bg-muted/20")}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {columns.map((column) => (
                <td key={column.key} className={cn("px-4 py-4", column.key === "name" ? "text-left" : "text-right")}>
                  {column.cell(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

