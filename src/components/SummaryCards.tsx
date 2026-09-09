import SummaryCard from "./SummaryCard";
import { CircleDollarSign, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import type {
  FinanceSummaryType,
  SummaryCardsDataType,
} from "../types/FinanceSummary";

const SummaryCardsData: SummaryCardsDataType[] = [
  {
    label: "Balance",
    value: 12450,
    detail: "Current balance",
    icon: <CircleDollarSign size={20} />,
    tone: "bg-slate-100 text-slate-700",
  },
  {
    label: "Income",
    value: 25000,
    detail: "This month",
    icon: <ArrowDownLeft size={20} />,
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Expenses",
    value: 12550,
    detail: "This month",
    icon: <ArrowUpRight size={20} />,
    tone: "bg-rose-50 text-rose-500",
  },
];

function SummaryCards({ summary }: { summary: FinanceSummaryType }) {
  return (
    <section
      className="grid gap-4 md:grid-cols-3"
      aria-label="Financial summary"
    >
      {SummaryCardsData.map(
        ({ label, value, detail, icon, tone }) => (
          (value =
            label === "Balance"
              ? summary.balance
              : label === "Income"
                ? summary.income
                : summary.expenses),
          (
            <SummaryCard
              key={label}
              label={label}
              value={value}
              detail={detail}
              icon={icon}
              tone={tone}
            />
          )
        ),
      )}
    </section>
  );
}
export default SummaryCards;
