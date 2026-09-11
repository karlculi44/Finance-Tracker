import type { ReactNode } from "react";

type DateRangeType =
  | "All Time"
  | "Today"
  | "Last 3 Days"
  | "This Week"
  | "Last 2 Weeks"
  | "This Month"
  | "Last 3 Months";

type SummaryCardsDataType = {
  label: string;
  value: number;
  icon: ReactNode;
  tone: string;
};

export type { DateRangeType, SummaryCardsDataType };
