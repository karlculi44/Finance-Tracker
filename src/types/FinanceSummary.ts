import type { ReactNode } from "react";

export type FinanceSummaryType = {
  balance: number;
  income: number;
  expenses: number;
};

export type SummaryCardsDataType = {
  label: string;
  value: number;
  detail: string;
  icon: ReactNode;
  tone: string;
};
