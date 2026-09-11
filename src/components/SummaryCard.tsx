import type { ReactNode } from "react";
import formatCurrency from "../utils/formatCurrency";

type SummaryCardProps = {
  label: string;
  value: number;
  icon: ReactNode;
  tone: string;
};

function SummaryCard({ label, value, icon, tone }: SummaryCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
            {formatCurrency(value)}
          </p>
        </div>
        <div className={`rounded-xl p-2.5 ${tone}`}>{icon}</div>
      </div>
    </article>
  );
}

export default SummaryCard;
