"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { z } from "zod";

// 1. The Corrected Zod Schema
// We removed 'data' (dynamic keys) and replaced it with 'rows' (strict array of strings)
export const smartTableSchema = z.object({
  title: z.string().optional().describe("A concise title for the table"),
  columns: z.array(z.string()).describe("List of column headers"),
  rows: z.array(
    z.object({
      values: z.array(z.string()).describe("The list of values for this row, matching the order of the columns.")
    })
  ).describe("The data rows for the table"),
  variant: z.enum(['default', 'error', 'success', 'pricing']).optional().describe("Visual style. Use 'pricing' for rate cards."),
});

// 2. Updated Type Definition
export type SmartTableProps = z.infer<typeof smartTableSchema> & React.HTMLAttributes<HTMLDivElement>;

// 3. Updated Component Implementation
export const SmartTable = React.forwardRef<HTMLDivElement, SmartTableProps>(
  ({ title, columns, rows, variant = "default", className, ...props }, ref) => {
    
    const headerColor = variant === 'error' ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-200' : 
                        variant === 'pricing' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200' :
                        'bg-muted/50 text-muted-foreground';

    return (
      <div 
        ref={ref}
        className={cn("w-full my-4 border rounded-lg overflow-hidden shadow-sm bg-card text-card-foreground", className)} 
        {...props}
      >
        {title && (
          <div className={cn("px-4 py-3 border-b font-semibold text-sm flex items-center gap-2", headerColor)}>
            {variant === 'error' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>}
            {title}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/30 text-muted-foreground">
              <tr>
                {columns.map((col, i) => (
                  <th key={i} className="px-4 py-3 font-medium whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  {/* We now map through the values array directly, relying on index order */}
                  {row.values.map((cellValue, j) => (
                    <td key={j} className="px-4 py-3 whitespace-nowrap">
                      {cellValue || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

SmartTable.displayName = "SmartTable";