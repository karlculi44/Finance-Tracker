import SummaryCard from "./SummaryCard";
import { CircleDollarSign, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import type { SummaryCardsDataType } from "../types/FinanceSummary";

function SummaryCards({
  totalIncome,
  totalExpenses,
}: {
  totalIncome: number;
  totalExpenses: number;
}) {
  const summaryCardsData: SummaryCardsDataType[] = [
    {
      label: "Balance",
      value: totalIncome - totalExpenses,
      icon: <CircleDollarSign size={20} />,
      tone: "bg-slate-100 text-slate-700",
    },
    {
      label: "Income",
      value: totalIncome,
      icon: <ArrowDownLeft size={20} />,
      tone: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Expenses",
      value: totalExpenses,
      icon: <ArrowUpRight size={20} />,
      tone: "bg-rose-50 text-rose-500",
    },
  ];

  return (
    <section
      className="grid gap-4 md:grid-cols-3"
      aria-label="Financial summary"
    >
      {summaryCardsData.map(({ label, value, icon, tone }) => (
        <SummaryCard
          key={label}
          label={label}
          value={value}
          icon={icon}
          tone={tone}
        />
      ))}
    </section>
  );
}
export default SummaryCards;
