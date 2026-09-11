import { CreditCard } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";

const REMAINING_INCOME_THRESHOLDS = {
  medium: 30,
  healthy: 70,
} as const;

type RemainingIncomeStatus = "low" | "medium" | "healthy";

function getRemainingIncomeStatus(percentage: number): RemainingIncomeStatus {
  if (percentage < REMAINING_INCOME_THRESHOLDS.medium) return "low";
  if (percentage < REMAINING_INCOME_THRESHOLDS.healthy) return "medium";
  return "healthy";
}

function formatPercentage(value: number) {
  return `${value.toFixed(1)}%`;
}

function QuickInsight({
  remainingPercentage,
  remainingBarWidth,
}: {
  remainingPercentage: number | null;
  remainingBarWidth: number;
}) {
  const status =
    remainingPercentage === null
      ? null
      : getRemainingIncomeStatus(remainingPercentage);

  return (
    <div
      className={`app-surface rounded-2xl border p-5 ${status ? `app-status-${status}` : ""}`}
    >
      <div className="flex items-center gap-2 text-sm font-bold app-text">
        <CreditCard size={17} className="app-primary" />
        Quick insight
      </div>
      <p
        className={`mt-5 text-3xl font-bold tracking-tight ${status ? "app-status-text" : "app-text"}`}
      >
        {remainingPercentage === null
          ? "No income recorded"
          : <AnimatedNumber value={remainingPercentage} formatter={formatPercentage} />}
      </p>
      <p className="mt-1 text-sm leading-5">
        of your total income remains after expenses.
      </p>
      {remainingPercentage !== null && (
        <>
          <div className="app-status-track mt-6 h-2 rounded-full">
            <div
              className="app-status-bar h-2 rounded-full transition-[width,background-color] duration-300"
              style={{ width: `${remainingBarWidth}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-xs font-medium app-faint">
            <span>Remaining</span>
            <span>Spent</span>
          </div>
        </>
      )}
    </div>
  );
}

export default QuickInsight;
