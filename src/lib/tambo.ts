/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 */

import { Graph, graphSchema } from "@/components/tambo/graph";
import { SmartTable, smartTableSchema } from "@/components/tambo/smart-table";
import { DataCard, dataCardSchema } from "@/components/ui/card-data";
import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";

/**
 * tools
 * We start with an empty array. We will add MCP tools here later if needed.
 */
export const tools: TamboTool[] = [];

/**
 * components
 * These are the "Lego Bricks" the AI can use to build UIs.
 */
export const components: TamboComponent[] = [
  // 1. The Chart Component (Reused from template)
  {
    name: "Graph",
    description: "Renders bar, line, or pie charts. Use this for visualizing statistics, trends, or analytics (e.g. YouTube views, sales data).",
    component: Graph,
    propsSchema: graphSchema,
  },
  // 2. The Card Selection Component (Reused from template)
  {
    name: "DataCard",
    description: "Displays a list of selectable items as cards. Use this for choices, options, or lists where the user might want to select one or more items.",
    component: DataCard,
    propsSchema: dataCardSchema,
  },
  // We will add SmartTable here in the next step
  {
    name: "SmartTable",
    description: "Renders a data table. Use this for lists, log analysis, error reports, pricing grids, or comparison data.",
    component: SmartTable,
    propsSchema: smartTableSchema,
  },
];