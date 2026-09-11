import type { ReactNode } from "react";
import formatCurrency from "../utils/formatCurrency";
import AnimatedNumber from "./AnimatedNumber";

type SummaryCardProps = {
  label: string;
  value: number;
  detail: string;
  icon: ReactNode;
  tone: string;
  accent: string;
};

function SummaryCard({
  label,
  value,
  detail,
  icon,
  tone,
  accent,
}: SummaryCardProps) {
  return (
    <article
      className={`app-surface relative overflow-hidden rounded-2xl border p-5 ${accent}`}
    >
      <div className="app-accent-bar absolute inset-y-0 left-0 w-1" />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium app-muted">{label}</p>
          <p className="mt-3 text-2xl font-bold tracking-tight app-text">
            <AnimatedNumber value={value} formatter={formatCurrency} />
          </p>
          <p className="mt-1 text-xs font-medium app-faint">
            {detail || "Current balance"}
          </p>
        </div>
        <div className={`rounded-xl p-2.5 ${tone}`}>{icon}</div>
      </div>
    </article>
  );
}

export default SummaryCard;
