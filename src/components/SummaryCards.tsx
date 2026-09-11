import SummaryCard from "./SummaryCard";
import { CircleDollarSign, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import type {
  DateRangeType,
  SummaryCardsDataType,
} from "../types/FinanceSummary";

function SummaryCards({
  balance,
  totalIncome,
  totalExpenses,
  dateRange,
}: {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  dateRange: DateRangeType;
}) {
  const summaryCardsData: SummaryCardsDataType[] = [
    {
      label: "Balance",
      value: balance,
      detail: "",
      icon: <CircleDollarSign size={20} />,
      tone: "bg-indigo-50 text-indigo-600",
      accent: "app-accent-indigo",
    },
    {
      label: "Income",
      value: totalIncome,
      detail: dateRange,
      icon: <ArrowDownLeft size={20} />,
      tone: "bg-emerald-50 text-emerald-600",
      accent: "app-accent-emerald",
    },
    {
      label: "Expenses",
      value: totalExpenses,
      detail: dateRange,
      icon: <ArrowUpRight size={20} />,
      tone: "bg-amber-50 text-amber-600",
      accent: "app-accent-amber",
    },
  ];

  return (
    <section
      className="grid gap-4 md:grid-cols-3 lg:grid-cols-1"
      aria-label="Financial summary"
    >
      {summaryCardsData.map(({ label, value, detail, icon, tone, accent }) => (
        <SummaryCard
          key={label}
          label={label}
          value={value}
          detail={detail}
          icon={icon}
          tone={tone}
          accent={accent}
        />
      ))}
    </section>
  );
}
export default SummaryCards;
